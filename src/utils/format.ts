export function numberWithSpaces(x: number): string {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}
export function sanitizeNumericInput(x: string): number {
  const output = parseInt(x.replace(/\D/g, ''))
  return isNaN(output) ? 0 : output;
}