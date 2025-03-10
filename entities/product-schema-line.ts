export interface ProductSchemaLine {
    id: number;
    productSchemaId: number;
    productId: number;

    type: string;
        // "Percentage" → Apply a percentage-based adjustment.
        // "Fixed" → Apply a fixed amount discount or surcharge.
        // "Custom" → Uses a custom formula.
        // "Mixed" → Combination of percentage and fixed.

    modifyingValue: number;
        // If SchemaType = "Percentage", this is the percentage value (e.g., 10 means 10% discount).
        // If SchemaType = "Fixed", this is the fixed amount (e.g., 100 means ₱100 off).
        // If SchemaType = "Custom", this could refer to custom calculations or rules.
}