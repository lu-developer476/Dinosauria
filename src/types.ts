export type Era = "Triásico" | "Jurásico" | "Cretácico";

// DINO TARJETAS //
export type DinoCard = {
  id: string;
  name: string;
  era: Era;
  diet: "Herbívoro" | "Carnívoro" | "Omnívoro";
  size: "Pequeño" | "Mediano" | "Grande" | "Colosal";
  description: string;
};

// GALERÍA //
export interface GalleryItem {
  id: number;
  src: string;
  caption: string;
}
