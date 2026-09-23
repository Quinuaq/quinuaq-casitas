/** Date-only values must not shift a day when converted to UTC. */
export function localDateISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function todayISO(offsetDays = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return localDateISO(date);
}

export function nextDateISO(value: string): string {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return todayISO(1);
  date.setDate(date.getDate() + 1);
  return localDateISO(date);
}
