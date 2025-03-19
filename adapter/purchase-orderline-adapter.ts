

interface PurchaseOrderLineDTO {
    /** Indicates if the record has been deleted. */
    isDeleted: boolean;
  
    /** Timestamp when the record was created. */
    sys_CreateTimeStamp: string;
  
    /** User who created the record. */
    sys_CreateUserStamp: string;
  
    /** Timestamp when the record was last edited. */
    sys_LastEditedTimeStamp: string;
  
    /** User who last edited the record. */
    sys_LastEditedUserStamp: string;
  
    /** Timestamp when the record was deleted. */
    sys_DeletedTimeStamp: string;
  
    /** User who deleted the record. */
    sys_DeletedUserStamp: string;
  
    /** The current state of the record (used for tracking status). */
    state: number;
  
    /** Indicates if this DTO (Data Transfer Object) is selected. */
    isDtoSelected: boolean;
  
    /** Unique identifier for this purchase order line item. */
    purchaseOrderlineId: number;
  
    /** Name of the product being ordered. */
    productName: string;
  
    /** Unique code identifying the product. */
    itemCode: string;
  
    /** Additional details about the product. */
    description: string;
  
    /** Brand of the product. */
    brand: string;
  
    /** Unit of measurement for the product (e.g., kg, pcs, liters). */
    units: string;
  
    /** Original price of a single unit before any discounts. */
    basePrice: number;
  
    /** Discount applied as a percentage (e.g., 10% off). */
    percentageDiscount: number;
  
    /** Fixed amount deducted from the total price (e.g., $5 off). */
    flatDiscount: number;
  
    /** Final price after applying discounts. */
    totalPrice: number;
  
    /** Number of units still expected to arrive. */
    noofOrdersToArrive: number;
  
    /** Total quantity of the item that was ordered. */
    orderedQuantity: number;
  
    /** Number of units that have been received. */
    receivedQuantity: number;
  
    /** Indicates if the order has been received (true if received but not yet delivered). */
    isReceived: boolean;
  
    /** Indicates if the item has been processed for delivery. */
    isProcessed: boolean;
  
    /** Foreign key linking this line item to a purchase order. */
    purchaseOrderId: number;
  
    /** Foreign key linking to the product in the product catalog. */
    productId: number;
  
    /** Foreign key linking to raw materials (if applicable). */
    rawMaterialId: number;
  
    /** The type of item (e.g., "Product" or "RawMaterial"). */
    itemType: string;
  }
  