import heroValley from "@/assets/hero-valley.jpg";
import roomImg from "@/assets/room.jpg";
import fogataImg from "@/assets/fogata.jpg";
import alpacasImg from "@/assets/alpacas.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import quinuaImg from "@/assets/quinua.jpg";

const GALLERY_PHOTOS = [
  { src: heroValley, title: "Vista al Valle de Quinua", category: "Naturaleza", size: "col-span-12 md:col-span-8 row-span-2" },
  { src: roomImg, title: "Interiores Artesanales", category: "Casitas", size: "col-span-12 md:col-span-4" },
  { src: fogataImg, title: "Noches de Fogata", category: "Rituales", size: "col-span-12 md:col-span-4" },
  { src: alpacasImg, title: "Alpacas en el Lodge", category: "Fauna Andina", size: "col-span-12 md:col-span-4" },
  { src: cocinaImg, title: "Cocina de Origen", category: "Gastronomía", size: "col-span-12 md:col-span-4" },
  { src: quinuaImg, title: "Pampa de Quinua", category: "Patrimonio", size: "col-span-12 md:col-span-4" },
];

export function GallerySection() {
  return (
    <section id="galeria" className="py-28 md:py-40 bg-[#0B0A09]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 reveal">
            <span className="label-luxury">Galería Fotográfica</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4F0E8] font-light">
              Atmósfera &{" "}
              <em className="italic text-[#C5A059] font-serif">paisaje andino.</em>
            </h2>
          </div>
          <p className="text-sm text-[#9E9488] font-light leading-relaxed max-w-sm reveal d2">
            Cada rincón de Valley Q refleja la armonía entre la arquitectura tradicional de quinua y el entorno natural.
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-12 gap-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={index}
              className={`img-container group aspect-[4/3] md:aspect-auto relative min-h-[260px] border border-[#F4F0E8]/10 reveal ${photo.size}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="label-luxury text-[9px]">{photo.category}</span>
                <h3 className="font-serif text-xl text-[#F4F0E8] mt-0.5">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Link */}
        <div className="mt-12 text-center reveal">
          <a
            href="https://instagram.com/altipacha_hotel"
            target="_blank"
            rel="noreferrer"
            className="link-luxury text-xs"
          >
            Explorar más momentos en Instagram
            <span className="line" />
          </a>
        </div>
      </div>
    </section>
  );
}
