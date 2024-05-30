export type PaginatedResult<T> = {
  next: number | null;
  prev: number | null;
  pages: number | null;
  data: T[];
};

export interface EntityId {
  id: string | number;
}

export interface WrongResponse {
  data: null;
}
