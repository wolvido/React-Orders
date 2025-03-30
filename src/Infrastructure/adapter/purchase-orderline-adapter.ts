import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";


export interface PurchaseOrderLineDTO {
  // System Metadata
  isDeleted: boolean;
  sys_CreateTimeStamp: string;
  sys_CreateUserStamp: string;
  sys_LastEditedTimeStamp: string;
  sys_LastEditedUserStamp: string;
  sys_DeletedTimeStamp: string;
  sys_DeletedUserStamp: string;

  // Status & Selection
  state: number;
  isDtoSelected: boolean;
  isReceived: boolean;
  isProcessed: boolean;

  // Identifiers
  purchaseOrderlineId: number;
  purchaseOrderId: number;
  productId: number;
  rawMaterialId?: number;

  // Product Details
  productName: string;
  itemCode: string;
  description: string;
  brand: string;
  units: string;
  itemType: string;

  // Pricing & Discounts
  basePrice: number;
  percentageDiscount: number;
  flatDiscount: number;
  /**
   * TotalPrice=(BasePrice×OrderedQuantity)−PercentageDiscount−FlatDiscount
   */
  totalPrice: number;
  
  // Order Details
  noofOrdersToArrive: number;
  orderedQuantity?: number;
  receivedQuantity?: number;
}

export function PurchaseOrderLineDTOtoEntity(dto: PurchaseOrderLineDTO): PurchaseOrderLine {
  return {
    id: dto.purchaseOrderlineId,
    purchaseOrderId: dto.purchaseOrderId,
    productId: dto.productId,
    product: {
      id: dto.productId,
      name: dto.productName,
      price: dto.basePrice,
      costPrice: dto.basePrice,
      category: dto.itemType,
      brand: dto.brand,
      isBundle: false,
      stocks: dto.orderedQuantity ? dto.orderedQuantity : 0,
      unitType: dto.units,
    },
    basePrice: dto.basePrice,
    percentageDiscount: dto.percentageDiscount,
    flatDiscount: dto.flatDiscount,
    totalPrice: dto.totalPrice,
    noofOrdersToArrive: dto.noofOrdersToArrive,
    orderedQuantity: dto.orderedQuantity,
    receivedQuantity: dto.receivedQuantity,
    isReceived: dto.isReceived,
    isProcessed: dto.isProcessed,

    itemType: dto.itemType,

    creationDate: new Date(dto.sys_CreateTimeStamp),
  };
}

export function PurchaseOrderLinetoDTO(entity: PurchaseOrderLine): PurchaseOrderLineDTO {
  return {
    isDeleted: false,
    sys_CreateTimeStamp: entity.creationDate?.toLocalISOString() || new Date().toLocalISOString(),
    sys_CreateUserStamp: "system",
    sys_LastEditedTimeStamp: new Date().toLocalISOString(),
    sys_LastEditedUserStamp: "system",
    sys_DeletedTimeStamp: "",
    sys_DeletedUserStamp: "",

    state: 0,
    isDtoSelected: false,
    isReceived: entity.isReceived,
    isProcessed: entity.isProcessed,

    purchaseOrderlineId: entity.id || 0,
    purchaseOrderId: entity.purchaseOrderId,
    productId: entity.productId,

    productName: entity.product?.name || "",
    itemCode: '',
    description: '',
    brand: entity.product?.brand || "",
    units: entity.product?.unitType || "",
    itemType: entity.itemType,

    basePrice: entity.basePrice,
    percentageDiscount: entity.percentageDiscount,
    flatDiscount: entity.flatDiscount,
    totalPrice: entity.totalPrice,
    
    noofOrdersToArrive: entity.noofOrdersToArrive,
    orderedQuantity: entity.orderedQuantity,
    receivedQuantity: entity.receivedQuantity,
  };
}
