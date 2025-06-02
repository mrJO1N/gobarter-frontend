export type TModalViewType = "login" | "reg" | "verification";

export interface IModalInstance {
  openModal(type: TModalViewType): void;
  closeModal(): void;
}
