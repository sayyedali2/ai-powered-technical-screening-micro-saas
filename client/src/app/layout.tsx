import { CssBaseline } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CssBaseline/>
      <body>{children}</body>
    </html>
  );
}
