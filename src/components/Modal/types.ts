export type TModalViewType = "login" | "reg" | "verification" | "create post";

export interface IModalInstance {
  openModal(type: TModalViewType): void;
  closeModal(): void;
}
