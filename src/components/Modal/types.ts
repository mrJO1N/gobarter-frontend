export type TModalViewType =
  | "login"
  | "reg"
  | "verification"
  | "create post"
  | "empty modal";

export interface IModalInstance {
  openModal(type: TModalViewType, data?: any): void;
  closeModal(): void;
}
