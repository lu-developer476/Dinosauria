export type Era = "Triásico" | "Jurásico" | "Cretácico";

export type DinoCard = {
  id: string;
  name: string;
  era: Era;
  diet: "Herbívoro" | "Carnívoro" | "Omnívoro";
  size: "Pequeño" | "Mediano" | "Grande" | "Colosal";
  summary: string;
};
