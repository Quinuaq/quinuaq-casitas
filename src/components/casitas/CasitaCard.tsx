import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Casita } from "@/lib/casitas";
import { ChevronLeft, ChevronRight, Users, Sparkles, BedDouble, Flame } from "lucide-react";

interface CasitaCardProps {
  casita: Casita;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export function CasitaCard({ casita, checkIn, checkOut, guests }: CasitaCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const images = casita.gallery?.length ? casita.gallery : [casita.cover];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="group bg-[#FFFFFF] border border-[#1B1917]/10 flex flex-col justify-between hover:border-[#9C7A3C]/50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <div>
        {/* Photo Gallery Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1917]">
          <img
            src={images[currentImgIndex]}
            alt={`${casita.name} en QuinuaQ`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Capacity & Type Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#F7F4EF]/95 backdrop-blur-md px-3 py-1.5 border border-[#1B1917]/10 text-[10px] uppercase tracking-[0.2em] font-medium text-[#1B1917] shadow-sm">
            <Users className="w-3 h-3 text-[#9C7A3C]" />
            <span>{casita.capacity}</span>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImgIndex ? "w-5 bg-[#F7F4EF]" : "w-1.5 bg-[#F7F4EF]/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8 space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9C7A3C] font-serif block mb-1">
              QuinuaQ Casitas
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1B1917] font-light group-hover:text-[#9C7A3C] transition-colors">
              {casita.name}
            </h3>
            <p className="text-xs italic text-[#8C5135] font-serif mt-1">
              {casita.tagline}
            </p>
          </div>

          <p className="text-xs text-[#6B635A] font-light leading-relaxed line-clamp-3">
            {casita.description}
          </p>

          {/* Highlights / Amenities Pills */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {casita.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 bg-[#F7F4EF] border border-[#1B1917]/5 text-[#6B635A]"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#9C7A3C]" />
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Booking CTA */}
      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-[#1B1917]/8 flex items-end justify-between bg-[#FCFAF6]">
        <div>
          <span className="block text-[9px] uppercase tracking-[0.2em] text-[#999084]">Tarifa por noche</span>
          <div className="font-serif text-2xl md:text-3xl text-[#1B1917] mt-0.5">
            <span className="text-[#9C7A3C]">S/ {casita.prices.weekday}</span>
            <span className="text-[10px] text-[#6B635A] font-sans font-normal ml-1">/ noche</span>
          </div>
          <span className="text-[10px] text-[#999084] block mt-0.5">
            Fines de semana: S/ {casita.prices.weekend}
          </span>
        </div>

        <Link
          to="/casitas/$id"
          params={{ id: casita.id }}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1B1917] hover:bg-[#9C7A3C] text-[#FBF8F1] text-xs font-sans tracking-wider uppercase transition-colors duration-300"
        >
          Ver y Reservar
        </Link>
      </div>
    </article>
  );
}
