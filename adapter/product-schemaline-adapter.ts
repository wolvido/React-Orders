import { ProductSchemaLine } from "@/entities/product-schema-line";

export interface ProductSchemaLineDTO {
    productSchemalineId: number;
    productSchemaId: number;
    productId: number;
    schemaType: string;
    modifyingValue: number;
    hasErrors: boolean;
    isDeleted: boolean;
    sys_CreateTimeStamp: string | null;
    sys_CreateUserStamp: string | null;
    sys_LastEditedTimeStamp: string | null;
    sys_LastEditedUserStamp: string | null; 
    sys_DeletedTimeStamp: string | null; 
    sys_DeletedUserStamp: string | null; 
    state: number;
    isDtoSelected: boolean;
}

export function toProductSchemaLine(productSchemaLineDTO: ProductSchemaLineDTO): ProductSchemaLine {
    return {
        id: productSchemaLineDTO.productSchemalineId,
        productSchemaId: productSchemaLineDTO.productSchemaId,
        productId: productSchemaLineDTO.productId,
        type: productSchemaLineDTO.schemaType,
        modifyingValue: productSchemaLineDTO.modifyingValue,
    }
}