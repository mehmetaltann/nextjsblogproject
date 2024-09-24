const siteConfig = {
  site_name: "Altan's Blog",
  title: "Altan's Blog",
  publisher: "Mehmet ALTAN",
  robots: "index, follow",
  description: "Tatil, Yazılım ve daha bir çok konuda rehberiniz",
  siteUrl: process.env.BASE_URL,
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

module.exports = siteConfig;
