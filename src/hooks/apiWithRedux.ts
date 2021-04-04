export interface UseHook<T, E> {
  loading: boolean;
  error: E;
  data: T;
}
