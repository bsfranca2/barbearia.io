import type { Generated } from "kysely";

export interface Account {
  id: Generated<number>;
  userId: number;
  userType: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken: string | null;
  accessToken: string | null;
  expiresAt: Date | null;
  tokenType: string | null;
  scope: string | null;
  idToken: string | null;
  sessionState: string | null;
}
