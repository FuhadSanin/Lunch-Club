// The full app talks to its API through here. In the demo every call is refused without touching
// the network, so the screens run on the sample data alone.

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Kept so the app's imports stay the same; the demo has no sign-in token to send.
export const setIdToken = (_token: string | null) => undefined;

type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | undefined>;
  signal?: AbortSignal;
};

export async function api<T>(path: string, _options: Options = {}): Promise<T> {
  throw new ApiError(0, `The demo has no server (it wanted /api/${path}).`);
}
