import * as JoditLib from "jodit";

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
          if (typeof window === "undefined" || !editor.editor) return;

          const html = `
            <div class="my-slider">
              <img src="https://res.cloudinary.com/altan/image/upload/1.jpg" />
              <img src="https://res.cloudinary.com/altan/image/upload/2.jpg" />
              <img src="https://res.cloudinary.com/altan/image/upload/3.jpg" />
            </div>
          `;
          editor.s.insertHTML(html);

          // Flickity’i başlat
          setTimeout(() => {
            const elem = editor.editor.querySelector(".my-slider");
            if (elem && (window as any).Flickity) {
              new (window as any).Flickity(elem, {
                wrapAround: true,
                autoPlay: 3000,
              });
            }
          }, 100);
        },
      });
    });
  }
}
