import QRCode from 'qrcode';

/** QR rendered to SVG at build time; it inherits the text colour. */
export async function TicketQR({ url, label }: { url: string; label: string }) {
  const svg = await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#000', light: '#0000' } });
  const themed = svg.replace(/stroke="#000000"/g, 'stroke="currentColor"').replace(/fill="#000000"/g, 'fill="currentColor"');
  return (
    <div
      role="img"
      aria-label={label}
      className="size-[84px] text-fg [&_svg]:h-full [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: themed }}
    />
  );
}
