import { Product } from "@/entities/product";

interface ProductDTO {
    productID: number;
    name: string;
    itemCode: string | null;
    description: string | null;
    brand: string;
    price: number;
    stocks: number;
    stockThreshold: number | null;
    units: string;
    category: string;
    packageType: string | null;
    stockType: string | null;
    cost: number;
    makrupPercentage: number;
    location1: string | null;
    location2: string | null;
    wholesalePrice: number | null;
    retailPrice: number | null;
    servicePrice: number | null;
    initialStock: number;
    isReadyToConsume: boolean;
    isBundle: boolean;
    isPreparationNeeded: boolean;
    withAdditional: boolean;
    lastPurchasedBy: string | null;
    setQuantity: number;
    schemaType: string | null;
    schemaValue: number;
    isSelected: boolean;
    originalPrice: number;
    setCost: number;
    setPrice: number;
    oldProductStock: number;
    remarks: string | null;
    hasErrors: boolean;
    isDeleted: boolean;
    sys_CreateTimeStamp: string;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string | null;
    sys_DeletedUserStamp: string | null;
    state: number;
    isDtoSelected: boolean;
}

export class ProductAdapter {
    static adapt(dto: ProductDTO): Product {
        return {
            id: dto.productID,
            name: dto.name,
            price: dto.price,
            category: dto.category,
            brand: dto.brand,
            stocks: dto.stocks,
            isBundle: dto.isBundle,
            unitType: dto.units,

            //bundle
            bundleType: undefined,
            bundleQuantity: undefined
        }
    }
}


