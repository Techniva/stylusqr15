import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);

  try {
    // Use the new web API for form data
    const formData = await request.formData();
    const file = formData.get('image');
    const processedLogoPath = formData.get('processedLogoPath') as string; // Get the processed logo path
    
    if (!file || typeof file !== 'object' || !('arrayBuffer' in file)) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }
    
    // Find the QR code to get userId and uniqueCode
    const qrCode = await prisma.qRCode.findUnique({
      where: { id },
      select: { userId: true, uniqueCode: true },
    });
    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }
    
    // Save the uploaded image to public/qrcodes/<userId>/qr-<id>-<timestamp>/qr.png
    const userFolder = qrCode.userId ? String(qrCode.userId) : 'guest';
    const timestamp = Math.floor(Date.now() / 1000);
    const subfolderName = `qr-${id}-${timestamp}`;
    const imageDir = path.join(process.cwd(), 'public', 'qrcodes', userFolder, subfolderName);
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
    const imageFileName = 'qr.png';
    const imagePath = `/qrcodes/${userFolder}/${subfolderName}/${imageFileName}`;
    const filePath = path.join(imageDir, imageFileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);
    
    // Copy processed logo to QR code folder if provided
    let logoPath = null;
    if (processedLogoPath && processedLogoPath !== 'undefined' && processedLogoPath !== 'null') {
      try {
        const logoFileName = 'logo.png';
        const logoFilePath = path.join(imageDir, logoFileName);
        
        // If processedLogoPath is a local path, copy the file
        if (processedLogoPath.startsWith('/processed-logos/')) {
          const sourceLogoPath = path.join(process.cwd(), 'public', processedLogoPath.replace(/^\/+/, ''));
          if (fs.existsSync(sourceLogoPath)) {
            fs.copyFileSync(sourceLogoPath, logoFilePath);
            logoPath = `/qrcodes/${userFolder}/${subfolderName}/${logoFileName}`;
            console.log('Logo copied to QR folder:', logoPath);
          }
        }
      } catch (logoError) {
        console.error('Error copying logo:', logoError);
        // Continue without logo if there's an error
      }
    }
    
    // Create metadata file in the subfolder
    const metadata = {
      id: id,
      userId: qrCode.userId,
      uniqueCode: qrCode.uniqueCode,
      createdAt: new Date().toISOString(),
      imagePath: imagePath,
      logoPath: logoPath,
      processedLogoPath: processedLogoPath, // Include the original processed logo path
      subfolderName: subfolderName
    };
    const metadataPath = path.join(imageDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    // Update the QR code record with the image path
    const updatedQR = await prisma.qRCode.update({
      where: { id },
      data: { 
        qrCodeImagePath: imagePath,
        logoPath: logoPath // Save the logo path to the database
      },
      select: {
        id: true,
        qrData: true,
        lastLink: true,
        uniqueCode: true,
        cornerShape: true,
        eyeShape: true,
        qrShape: true,
        foregroundColor: true,
        backgroundColor: true,
        dotColor: true,
        cornerColor: true,
        eyeColor: true,
        qrCodeImagePath: true,
        logoPath: true,
        createdAt: true,
        userId: true
      }
    });
    const origin = request.headers.get('origin') || '';
    const serverLink = `${origin}/api/qr/dynamic/${updatedQR.uniqueCode}`;
    const qrCodeWithServerLink = {
      ...updatedQR,
      serverLink,
    };
    return NextResponse.json(qrCodeWithServerLink);
  } catch (error) {
    console.error('Error uploading QR code image:', error);
    let errorMessage = 'Failed to upload QR code image';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 