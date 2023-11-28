import "./globals.css";
import Header from "/components/Header";
import { Bangers, Lato } from "next/font/google";

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata = {
  title: "PokeProfiler",
  description: "Gotta profile em all !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bangers.variable} ${lato.variable}`}>
        <Header />
        <main className="container py-12">{children}</main>
      </body>
    </html>
  );
}
