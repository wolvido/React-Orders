import Status from "@/enums/status";
import PaymentStatus from "@/enums/payment-status";
import { PurchaseOrder } from "@/entities/purchase-order";
import { dummySuppliers } from "./dummy-suppliers";
import { products } from "./dummy-products";

export const purchaseOrders: PurchaseOrder[] = [
    {
        id: 1,
        remarks: "Awaiting shipment confirmation",
        transactionDate: new Date("2024-01-13"),
        preparedBy: "john employee",
        status: Status.Delivered,
        paymentStatus: PaymentStatus.paid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[0],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 3000,
                items: [
                    {
                        product: products[0],
                        quantity: 2,
                        total: 1000,
                    },
                    {
                        product: products[1],
                        quantity: 3,
                        total: 1500,
                    },
                    {
                        product: products[2],
                        quantity: 1,
                        total: 500,
                    },
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 2,
        remarks: "Rush order",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Pending,
        paymentStatus: PaymentStatus.unPaid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(0),
            id: 0,
            supplier: dummySuppliers[1],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 4500,
                items: [
                    {
                        product: products[2],
                        quantity: 5,
                        total: 2500,
                    },
                    {
                        product: products[3],
                        quantity: 4,
                        total: 2000,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 3,
        remarks: "Bulk order for Q1",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Pending,
        paymentStatus: PaymentStatus.partialPaid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[2],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 7800,
                items: [
                    {
                        product: products[0],
                        quantity: 10,
                        total: 5000,
                    },
                    {
                        product: products[4],
                        quantity: 7,
                        total: 2800,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 4,
        remarks: "Regular monthly order",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Pending,
        paymentStatus: PaymentStatus.unPaid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[0],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 6200,
                items: [
                    {
                        product: products[1],
                        quantity: 8,
                        total: 4000,
                    },
                    {
                        product: products[3],
                        quantity: 4,
                        total: 2200,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 5,
        remarks: "Special order - High priority",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Pending,
        paymentStatus: PaymentStatus.unPaid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[1],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 9300,
                items: [
                    {
                        product: products[2],
                        quantity: 12,
                        total: 6000,
                    },
                    {
                        product: products[4],
                        quantity: 8,
                        total: 3300,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 6,
        remarks: "Seasonal stock replenishment",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Delivered,
        paymentStatus: PaymentStatus.paid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[2],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 5500,
                items: [
                    {
                        product: products[0],
                        quantity: 6,
                        total: 3000,
                    },
                    {
                        product: products[2],
                        quantity: 5,
                        total: 2500,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 7,
        remarks: "Emergency restock",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Pending,
        paymentStatus: PaymentStatus.unPaid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[0],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 4100,
                items: [
                    {
                        product: products[1],
                        quantity: 5,
                        total: 2500,
                    },
                    {
                        product: products[4],
                        quantity: 4,
                        total: 1600,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 8,
        remarks: "Standard delivery",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Pending,
        paymentStatus: PaymentStatus.unPaid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[1],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 7200,
                items: [
                    {
                        product: products[3],
                        quantity: 9,
                        total: 4500,
                    },
                    {
                        product: products[2],
                        quantity: 6,
                        total: 2700,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 9,
        remarks: "Quarterly bulk purchase",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Pending,
        paymentStatus: PaymentStatus.partialPaid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[2],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 8800,
                items: [
                    {
                        product: products[0],
                        quantity: 8,
                        total: 4000,
                    },
                    {
                        product: products[4],
                        quantity: 12,
                        total: 4800,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 10,
        remarks: "Express delivery required",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Delivered,
        paymentStatus: PaymentStatus.paid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[0],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 6700,
                items: [
                    {
                        product: products[1],
                        quantity: 7,
                        total: 3500,
                    },
                    {
                        product: products[3],
                        quantity: 8,
                        total: 3200,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    },
    {
        id: 11,
        remarks: "Year-end stock up",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Delivered,
        paymentStatus: PaymentStatus.paid,
        delivery:{
            receiptNumber: "",
            dueDate: new Date(),
            id: 0,
            supplier: dummySuppliers[1],
            deliveryDate: new Date(),
            deliveredBy: "",
            receivedItems: {
                total: 9900,
                items: [
                    {
                        product: products[2],
                        quantity: 15,
                        total: 7500,
                    },
                    {
                        product: products[4],
                        quantity: 6,
                        total: 2400,
                    }
                ],
                deliveryId: 0
            },
            total: 0,
        }
    }
];
