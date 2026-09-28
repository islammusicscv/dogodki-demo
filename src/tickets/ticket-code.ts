import { randomBytes } from 'crypto';

// Unguessable entry code, e.g. "DG-7F3A91C2" (32 random bits).
export function generateTicketCode(): string {
  return 'DG-' + randomBytes(4).toString('hex').toUpperCase();
}
