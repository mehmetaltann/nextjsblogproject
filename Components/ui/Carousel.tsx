"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type PropType = {
  images: string[];
};

const Carousel = ({ images }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // ilk indeksi ayarla

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-3xl mx-auto my-6">
      {/* Embla Viewport */}
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto max-h-[70vh] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - sadece md ekran ve üstü */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 md:block hidden"
        aria-label="Previous"
      >
        ❮
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 md:block hidden"
        aria-label="Next"
      >
        ❯
      </button>

      {/* Dot indicators - tüm ekranlarda */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
