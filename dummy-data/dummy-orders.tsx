import PaymentStatus from "@/enums/payment-status";
import Status from "@/enums/status";

export const orders = [
    {
        key: 1,
        orderType: "Cheque",
        customer: 'John Smith',
        transactionDate: '2023-10-10',
        paymentStatus: PaymentStatus.unPaid,
        fulfillmentStatus: Status.Cancelled,
        total: 1250.00
    },
    {
        key: 2,
        orderType: "Bank Transfer",
        customer: 'Mary Williams',
        transactionDate: '2023-10-11',
        paymentStatus: PaymentStatus.partialPaid,
        fulfillmentStatus: Status.Pending,
        total: 3475.50
    },
    {
        key: 3,
        orderType: "Payment Gateway",
        customer: 'Robert Jones',
        transactionDate: '2023-10-12',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        total: 899.99
    },
    {
        key: 4,
        orderType: "Credit Card",
        customer: 'Sarah Johnson',
        transactionDate: '2023-10-15',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Pending,
        total: 2100.00
    },
    {
        key: 5,
        orderType: "PayPal",
        customer: 'Michael Brown',
        transactionDate: '2023-10-16',
        paymentStatus: PaymentStatus.unPaid,
        fulfillmentStatus: Status.Pending,
        total: 750.25
    },
    {
        key: 6,
        orderType: "Bank Transfer",
        customer: 'Emma Davis',
        transactionDate: '2023-10-17',
        paymentStatus: PaymentStatus.partialPaid,
        fulfillmentStatus: Status.Pending,
        total: 4999.99
    },
    {
        key: 7,
        orderType: "Cheque",
        customer: 'James Wilson',
        transactionDate: '2023-10-18',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        total: 1875.50
    },
    {
        key: 8,
        orderType: "Payment Gateway",
        customer: 'Lisa Anderson',
        transactionDate: '2023-10-19',
        paymentStatus: PaymentStatus.unPaid,
        fulfillmentStatus: Status.Cancelled,
        total: 325.75
    },
    {
        key: 9,
        orderType: "Credit Card",
        customer: 'David Martinez',
        transactionDate: '2023-10-20',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        total: 5250.00
    },
    {
        key: 10,
        orderType: "PayPal",
        customer: 'Jennifer Taylor',
        transactionDate: '2023-10-21',
        paymentStatus: PaymentStatus.partialPaid,
        fulfillmentStatus: Status.Pending,
        total: 1499.99
    },
    {
        key: 11,
        orderType: "Bank Transfer",
        customer: 'Thomas Garcia',
        transactionDate: '2023-10-22',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        total: 3750.00
    },
    {
        key: 12,
        orderType: "Payment Gateway",
        customer: 'Emily White',
        transactionDate: '2023-10-23',
        paymentStatus: PaymentStatus.unPaid,
        fulfillmentStatus: Status.Pending,
        total: 925.50
    },
    {
        key: 13,
        orderType: "Cheque",
        customer: 'Daniel Lee',
        transactionDate: '2023-10-24',
        paymentStatus: PaymentStatus.partialPaid,
        fulfillmentStatus: Status.Cancelled,
        total: 2899.99
    },
    {
        key: 14,
        orderType: "Credit Card",
        customer: 'Sofia Rodriguez',
        transactionDate: '2023-10-25',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Pending,
        total: 1650.75
    },
    {
        key: 15,
        orderType: "PayPal",
        customer: 'William Clark',
        transactionDate: '2023-10-26',
        paymentStatus: PaymentStatus.unPaid,
        fulfillmentStatus: Status.Pending,
        total: 475.25
    },
    {
        key: 16,
        orderType: "Bank Transfer",
        customer: 'Isabella Moore',
        transactionDate: '2023-10-27',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        total: 6999.99
    },
    {
        key: 17,
        orderType: "Payment Gateway",
        customer: 'Oliver Thompson',
        transactionDate: '2023-10-28',
        paymentStatus: PaymentStatus.partialPaid,
        fulfillmentStatus: Status.Pending,
        total: 2250.50
    },
    {
        key: 18,
        orderType: "Credit Card",
        customer: 'Ava Martinez',
        transactionDate: '2023-10-29',
        paymentStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        total: 3125.75
    }
];
