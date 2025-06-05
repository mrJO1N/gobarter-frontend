export interface IOffer {
  title: string;
  description: string;
  offer: string;
  need: string;
}

export interface IGettedOffer extends IOffer {
  id: number;
}
