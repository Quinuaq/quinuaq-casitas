import { Link } from "@tanstack/react-router";
import type { Casita } from "@/lib/casitas";
import roomImage from "@/assets/room.jpg";

interface CasitaCardProps {
  casita: Casita;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export function CasitaCard({ casita, checkIn = "", checkOut = "", guests = 2 }: CasitaCardProps) {
  return (
    <article className="qq-casita-card">
      <Link
        to="/casitas/$id"
        params={{ id: casita.id }}
        search={{ checkIn, checkOut, guests }}
        className="qq-card-photo"
        aria-label={`Ver ${casita.name}`}
      >
        <img
          src={roomImage}
          alt="Ambientación de descanso: imagen referencial, no corresponde a una habitación específica"
          loading="lazy"
          width="1400"
          height="1000"
        />
        <span>Imagen de ambientación referencial</span>
      </Link>
      <div className="qq-card-body">
        <p className="qq-eyebrow">{casita.capacity}</p>
        <h2>
          <Link to="/casitas/$id" params={{ id: casita.id }} search={{ checkIn, checkOut, guests }}>
            {casita.name}
          </Link>
        </h2>
        <p>{casita.tagline}</p>
        <div className="qq-card-amenities">
          {casita.amenities.slice(0, 2).map((amenity) => (
            <span key={amenity}>{amenity}</span>
          ))}
        </div>
      </div>
      <div className="qq-card-bottom">
        <p>
          <span>Desde</span>
          <strong>S/ {casita.prices.weekday}</strong>
          <span>por noche</span>
        </p>
        <Link
          to="/casitas/$id"
          params={{ id: casita.id }}
          search={{ checkIn, checkOut, guests }}
          className="qq-text-link"
        >
          Ver casita <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
