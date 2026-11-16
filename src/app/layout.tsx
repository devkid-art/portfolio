import './globals.css';

// The <html> element lives in app/[locale]/layout.tsx so its `lang` follows the URL.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
