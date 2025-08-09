// Shared SVG presets for QR code design tabs
export const cornerSVGs = [
  {
    value: "square",
    qrType: "square",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="4" y="4" width="24" height="24" rx="0" stroke="black" strokeWidth="4" fill="none" />
      </svg>
    ),
  },
  {
    value: "dot",
    qrType: "dot",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" stroke="black" strokeWidth="4" fill="none" />
      </svg>
    ),
  },
  {
    value: "rounded",
    qrType: "extra-rounded",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="4" y="4" width="24" height="24" rx="6" stroke="black" strokeWidth="4" fill="none" />
      </svg>
    ),
  },
  {
    value: "dotted",
    qrType: "dot",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" stroke="black" strokeWidth="4" fill="none" strokeDasharray="4,4" />
      </svg>
    ),
  },
  {
    value: "cut",
    qrType: "square",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="4" y="4" width="24" height="24" rx="0" stroke="black" strokeWidth="4" fill="none" />
        <line x1="8" y1="8" x2="24" y2="8" stroke="black" strokeWidth="2" />
        <line x1="8" y1="8" x2="8" y2="24" stroke="black" strokeWidth="2" />
      </svg>
    ),
  },
  {
    value: "cross",
    qrType: "square",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="4" y="4" width="24" height="24" rx="0" stroke="black" strokeWidth="4" fill="none" />
        <line x1="16" y1="4" x2="16" y2="28" stroke="black" strokeWidth="2" />
        <line x1="4" y1="16" x2="28" y2="16" stroke="black" strokeWidth="2" />
      </svg>
    ),
  },
  {
    value: "diamond",
    qrType: "extra-rounded",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="4" y="4" width="24" height="24" rx="6" stroke="black" strokeWidth="4" fill="none" />
      </svg>
    ),
  },
];

export const eyeSVGs = [
  {
    value: "square",
    svg: <svg width="32" height="32" viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24"/></svg>,
  },
  {
    value: "circle",
    svg: <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12"/></svg>,
  },
  {
    value: "rounded",
    svg: <svg width="32" height="32" viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" rx="6"/></svg>,
  },
  {
    value: "diamond",
    svg: <svg width="32" height="32" viewBox="0 0 32 32"><polygon points="16,4 20,16 16,28 12,16"/></svg>,
  },
  {
    value: "star",
    svg: <svg width="32" height="32" viewBox="0 0 32 32"><polygon points="16,4 18,12 26,12 20,18 22,26 16,22 10,26 12,18 6,12 14,12"/></svg>,
  },
  {
    value: "gear",
    svg: <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="8" fill="white"/><circle cx="16" cy="16" r="4"/></svg>,
  },
  {
    value: "cross",
    svg: <svg width="32" height="32" viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24"/><rect x="12" y="4" width="8" height="24" fill="white"/><rect x="4" y="12" width="24" height="8" fill="white"/></svg>,
  },
];

export const qrCodeShapeSVGs = [
  {
    value: "square",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="2" y="2" width="28" height="28" rx="2" stroke="black" strokeWidth="2" fill="none" />
        {/* QR code pattern inside */}
        <rect x="6" y="6" width="4" height="4" fill="black"/>
        <rect x="14" y="6" width="4" height="4" fill="black"/>
        <rect x="22" y="6" width="4" height="4" fill="black"/>
        <rect x="6" y="14" width="4" height="4" fill="black"/>
        <rect x="14" y="14" width="4" height="4" fill="black"/>
        <rect x="22" y="14" width="4" height="4" fill="black"/>
        <rect x="6" y="22" width="4" height="4" fill="black"/>
        <rect x="14" y="22" width="4" height="4" fill="black"/>
        <rect x="22" y="22" width="4" height="4" fill="black"/>
      </svg>
    ),
  },
  {
    value: "circle",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" stroke="black" strokeWidth="2" fill="none" />
        {/* QR code pattern inside */}
        <circle cx="8" cy="8" r="2" fill="black"/>
        <circle cx="16" cy="8" r="2" fill="black"/>
        <circle cx="24" cy="8" r="2" fill="black"/>
        <circle cx="8" cy="16" r="2" fill="black"/>
        <circle cx="16" cy="16" r="2" fill="black"/>
        <circle cx="24" cy="16" r="2" fill="black"/>
        <circle cx="8" cy="24" r="2" fill="black"/>
        <circle cx="16" cy="24" r="2" fill="black"/>
        <circle cx="24" cy="24" r="2" fill="black"/>
      </svg>
    ),
  },
  {
    value: "rounded",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="2" y="2" width="28" height="28" rx="8" stroke="black" strokeWidth="2" fill="none" />
        {/* QR code pattern inside */}
        <rect x="6" y="6" width="4" height="4" rx="2" fill="black"/>
        <rect x="14" y="6" width="4" height="4" rx="2" fill="black"/>
        <rect x="22" y="6" width="4" height="4" rx="2" fill="black"/>
        <rect x="6" y="14" width="4" height="4" rx="2" fill="black"/>
        <rect x="14" y="14" width="4" height="4" rx="2" fill="black"/>
        <rect x="22" y="14" width="4" height="4" rx="2" fill="black"/>
        <rect x="6" y="22" width="4" height="4" rx="2" fill="black"/>
        <rect x="14" y="22" width="4" height="4" rx="2" fill="black"/>
        <rect x="22" y="22" width="4" height="4" rx="2" fill="black"/>
      </svg>
    ),
  },
  {
    value: "hexagon",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <polygon points="16,2 28,8 28,24 16,30 4,24 4,8" stroke="black" strokeWidth="2" fill="none" />
        {/* QR code pattern inside */}
        <circle cx="10" cy="10" r="1.5" fill="black"/>
        <circle cx="16" cy="10" r="1.5" fill="black"/>
        <circle cx="22" cy="10" r="1.5" fill="black"/>
        <circle cx="10" cy="16" r="1.5" fill="black"/>
        <circle cx="16" cy="16" r="1.5" fill="black"/>
        <circle cx="22" cy="16" r="1.5" fill="black"/>
        <circle cx="10" cy="22" r="1.5" fill="black"/>
        <circle cx="16" cy="22" r="1.5" fill="black"/>
        <circle cx="22" cy="22" r="1.5" fill="black"/>
      </svg>
    ),
  },
  {
    value: "octagon",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <polygon points="10,2 22,2 30,10 30,22 22,30 10,30 2,22 2,10" stroke="black" strokeWidth="2" fill="none" />
        {/* QR code pattern inside */}
        <rect x="6" y="6" width="3" height="3" fill="black"/>
        <rect x="13" y="6" width="3" height="3" fill="black"/>
        <rect x="20" y="6" width="3" height="3" fill="black"/>
        <rect x="6" y="13" width="3" height="3" fill="black"/>
        <rect x="13" y="13" width="3" height="3" fill="black"/>
        <rect x="20" y="13" width="3" height="3" fill="black"/>
        <rect x="6" y="20" width="3" height="3" fill="black"/>
        <rect x="13" y="20" width="3" height="3" fill="black"/>
        <rect x="20" y="20" width="3" height="3" fill="black"/>
      </svg>
    ),
  },
];

export const qrSVGs = [
  {
    value: "square",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Square dots - clear representation */}
        <rect x="4" y="4" width="4" height="4" fill="#000"/>
        <rect x="12" y="4" width="4" height="4" fill="#000"/>
        <rect x="20" y="4" width="4" height="4" fill="#000"/>
        <rect x="28" y="4" width="4" height="4" fill="#000"/>
        <rect x="4" y="12" width="4" height="4" fill="#000"/>
        <rect x="12" y="12" width="4" height="4" fill="#000"/>
        <rect x="20" y="12" width="4" height="4" fill="#000"/>
        <rect x="28" y="12" width="4" height="4" fill="#000"/>
        <rect x="4" y="20" width="4" height="4" fill="#000"/>
        <rect x="12" y="20" width="4" height="4" fill="#000"/>
        <rect x="20" y="20" width="4" height="4" fill="#000"/>
        <rect x="28" y="20" width="4" height="4" fill="#000"/>
        <rect x="4" y="28" width="4" height="4" fill="#000"/>
        <rect x="12" y="28" width="4" height="4" fill="#000"/>
        <rect x="20" y="28" width="4" height="4" fill="#000"/>
        <rect x="28" y="28" width="4" height="4" fill="#000"/>
      </svg>
    ),
  },
  {
    value: "circle",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Circular dots - prominent circular representation */}
        <circle cx="6" cy="6" r="2.5" fill="#000"/>
        <circle cx="14" cy="6" r="2.5" fill="#000"/>
        <circle cx="22" cy="6" r="2.5" fill="#000"/>
        <circle cx="30" cy="6" r="2.5" fill="#000"/>
        <circle cx="6" cy="14" r="2.5" fill="#000"/>
        <circle cx="14" cy="14" r="2.5" fill="#000"/>
        <circle cx="22" cy="14" r="2.5" fill="#000"/>
        <circle cx="30" cy="14" r="2.5" fill="#000"/>
        <circle cx="6" cy="22" r="2.5" fill="#000"/>
        <circle cx="14" cy="22" r="2.5" fill="#000"/>
        <circle cx="22" cy="22" r="2.5" fill="#000"/>
        <circle cx="30" cy="22" r="2.5" fill="#000"/>
        <circle cx="6" cy="30" r="2.5" fill="#000"/>
        <circle cx="14" cy="30" r="2.5" fill="#000"/>
        <circle cx="22" cy="30" r="2.5" fill="#000"/>
        <circle cx="30" cy="30" r="2.5" fill="#000"/>
      </svg>
    ),
  },
  {
    value: "rounded",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Rounded squares - clear representation */}
        <rect x="4" y="4" width="4" height="4" rx="2" fill="#000"/>
        <rect x="12" y="4" width="4" height="4" rx="2" fill="#000"/>
        <rect x="20" y="4" width="4" height="4" rx="2" fill="#000"/>
        <rect x="28" y="4" width="4" height="4" rx="2" fill="#000"/>
        <rect x="4" y="12" width="4" height="4" rx="2" fill="#000"/>
        <rect x="12" y="12" width="4" height="4" rx="2" fill="#000"/>
        <rect x="20" y="12" width="4" height="4" rx="2" fill="#000"/>
        <rect x="28" y="12" width="4" height="4" rx="2" fill="#000"/>
        <rect x="4" y="20" width="4" height="4" rx="2" fill="#000"/>
        <rect x="12" y="20" width="4" height="4" rx="2" fill="#000"/>
        <rect x="20" y="20" width="4" height="4" rx="2" fill="#000"/>
        <rect x="28" y="20" width="4" height="4" rx="2" fill="#000"/>
        <rect x="4" y="28" width="4" height="4" rx="2" fill="#000"/>
        <rect x="12" y="28" width="4" height="4" rx="2" fill="#000"/>
        <rect x="20" y="28" width="4" height="4" rx="2" fill="#000"/>
        <rect x="28" y="28" width="4" height="4" rx="2" fill="#000"/>
      </svg>
    ),
  },
  {
    value: "dots",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Circular dots - clear representation */}
        <circle cx="6" cy="6" r="2" fill="#000"/>
        <circle cx="14" cy="6" r="2" fill="#000"/>
        <circle cx="22" cy="6" r="2" fill="#000"/>
        <circle cx="30" cy="6" r="2" fill="#000"/>
        <circle cx="6" cy="14" r="2" fill="#000"/>
        <circle cx="14" cy="14" r="2" fill="#000"/>
        <circle cx="22" cy="14" r="2" fill="#000"/>
        <circle cx="30" cy="14" r="2" fill="#000"/>
        <circle cx="6" cy="22" r="2" fill="#000"/>
        <circle cx="14" cy="22" r="2" fill="#000"/>
        <circle cx="22" cy="22" r="2" fill="#000"/>
        <circle cx="30" cy="22" r="2" fill="#000"/>
        <circle cx="6" cy="30" r="2" fill="#000"/>
        <circle cx="14" cy="30" r="2" fill="#000"/>
        <circle cx="22" cy="30" r="2" fill="#000"/>
        <circle cx="30" cy="30" r="2" fill="#000"/>
      </svg>
    ),
  },
  {
    value: "classy",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Classy - mix of squares and cut corners */}
        <rect x="4" y="4" width="4" height="4" fill="#000"/>
        <rect x="12" y="4" width="4" height="4" fill="#000"/>
        <rect x="20" y="4" width="4" height="4" fill="#000"/>
        <rect x="28" y="4" width="4" height="4" fill="#000"/>
        <rect x="4" y="12" width="4" height="4" fill="#000"/>
        <rect x="12" y="12" width="4" height="4" fill="#000"/>
        <rect x="20" y="12" width="4" height="4" fill="#000"/>
        <rect x="28" y="12" width="4" height="4" fill="#000"/>
        <rect x="4" y="20" width="4" height="4" fill="#000"/>
        <rect x="12" y="20" width="4" height="4" fill="#000"/>
        <rect x="20" y="20" width="4" height="4" fill="#000"/>
        <rect x="28" y="20" width="4" height="4" fill="#000"/>
        <rect x="4" y="28" width="4" height="4" fill="#000"/>
        <rect x="12" y="28" width="4" height="4" fill="#000"/>
        <rect x="20" y="28" width="4" height="4" fill="#000"/>
        <rect x="28" y="28" width="4" height="4" fill="#000"/>
      </svg>
    ),
  },
  {
    value: "classyRounded",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Classy rounded - mix of circles and rounded elements */}
        <circle cx="6" cy="6" r="2" fill="#000"/>
        <circle cx="14" cy="6" r="2" fill="#000"/>
        <circle cx="22" cy="6" r="2" fill="#000"/>
        <circle cx="30" cy="6" r="2" fill="#000"/>
        <circle cx="6" cy="14" r="2" fill="#000"/>
        <circle cx="14" cy="14" r="2" fill="#000"/>
        <circle cx="22" cy="14" r="2" fill="#000"/>
        <circle cx="30" cy="14" r="2" fill="#000"/>
        <circle cx="6" cy="22" r="2" fill="#000"/>
        <circle cx="14" cy="22" r="2" fill="#000"/>
        <circle cx="22" cy="22" r="2" fill="#000"/>
        <circle cx="30" cy="22" r="2" fill="#000"/>
        <circle cx="6" cy="30" r="2" fill="#000"/>
        <circle cx="14" cy="30" r="2" fill="#000"/>
        <circle cx="22" cy="30" r="2" fill="#000"/>
        <circle cx="30" cy="30" r="2" fill="#000"/>
      </svg>
    ),
  },
  {
    value: "extra-rounded",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Extra rounded - pill/oval shapes */}
        <rect x="4" y="6" width="6" height="2" rx="1" fill="#000"/>
        <rect x="14" y="4" width="2" height="6" rx="1" fill="#000"/>
        <rect x="22" y="6" width="6" height="2" rx="1" fill="#000"/>
        <rect x="4" y="14" width="2" height="6" rx="1" fill="#000"/>
        <rect x="14" y="14" width="6" height="2" rx="1" fill="#000"/>
        <rect x="24" y="14" width="2" height="6" rx="1" fill="#000"/>
        <rect x="4" y="24" width="6" height="2" rx="1" fill="#000"/>
        <rect x="14" y="24" width="2" height="6" rx="1" fill="#000"/>
        <rect x="22" y="24" width="6" height="2" rx="1" fill="#000"/>
      </svg>
    ),
  },
  {
    value: "minimal",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Minimal - sparse pattern */}
        <rect x="6" y="6" width="4" height="4" fill="#000"/>
        <rect x="22" y="6" width="4" height="4" fill="#000"/>
        <rect x="6" y="22" width="4" height="4" fill="#000"/>
      </svg>
    ),
  },
];
