import heroValley from "@/assets/hero-valley.jpg";
import roomImg from "@/assets/room.jpg";
import fogataImg from "@/assets/fogata.jpg";
import alpacasImg from "@/assets/alpacas.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import quinuaImg from "@/assets/quinua.jpg";

export type Casita = {
  id: string;
  name: string;
  tagline: string;
  capacity: string;
  maxGuests: number;
  description: string;
  virtues: string[];
  amenities: string[];
  prices: { weekday: number; weekend: number; holiday: number };
  extraNote?: string;
  cover: string;
  gallery: string[];
};

export const casitas: Casita[] = [
  {
    id: "betsy",
    name: "Casita Betsy",
    tagline: "Refugio íntimo con vista al valle",
    capacity: "1 a 2 personas",
    maxGuests: 2,
    description:
      "Nuestra casita más íntima, pensada para parejas y viajeros solitarios que buscan silencio absoluto. Grandes ventanas enmarcan el valle y una chimenea eléctrica acompaña las noches frías de Quinua.",
    virtues: [
      "Cama queen con ropa de cama de algodón peruano",
      "Ventanales panorámicos hacia el valle",
      "Terraza privada con dos sillones de madera",
      "Chimenea eléctrica y calefacción",
    ],
    amenities: ["Wi-Fi", "Baño privado con ducha caliente", "Desayuno andino incluido", "Amenities naturales", "Estacionamiento"],
    prices: { weekday: 375, weekend: 390, holiday: 420 },
    cover: heroValley,
    gallery: [heroValley, roomImg, fogataImg, quinuaImg],
  },
  {
    id: "kallen-4",
    name: "Casita Kallen · 4 personas",
    tagline: "Casita familiar entre queuñas",
    capacity: "hasta 4 personas",
    maxGuests: 4,
    description:
      "Espaciosa casita de dos ambientes ideal para familias o grupos de amigos. Sala común con vista al valle y dos dormitorios independientes rodeados de árboles de queuña.",
    virtues: [
      "2 dormitorios independientes",
      "Sala común con mirador al valle",
      "Espacio para reuniones familiares",
      "Rodeada de queuñas centenarias",
    ],
    amenities: ["Wi-Fi", "2 baños privados", "Desayuno andino incluido", "Chimenea", "Estacionamiento"],
    prices: { weekday: 570, weekend: 600, holiday: 650 },
    cover: roomImg,
    gallery: [roomImg, heroValley, cocinaImg, alpacasImg],
  },
  {
    id: "kallen-2",
    name: "Casita Kallen · 2 personas",
    tagline: "La misma casa Kallen en modalidad pareja",
    capacity: "1 a 2 personas",
    maxGuests: 2,
    description:
      "Configuración para dos huéspedes de la casita Kallen. Toda la privacidad y confort de una casita completa, con el paisaje andino como escenario.",
    virtues: [
      "Uso exclusivo de la casita completa",
      "Sala amplia con vista al valle",
      "Dormitorio principal con cama queen",
      "Terraza con vista",
    ],
    amenities: ["Wi-Fi", "Baño privado", "Desayuno andino incluido", "Chimenea", "Estacionamiento"],
    prices: { weekday: 400, weekend: 430, holiday: 520 },
    cover: quinuaImg,
    gallery: [quinuaImg, roomImg, heroValley, fogataImg],
  },
  {
    id: "matrimonial",
    name: "Habitación Matrimonial",
    tagline: "Confort andino para dos",
    capacity: "2 personas",
    maxGuests: 2,
    description:
      "Habitación matrimonial dentro del lodge, con vista privilegiada al valle. Ideal para escapadas cortas de fin de semana.",
    virtues: [
      "Cama matrimonial con textiles andinos",
      "Vista al valle desde la ventana",
      "Diseño boutique cálido",
      "Cerca del área común",
    ],
    amenities: ["Wi-Fi", "Baño privado", "Desayuno andino incluido", "Calefacción"],
    prices: { weekday: 270, weekend: 300, holiday: 320 },
    cover: fogataImg,
    gallery: [fogataImg, roomImg, heroValley, quinuaImg],
  },
  {
    id: "duplex",
    name: "Habitación Dúplex · 2 personas",
    tagline: "Dos niveles, mucha luz",
    capacity: "2 personas · S/50 por persona extra",
    maxGuests: 6,
    description:
      "Habitación dúplex en dos niveles, con dormitorio principal en el nivel superior y sala con sofá cama abajo. Perfecta para grupos pequeños que quieren compartir sin sacrificar comodidad.",
    virtues: [
      "Espacio en dos niveles",
      "Escalera interior de madera local",
      "Sofá cama adicional",
      "Ventanales dobles",
    ],
    amenities: ["Wi-Fi", "Baño privado", "Desayuno andino incluido", "Calefacción", "Estacionamiento"],
    prices: { weekday: 300, weekend: 330, holiday: 360 },
    extraNote: "Si son más de 2 personas, S/50 adicional por persona.",
    cover: alpacasImg,
    gallery: [alpacasImg, roomImg, cocinaImg, heroValley],
  },
];

export function getCasita(id: string): Casita | undefined {
  return casitas.find((c) => c.id === id);
}

export const WA_PHONE = "51946393256";
export const WA_URL = `https://wa.me/${WA_PHONE}`;

export function buildWhatsAppLink(params: {
  casitaName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  estimatedTotal?: number;
  message?: string;
}) {
  const lines = [
    `¡Hola! Quisiera reservar en QuinuaQ Casitas.`,
    ``,
    `🏡 Casita: ${params.casitaName}`,
    `📅 Check-in: ${params.checkIn}`,
    `📅 Check-out: ${params.checkOut} (${params.nights} noche${params.nights !== 1 ? "s" : ""})`,
    `👥 Huéspedes: ${params.guests}`,
    ``,
    `👤 Nombre: ${params.guestName}`,
    `📞 Teléfono: ${params.guestPhone}`,
    params.guestEmail ? `✉️ Email: ${params.guestEmail}` : "",
    params.estimatedTotal ? `\n💰 Total estimado: S/ ${params.estimatedTotal}` : "",
    params.message ? `\n📝 Mensaje: ${params.message}` : "",
  ].filter(Boolean);
  return `${WA_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
}
