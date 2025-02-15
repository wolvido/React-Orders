import { Customer } from "@/entities/customers";

// Create interface for the source data
interface CustomerDTO {
    customerID: number;
    firstName: string;
    lastName: string;
    fullName: string;
    address: string | null;
    birthDate: string | null;
    contactNumber: string | null;
    occupation: string | null;
    balance: number;
    company: string | null;
    tin: string | null;
    productSchemaId: number;
    pumpRate: number;
    isRateWithVat: boolean;
    hasErrors: boolean;
    isDeleted: boolean;
    sys_CreateTimeStamp: string | null;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string | null;
    sys_LastEditedUserStamp: string | null;
    sys_DeletedTimeStamp: string | null;
    sys_DeletedUserStamp: string | null;
    state: number;
    isDtoSelected: boolean;
}

// Create the adapter
export class CustomerAdapter {
    static adapt(dto: CustomerDTO): Customer {
        console.log('dtoCustomer: '+dto);
        return {
            id: dto.customerID,
            name: dto.fullName,
            contactNumber: dto.contactNumber || '',
            address: dto.address || ''
        };
    }
}
