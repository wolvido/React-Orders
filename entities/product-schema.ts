export interface ProductSchema {
    id: number;

    type: string;
        //"Percentage" → Discount or markup is a percentage of the base price.
        // "Fixed" → A fixed amount discount or surcharge.
        // "Mixed" → Combination of percentage and fixed pricing.
        // "Custom" → Custom pricing.

    selectionType: string;
        // "All" → Apply to all products.
        // "Selected" → Apply to selected products.
        // "Category" → Apply to products in a specific category.
        // "Brand" → Apply to products of a specific brand.
        // "Product" → Apply to a specific product.

    modifyingValue: number;
        // If type = "Percentage", this would be a percentage (e.g., 10 for 10%).
        // If type = "Fixed", this would be an absolute amount (e.g., 100 for ₱100 off).
}