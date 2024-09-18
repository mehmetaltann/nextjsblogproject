
/*export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;
  // fetch data
  const blog = await fetch(`http://localhost:3000/home/blog/${id}`).then(
    (res) => res.json()
  );

  console.log(blog);

  return {
    /*     title: product.title,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    }, */
};
}*/


export default function Layout({ children }) {
  return <>{children}</>;
}
