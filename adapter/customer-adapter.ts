import { Customer } from "@/entities/customers";

// Create interface for the source data
interface RestaurantOrderDTO {
    customerId: number;
    customerName: string;
    contactNumber: string | null;
    address: string | null;
    // ... other fields from the JSON
}

// Create the adapter
export class CustomerAdapter {
    static adapt(dto: RestaurantOrderDTO): Customer {
        return {
            id: dto.customerId,
            name: dto.customerName,
            contactNumber: dto.contactNumber || '',
            address: dto.address || ''
        };
    }
}
