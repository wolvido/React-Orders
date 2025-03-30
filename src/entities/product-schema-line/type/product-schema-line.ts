export interface ProductSchemaLine {
    id: number;
    productSchemaId: number;
    productId: number;

    /**
     * @string "Percentage" → Apply a percentage-based adjustment.
     * @string "Fixed" → Apply a fixed amount discount or surcharge.
     * @string "Custom" → Uses a custom formula.
     * @string "Overwrite" → Overwrite.
     */
    type: string;

    /**
     * @number If Type = "Percentage", this is the percentage value (e.g., 10 means 10% discount).
     * @number If Type = "Fixed", this is the fixed amount (e.g., -100 means ₱100 off).
     * @number If Type = "Custom", this could refer to custom calculations or rules.
     * @number If Type = "Overwrite", overwrite.
     */
    modifyingValue: number;
}