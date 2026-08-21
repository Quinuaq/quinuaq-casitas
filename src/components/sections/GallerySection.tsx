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
  { src: alpacasImg, title: "Alpacas en el Campo", category: "Fauna Andina", size: "col-span-12 md:col-span-4" },
  { src: cocinaImg, title: "Cocina de Origen", category: "Gastronomía", size: "col-span-12 md:col-span-4" },
  { src: quinuaImg, title: "Pampa de Quinua", category: "Patrimonio", size: "col-span-12 md:col-span-4" },
];

export function GallerySection() {
  return (
    <section id="galeria" className="py-28 md:py-40 bg-[#0D1F16] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 reveal">
            <span className="label-luxury">Galería Fotográfica</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
              Atmósfera &{" "}
              <em className="italic text-[#E2B94E] font-serif">paisaje andino.</em>
            </h2>
          </div>
          <p className="text-sm text-[#A2B3A8] font-light leading-relaxed max-w-sm reveal d2">
            Cada rincón de QuinuaQ busca una relación serena entre arquitectura, paisaje y tradición local.
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-12 gap-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={index}
              className={`img-container group aspect-[4/3] md:aspect-auto relative min-h-[260px] border border-white/10 shadow-lg reveal ${photo.size}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="label-dark-gold text-[9px]">{photo.category}</span>
                <h3 className="font-serif text-xl text-[#FBF8F1] mt-0.5">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Link */}
        <div className="mt-12 text-center reveal">
          <a
            href="https://instagram.com/quinuaq"
            target="_blank"
            rel="noreferrer"
            className="link-luxury text-xs text-[#E2B94E]"
          >
            Explorar más momentos en Instagram @quinuaq
            <span className="line" />
          </a>
        </div>
      </div>
    </section>
  );
}
