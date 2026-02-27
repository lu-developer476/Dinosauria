export type Era = "Holoceno";

// DINO TARJETAS //
export type DinoCard = {
  id: string;
  name: string;
  era: Era;
  diet: "Carnívoro" | "Duróvoro" | "Herbívoro" | "Insectívoro" | "Piscívoro" | "Omnívoro";
  description: string;
};

// GALERÍA //
export type GalleryImage = {
  id: number;
  src: string;
  caption: string;
};
