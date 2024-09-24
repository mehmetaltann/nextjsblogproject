export default function manifest() {
  const siteUrl = process.env.BASE_URL;
  return {
    name: "Altan's Blog",
    short_name: "Altans",
    description: "Tatil, Yazılım ve daha bir çok konuda rehberiniz",
    start_url: `${siteUrl}/`,
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
