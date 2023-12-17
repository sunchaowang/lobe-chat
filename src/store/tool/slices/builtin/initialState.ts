
export interface BuiltinToolState {
  builtinToolLoading: Record<string, boolean>;
}

export const initialBuiltinToolState: BuiltinToolState = {
  builtinToolLoading: {},
};
