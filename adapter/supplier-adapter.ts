import { Supplier } from "@/entities/supplier";

interface SupplierDTO {
    supplierID: number;
    description: string | null;
    name: string;
    address: string | null;
    contactNumber: string | null;
    contactPerson: string | null;
    terms: number;
    tin: number;
    category: string | null;
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

export class SupplierAdapter {
    static adapt(dto: SupplierDTO): Supplier {
        return {
            id: dto.supplierID,
            name: dto.name,
            address: dto.address || '',
            contactNumber: dto.contactNumber || '',
            contactPerson: dto.contactPerson || ''
        };
    }
}
