export interface BundleLineDTO {
    bundlelineID: number;
    productID: number;
    productName: string;
    productCost: number;
    totalCost: number;
    quantity: number;
    unit: string;
    bundleID: number;
    bundleName: string;
    isRequired: boolean;
    quantityLimit: number;
    setQuantity: number;
    oldQuantity: number;
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