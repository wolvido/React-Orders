import Status from "@/enums/status";
import PaymentStatus from "@/enums/payment-status";
import { PurchaseOrder } from "@/entities/purchase-order";
import { dummySuppliers } from "./dummy-suppliers";
import { products } from "./dummy-products";

export const purchaseOrders: PurchaseOrder[] = [
    // Existing purchase order
    {
        id: 1,
        remarks: "Awaiting shipment confirmation",
        transactionDate: new Date("2024-01-13"),
        preparedBy: "john employee",
        status: Status.Delivered,
        paymentStatus: PaymentStatus.paid,
        delivery:{
            receiptNumber: "123456",
            dueDate: new Date("2024-01-15"),
            id: 1,
            supplier: dummySuppliers[0],
            deliveryDate: new Date("2021-01-01"),
            deliveredBy: "John Doe",
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
                ]
            },
            total: 1500,
        }
    },
    // New purchase orders
    {
        id: 2,
        remarks: "Rush order",
        transactionDate: new Date("2024-01-11"),
        preparedBy: "john employee",
        status: Status.Cancelled,
        paymentStatus: PaymentStatus.unPaid,
        delivery:{
            receiptNumber: "PO-789012",
            dueDate: new Date("2024-02-01"),
            id: 2,
            supplier: dummySuppliers[1],
            deliveryDate: new Date("2024-01-20"),
            deliveredBy: "Mike Wilson",
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
                ]
            },
            total: 4500,
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
            receiptNumber: "PO-345678",
            dueDate: new Date("2024-03-15"),
            id: 3,
            supplier: dummySuppliers[2],
            deliveryDate: new Date("2024-03-01"),
            deliveredBy: "Sarah Johnson",
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
                ]
            },
            total: 7800,
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
            receiptNumber: "PO-901234",
            dueDate: new Date("2024-02-28"),
            id: 4,
            supplier: dummySuppliers[0],
            deliveryDate: new Date("2024-02-15"),
            deliveredBy: "Robert Chen",
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
                ]
            },
            total: 6200,
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
            receiptNumber: "PO-567890",
            dueDate: new Date("2024-01-30"),
            id: 5,
            supplier: dummySuppliers[1],
            deliveryDate: new Date("2024-01-25"),
            deliveredBy: "Lisa Wong",
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
                ]
            },
            total: 9300,
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
            receiptNumber: "PO-123789",
            dueDate: new Date("2024-04-15"),
            id: 6,
            supplier: dummySuppliers[2],
            deliveryDate: new Date("2024-04-01"),
            deliveredBy: "David Martinez",
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
                ]
            },
            total: 5500,
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
            receiptNumber: "PO-456123",
            dueDate: new Date("2024-02-10"),
            id: 7,
            supplier: dummySuppliers[0],
            deliveryDate: new Date("2024-02-05"),
            deliveredBy: "Emma Davis",
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
                ]
            },
            total: 4100,
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
            receiptNumber: "PO-789456",
            dueDate: new Date("2024-03-30"),
            id: 8,
            supplier: dummySuppliers[1],
            deliveryDate: new Date("2024-03-20"),
            deliveredBy: "James Wilson",
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
                ]
            },
            total: 7200,
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
            receiptNumber: "PO-234567",
            dueDate: new Date("2024-05-15"),
            id: 9,
            supplier: dummySuppliers[2],
            deliveryDate: new Date("2024-05-01"),
            deliveredBy: "Maria Garcia",
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
                ]
            },
            total: 8800,
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
            receiptNumber: "PO-345912",
            dueDate: new Date("2024-02-20"),
            id: 10,
            supplier: dummySuppliers[0],
            deliveryDate: new Date("2024-02-15"),
            deliveredBy: "Tom Anderson",
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
                ]
            },
            total: 6700,
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
            receiptNumber: "PO-678234",
            dueDate: new Date("2024-12-20"),
            id: 11,
            supplier: dummySuppliers[1],
            deliveryDate: new Date("2024-12-15"),
            deliveredBy: "Chris Lee",
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
                ]
            },
            total: 9900,
        }
    }
];

