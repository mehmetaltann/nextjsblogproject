interface TwitterConfig {
  card: string;
  title: string;
  description: string;
  images: string[];
}

interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface OpenGraphConfig {
  site_name: string;
  title: string;
  description: string;
  url: string;
  type: string;
  images: OpenGraphImage[];
}

interface SiteConfig {
  site_name: string;
  title: string;
  publisher: string;
  robots: string;
  description: string;
  siteUrl: string | undefined;
  author: string;
  keywords: string[];
  twitter: TwitterConfig;
  openGraph: OpenGraphConfig;
}

const siteConfig: SiteConfig = {
  site_name: "Altan's Blog",
  title: "Altan's Blog",
  publisher: "Mehmet ALTAN",
  robots: "index, follow",
  description: "Tatil, Yazılım ve daha bir çok konuda rehberiniz",
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
  author: "Mehmet ALTAN",
  keywords: [
    "Yazılım",
    "Tatil",
    "Avrupa",
    "Deniz",
    "Yaz",
    "React",
    "Mühendislik",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Altan's Blog",
    description: "Tatil, Yazılım ve daha bir çok konuda rehberiniz",
    images: [`${process.env.CLOUDINARY_BASE_URL}/logo.png`],
  },
  openGraph: {
    site_name: "Altan's Blog",
    title: "Altan's Blog",
    description: "Tatil, Yazılım ve daha bir çok konuda rehberiniz",
    url: "http://localhost:3000/",
    type: "website",
    images: [
      {
        url: `${process.env.CLOUDINARY_BASE_URL}/logo.png`,
        width: 400,
        height: 300,
        alt: "Logo Pic",
      },
    ],
  },
};

export default siteConfig;
