import { NEXT_HOST, NODE_HOST } from "./constants";

export async function fetcher<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetch(`${NEXT_HOST}/api${input}`, init).then(async (res) =>
    res.json()
  );
}

export async function fetcherNode<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetch(`${NODE_HOST}/api${input}`, init).then(async (res) =>
    res.json()
  );
}
