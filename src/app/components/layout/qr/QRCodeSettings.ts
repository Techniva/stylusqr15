import { QRType } from '../../../lib/qrDataUtils';

export interface QRCodeSettings {
  url: string;
  cornerShape: 'square' | 'dot' | 'extra-rounded';
  eyeShape: 'square' | 'circle' | 'rounded';
  qrShape: 'square' | 'circle' | 'rounded' | 'diamond' | 'hexagon' | 'octagon' | 'star' | 'heart';
  foregroundColor: string;
  dotColor: string;
  cornerColor: string;
  eyeColor: string;
  backgroundColor: string;
  logoImage: string;
  backgroundImage?: string;
  frameStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'gradient';
  frameText?: string;
  frameTextSize?: 'small' | 'medium' | 'large' | 'xl';
  frameColor?: string;
  frameTextColor?: string;
  processedLogoPath?: string;
  dataType?: QRType;
} 