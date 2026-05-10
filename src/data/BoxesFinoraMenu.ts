export const boxesFinoraMenu = [
    {
        title: "Transactions",
        text: "Manage all bank transactions and track spending, balances",
        speed: 85,
        buttons: [
            { label: "Add Transaction", to: "transactions/add" },
            { label: "Pending Transactions", to: "transactions/pending" },
            { label: "Search Transaction", to: "transactions/search" },
            { label: "Posted Transactions", to: "transactions/posted" },
            { label: "Repeat Transactions", to: "transactions/repeat" },
        ],
    },
    
    {
        title: "Reports",
        text: "Generate reports and analyze financial performance",
        speed: 95,
        buttons: [
            { label: "New Report", to: "reports/new" },
            { label: "Pending Report", to: "reports/pending" },
            { label: "List All Reports", to: "reports/list" },
            { label: "Custom Report", to: "reports/custom" },
            { label: "Net Worth", to: "reports/net-worth" },
            { label: "Assets", to: "reports/assets" },
        ],
    },
    
    {
        title: "Bank accounts",
        text: "Manage linked banks and account information",
        speed: 75,
        buttons: [
            { label: "List all accounts", to: "accounts/list" },
            { label: "Add new account", to: "accounts/add" },
        ],
    },
    
    {
        title: "Records",
        text: "Maintain active and archived financial records",
        speed: 90,
        buttons: [
            { label: "Active Records", to: "records/active" },
            { label: "Add New Record", to: "records/add" },
            { label: "Old Records", to: "records/old" },
        ],
    },
    
    {
        title: "Loans",
        text: "Track loan balances and payment information",
        speed: 100,
        buttons: [
            { label: "Student Loans", to: "loans/student" },
            { label: "Car Loans", to: "loans/car" },
            { label: "Mortgage", to: "loans/mortgage" },
        ],
    },
    
    {
        title: "Investment",
        text: "Monitor investment accounts and transaction activity",
        speed: 110,
        buttons: [
            { label: "All Accounts", to: "investment/accounts" },
            { label: "Investment Transactions", to: "investment/transactions" },
        ],
    },
];