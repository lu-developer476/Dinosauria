export type Era = "Triásico" | "Jurásico" | "Cretácico";

export interface DinoCard {
  id: string;
  name: string;
  era: Era;
  diet: "Herbívoro" | "Carnívoro" | "Omnívoro";
  size: "Pequeño" | "Mediano" | "Grande" | "Colosal";
  description: string;
}
