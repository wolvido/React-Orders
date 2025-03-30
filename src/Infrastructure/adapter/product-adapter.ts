import { Product } from "@/src/entities/product/type/product";

interface ProductDTO {
    // Basic product details
    productID: number;
    name: string;
    itemCode: string | null; 
    description: string | null; 
    brand: string;

    // Pricing and cost
    price: number; // price to sell
    cost: number; // price from supplier
    makrupPercentage: number; // Typo: Should be "markupPercentage"
    wholesalePrice: number | null;
    retailPrice: number | null;
    servicePrice: number | null;

    // Stock information
    stocks: number;
    initialStock: number;
    stockThreshold: number | null;
    stockType: string | null;
    oldProductStock: number;

    // Product categorization
    units: string;
    category: string;
    packageType: string | null;

    // Product location
    location1: string | null;
    location2: string | null;

    // Product behavior and attributes
    isReadyToConsume: boolean;
    isBundle: boolean;
    isPreparationNeeded: boolean; 
    withAdditional: boolean;

    // Schema fields
    schemaType: string | null;
    schemaValue: number;

    // Miscellaneous fields
    setQuantity: number;
    isSelected: boolean;
    originalPrice: number;
    setCost: number;
    setPrice: number; 
    lastPurchasedBy: string | null;
    remarks: string | null;
    hasErrors: boolean;
    isDeleted: boolean;
    state: number;
    isDtoSelected: boolean;

    // System-generated metadata
    sys_CreateTimeStamp: string;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string | null;
    sys_DeletedUserStamp: string | null;
}


export class ProductAdapter {
    static adapt(dto: ProductDTO): Product {
        return {
            id: dto.productID,
            name: dto.name,
            price: dto.price,
            costPrice: dto.cost,
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


