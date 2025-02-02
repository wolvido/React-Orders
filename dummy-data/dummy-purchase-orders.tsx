import Status from "@/enums/status";
import { PurchaseOrder } from "@/entities/purchase-order";
import { dummySuppliers } from "./dummy-suppliers";
import { dummyProducts } from "./dummy-products";

export const purchaseOrders: PurchaseOrder[] = [
    {
        id: 1,
        supplier: "ABC Supplies Ltd.",
        transactionDate: "2021-01-01",
        deliveryDate: "2021-01-01",
        total: 1000,
        preparedBy: "John Doe",
        status: Status.Delivered,
        remarks: "Delivered on time, all items received in good condition",
    },
    {
        id: 2,
        remarks: "Awaiting shipment confirmation",
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
                        product: dummyProducts[0],
                        quantity: 2,
                        total: 1000,
                    },
                    {
                        product: dummyProducts[1],
                        quantity: 3,
                        total: 1500,
                    },
                    {
                        product: dummyProducts[1],
                        quantity: 1,
                        total: 500,
                    },
                ]
            },
            total: 1500,
        }
    }
];
