// seed.json holds relative dates ("in 45 days at 19:00"), so the demo data is
// always in the future. SEED_DATE=2026-10-01 fixes "today" (tests, screenshots).
export function relativeDate(days: number, time: string): string {
  const date = process.env.SEED_DATE ? new Date(`${process.env.SEED_DATE}T00:00`) : new Date();
  if (Number.isNaN(date.getTime())) throw new Error('SEED_DATE must look like 2026-10-01.');
  date.setDate(date.getDate() + days);
  const [hours, minutes] = time.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0); // local time of the machine
  return date.toISOString(); // stored in UTC
}
