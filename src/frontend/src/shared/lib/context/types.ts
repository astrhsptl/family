export interface IModalContext {
  open?(): void;
  close?(): void;
  toggle(): void;
}
