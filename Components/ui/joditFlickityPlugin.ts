import JoditLib from "jodit";

export function registerFlickityPlugin() {
  const Jodit: any = JoditLib; 

  if (!Jodit.plugins?.get("flickitySlider")) {
    Jodit.plugins.add("flickitySlider", function (editor: any) {
      editor.registerButton({
        name: "flickitySlider",
        group: "insert",
        icon: "image",
        tooltip: "Slider Ekle",
        exec: () => {
          const html = `
            <div class="my-slider">
              <img src="https://res.cloudinary.com/altan/image/upload/1.jpg" />
              <img src="https://res.cloudinary.com/altan/image/upload/2.jpg" />
              <img src="https://res.cloudinary.com/altan/image/upload/3.jpg" />
            </div>
            <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
            <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
            <script>
              var elem = document.querySelector('.my-slider');
              if(elem) new Flickity(elem, { wrapAround: true, autoPlay: 3000 });
            </script>
          `;
          editor.s.insertHTML(html);
        },
      });
    });
  }
}
