export function isServerSide(): boolean {
  return typeof document === 'undefined'
}
