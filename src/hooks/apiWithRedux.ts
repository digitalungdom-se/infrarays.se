import { RootState } from "store";
import { TypedUseSelectorHook } from "react-redux";

interface UseHook<T> {
  loading: boolean;
  error: any;
  data: T;
}

interface UseWithRedux {
  selector: TypedUseSelectorHook<RootState>;
}

// export function useWithRedux(selector) {}
