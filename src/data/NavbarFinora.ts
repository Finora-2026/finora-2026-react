export type NavItem = {
  label: string;
  to: string;
  match: (pathname: string) => boolean;
};

export const matchModule = (module: string) => (pathname: string) =>
  pathname.startsWith(`/finora/${module}`);

export const navItems: NavItem[] = [
  {
    label: "Main Menu",
    to: "/finora",
    match: (p) => p === "/finora",
  },
  {
    label: "Transactions",
    to: "/finora/transactions/add",
    match: matchModule("transactions"),
  },
  {
    label: "Accounts",
    to: "/finora/accounts/list",
    match: matchModule("accounts"),
  },
  {
    label: "Reports",
    to: "/finora/reports",
    match: matchModule("reports"),
  },
  {
    label: "Records",
    to: "/finora/records",
    match: matchModule("records"),
  },
  {
    label: "Loans",
    to: "/finora/loans",
    match: matchModule("loans"),
  },
  {
    label: "Investment",
    to: "/finora/investment",
    match: matchModule("investment"),
  },
  {
    label: "Analytics [Testing]",
    to: "/finora/analytics",
    match: matchModule("analytics"),
  },
];