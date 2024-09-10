import {
  Inter,
  Roboto,
  Montserrat,
  Tinos,
  Noto_Sans, Raleway
} from "next/font/google";

export const notosans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-notosans",
});

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});


export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-tinos",
});


export const fontVariablesString = `  ${raleway.variable} ${inter.variable} ${tinos.variable} ${montserrat.variable} ${roboto.variable} ${notosans.variable}`;
