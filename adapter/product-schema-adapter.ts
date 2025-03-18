import { ProductSchema } from "@/entities/product-schema";

export interface ProductSchemaDTO {
    id: number;
    description: string;
    type: string;
    selectionType: string | null;
    modifyingValue: number;
    schemaData: any | null;
    isMigrated: boolean;
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

export function toProductSchema(productSchemaDTO: ProductSchemaDTO): ProductSchema {
    return{
        id: productSchemaDTO.id,
        description: productSchemaDTO.description,
        type: productSchemaDTO.type,
        selectionType: productSchemaDTO.selectionType || "All",
        modifyingValue: productSchemaDTO.modifyingValue,
    }
}
