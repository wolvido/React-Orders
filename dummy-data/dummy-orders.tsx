import { Order } from "@/entities/order";
import PaymentStatus from "@/enums/payment-status";
import Status from "@/enums/status";

export const orders: Order[] = [
    {
        id: 1001,
        orderType: {
            type: "Cash",
            id: 1,
            amountDue: 1500,
            cashTendered: 2000,
            changeDue: 500
        },
        customer: {
            id: 1,
            name: "John Smith",
            email: "john.smith@email.com"
        },
        transactionDate: new Date("2024-01-15"),
        total: 1500,
        orderStatus:  PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        remarks: "Regular customer",
        deliveryAddress: "123 Main St, City",
        cart: { items: [], total: 0 }
    },
    {
        id: 1002,
        orderType: {
            type: "Cash",  // Must be one of the specific types
            id: 0,
            amountDue: 0,
            cashTendered: 0,
            changeDue: 0
        },
        customer: {
            id: 2,
            name: "Maria Garcia",
            email: "maria.garcia@email.com"
        },
        transactionDate: new Date("2024-01-16"),
        total: 3450.75,
        orderStatus: PaymentStatus.unPaid,
        fulfillmentStatus: Status.Pending,
        remarks: "First time order",
        deliveryAddress: "pickup",
        cart: { items: [], total: 0 }
    },
    {
        id: 1003,
        orderType: {
            type: "Bank Transfer",
            amount: 2500,
            bankName: "Metro Bank",
            id: 1003,
            depositDate: new Date("2024-01-17")
        },
        customer: {
            id: 3,
            name: "David Wilson",
            email: "david.wilson@email.com"
        },
        transactionDate: new Date("2024-01-17"),
        total: 2500,
        orderStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        remarks: "",
        deliveryAddress: "456 Oak Road, Township",
        cart: { items: [], total: 0 }
    },
    {
        id: 1004,
        orderType: {
            type: "Cash",
            id: 0,
            amountDue: 0,
            cashTendered: 0,
            changeDue: 0
        },
        customer: {
            id: 4,
            name: "Sarah Johnson",
            email: "sarah.j@email.com"
        },
        transactionDate: new Date("2024-01-18"),
        total: 1750.50,
        orderStatus:  PaymentStatus.partialPaid,
        fulfillmentStatus: Status.Pending,
        remarks: "Partial payment received",
        deliveryAddress: "789 Pine Ave, District",
        cart: { items: [], total: 0 }
    },
    {
        id: 1005,
        orderType: {
            type: "Cheque",
            chequeNumber: "CHK-1005",
            bankName: "BDO",
            amount: 5000,
            remark: "30-day clearing",
            chequeDate: new Date("2024-01-19")
        },
        customer: {
            id: 5,
            name: "Michael Brown",
            email: "m.brown@email.com"
        },
        transactionDate: new Date("2024-01-19"),
        total: 5000,
        orderStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        remarks: "Bulk order",
        deliveryAddress: "pickup",
        cart: { items: [], total: 0 }
    },
    {
        id: 1006,
        orderType: {
            type: "Cash",
            id: 0,
            amountDue: 0,
            cashTendered: 0,
            changeDue: 0
        },
        customer: {
            id: 6,
            name: "Emma Davis",
            email: "emma.d@email.com"
        },
        transactionDate: new Date("2024-01-20"),
        total: 1875.25,
        orderStatus: PaymentStatus.unPaid,
        fulfillmentStatus:  Status.Cancelled,
        remarks: "Customer cancelled",
        deliveryAddress: "321 Elm St, Borough",
        cart: { items: [], total: 0 }
    },
    {
        id: 1007,
        orderType: {
            type: "Payment gateway",
            paymentProvider: "GCash",
            id: 1007,
            transactionFee: 45
        },
        customer: {
            id: 7,
            name: "James Miller",
            email: "j.miller@email.com"
        },
        transactionDate: new Date("2024-01-21"),
        total: 4500,
        orderStatus: PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        remarks: "Online payment",
        deliveryAddress: "654 Maple Dr, City",
        cart: { items: [], total: 0 }
    },
    {
        id: 1008,
        orderType: {
            type: "Cash",
            id: 0,
            amountDue: 0,
            cashTendered: 0,
            changeDue: 0
        },
        customer: {
            id: 8,
            name: "Sofia Rodriguez",
            email: "sofia.r@email.com"
        },
        transactionDate: new Date("2024-01-22"),
        total: 950.75,
        orderStatus: PaymentStatus.unPaid,
        fulfillmentStatus:  Status.Pending,
        remarks: "Pending payment confirmation",
        deliveryAddress: "pickup",
        cart: { items: [], total: 0 }
    },
    {
        id: 1009,
        orderType: {
            type: "Cash",
            id: 2,
            amountDue: 3250,
            cashTendered: 3500,
            changeDue: 250
        },
        customer: {
            id: 9,
            name: "William Taylor",
            email: "w.taylor@email.com"
        },
        transactionDate: new Date("2024-01-23"),
        total: 3250,
        orderStatus:  PaymentStatus.paid,
        fulfillmentStatus: Status.Delivered,
        remarks: "Cash on delivery",
        deliveryAddress: "987 Cedar Lane, Township",
        cart: { items: [], total: 0 }
    },
    {
        id: 1010,
        orderType: {
            type: "Cash",
            id: 0,
            amountDue: 0,
            cashTendered: 0,
            changeDue: 0
        },
        customer: {
            id: 10,
            name: "Olivia Anderson",
            email: "o.anderson@email.com"
        },
        transactionDate: new Date("2024-01-24"),
        total: 2150,
        orderStatus: PaymentStatus.partialPaid,
        fulfillmentStatus:  Status.Pending,
        remarks: "50% down payment",
        deliveryAddress: "147 Beach Road, District",
        cart: { items: [], total: 0 }
    }
];
