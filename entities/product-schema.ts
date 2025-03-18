export interface ProductSchema { //aka pricing schema
    id: number;
    description: string;

    /**
     * @string "Percentage" → Discount or markup is a percentage of the base price.
     * @string "Fixed" → Discount or markup is a fixed amount.
     * @string "Custom" → Custom pricing.
     * @string "Mixed" → Combination of percentage and fixed pricing.
     * @string "Overwrite" → Overwrite sapawan.
     */
    type: string;

    /**
     * used to determine which products the schema will apply to,
     * @string "All" → Apply to all products.
     * If ProductSchema.type = "Custom" or "Mixed" or "Overwrite", this refers to custom calculations or rules, so it will be treated as "Selected".
     * @string "Selected" → Apply to selected products.
     */
    selectionType: string;

    /**
     * @number If ProductSchema.type = "Percentage", this would be a percentage (e.g., 10 for 10%).
     * @number If ProductSchema.type = "Fixed", this would be an absolute amount (e.g., 100 for ₱100 off).
     */
    modifyingValue: number;
}