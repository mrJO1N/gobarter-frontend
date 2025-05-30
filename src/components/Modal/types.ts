export type TModalViewType = "login" | "reg";

export interface IModalInstance {
  openModal(type: TModalViewType): void;
  closeModal(): void;
}
