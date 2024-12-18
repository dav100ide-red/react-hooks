export default function wait<T = unknown>(
  value: T,
  duration: number
): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), duration);
  }).then(() => value);
}
