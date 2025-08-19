import ClientProviders from "@/components/layout/ClientProviders";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { Inter } from "next/font/google";

dayjs.locale("en-gb");

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "JobJot",
  description: "Track your job applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppRouterCacheProvider>
          <ClientProviders>
            <Header />
            {children}
            <Footer />
          </ClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
