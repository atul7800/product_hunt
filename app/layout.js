import "./globals.css";
import {AuthProvider} from "@/components/AuthContext";
import {Toaster} from "sonner";

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
