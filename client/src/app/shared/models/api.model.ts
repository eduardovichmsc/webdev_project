export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  ordering?: string;
  results: T[];
}
