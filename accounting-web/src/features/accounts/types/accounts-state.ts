import type { Account } from "./account";

export type AccountsState = {
  accounts: Account[] | null;
  getAccounts: () => Promise<void>;
  addAccount: (account: Partial<Account>) => Promise<void>;
  updateAccount: (
    documentId: string,
    account: Partial<Account>
  ) => Promise<void>;
  removeAccount: (documentId: string) => Promise<void>;
};
