export const boxesFinoraMenu = [
    {
        title: "Transactions",
        text: "Manage all bank transactions and track spending, balances",
        speed: 85,
        buttons: [
            { label: "Add Transaction", to: "transaction-add" },
            { label: "Pending Transactions", to: "transaction-pending" },
            { label: "Search Transaction", to: "transaction-search" },
            { label: "Posted Transactions", to: "transaction-posted" },
            { label: "Repeat Transactions", to: "transaction-repeat" },
        ],
    },

    {
        title: "Reports",
        text: "Generate reports and analyze financial performance",
        speed: 95,
        buttons: [
            { label: "New Report", to: "report-new" },
            { label: "Pending Report", to: "report-pending" },
            { label: "List All Reports", to: "report-list" },
            { label: "Custom Report", to: "report-custom" },
            { label: "Net Worth", to: "report-net-worth" },
            { label: "Assets", to: "report-assets" },
        ],
    },

    {
        title: "Banks",
        text: "Manage linked banks and account information",
        speed: 75,
        buttons: [
            { label: "List Banks", to: "bank-list" },
            { label: "Add Bank", to: "bank-add" },
        ],
    },

    {
        title: "Records",
        text: "Maintain active and archived financial records",
        speed: 90,
        buttons: [
            { label: "Active Records", to: "record-active" },
            { label: "Add New Record", to: "record-add" },
            { label: "Old Records", to: "record-old" },
        ],
    },

    {
        title: "Loans",
        text: "Track loan balances and payment information",
        speed: 100,
        buttons: [
            { label: "Student Loans", to: "loan-student" },
            { label: "Car Loans", to: "loan-car" },
            { label: "Mortgage", to: "loan-mortgage" },
        ],
    },

    {
        title: "Investment",
        text: "Monitor investment accounts and transaction activity",
        speed: 110,
        buttons: [
            { label: "All Accounts", to: "investment-accounts" },
            { label: "Investment Transactions", to: "investment-transactions" },
        ],
    },
];