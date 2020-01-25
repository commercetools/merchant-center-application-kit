// Type guard to help with filtering arrays for nullish elements.
export default function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
