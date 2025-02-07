import { Product } from '../entities/product';

export const products: Product[] = [
    {
        key: 1,
        name: 'Heinz Ketchup',
        sellingPrice: 10,
        costPrice: 5,
        unitType: 'CASE',
        stocks: 10,
        category: 'Condiments',
        brand: 'Heinz'
    },
    {
        key: 2,
        name: 'Parsley Dried', // Fixed typo in Parsley
        sellingPrice: 5,
        costPrice: 3,         // Added missing costPrice
        unitType: 'JAR',
        stocks: 15,           // Added missing stocks
        category: 'Spices',   // Added category
        brand: 'Generic'      // Added brand
    },
    {
        key: 3,
        name: 'Olive Oil Extra Virgin',
        sellingPrice: 15,
        costPrice: 10,        // Added missing costPrice
        unitType: 'CASE',
        stocks: 8,            // Added missing stocks
        category: 'Oils',     // Added category
        brand: 'Premium'      // Added brand
    },
    {
        key: 4,
        name: 'Basmati Rice',
        sellingPrice: 12,
        costPrice: 8,         // Added missing costPrice
        unitType: 'BUNDLE',
        stocks: 20,           // Added missing stocks
        category: 'Grains',   // Added category
        brand: 'Royal'        // Added brand
    },
    {
        key: 5,
        name: 'Black Pepper Ground',
        sellingPrice: 6,
        costPrice: 4,         // Added missing costPrice
        unitType: 'JAR',
        stocks: 25,           // Added missing stocks
        category: 'Spices',   // Added category
        brand: 'Generic'      // Added brand
    },
    {
        key: 6,
        name: 'Pasta Spaghetti',
        sellingPrice: 4,
        costPrice: 2,         // Added missing costPrice
        unitType: 'BUNDLE',
        stocks: 30,           // Added missing stocks
        category: 'Pasta',    // Added category
        brand: 'Italia'       // Added brand
    },
    {
        key: 7,
        name: 'Tomato Sauce',
        sellingPrice: 3,
        costPrice: 1.5,       // Added missing costPrice
        unitType: 'JAR',
        stocks: 40,           // Added missing stocks
        category: 'Sauces',   // Added category
        brand: 'HomeMade'     // Added brand
    },
    {
        key: 8,
        name: 'Greek Yogurt',
        sellingPrice: 8,
        costPrice: 5,         // Added missing costPrice
        unitType: 'CASE',
        stocks: 12,           // Added missing stocks
        category: 'Dairy',    // Added category
        brand: 'Olympus'      // Added brand
    },
    {
        key: 9,
        name: 'Coconut Milk',
        sellingPrice: 4.5,
        costPrice: 2.5,
        unitType: 'CASE',
        stocks: 18,
        category: 'Dairy Alternatives',
        brand: 'Thai Choice'
    },
    {
        key: 10,
        name: 'Quinoa Red',
        sellingPrice: 9,
        costPrice: 6,
        unitType: 'BUNDLE',
        stocks: 15,
        category: 'Grains',
        brand: 'Organic Valley'
    },
    {
        key: 11,
        name: 'Honey Raw',
        sellingPrice: 12,
        costPrice: 8,
        unitType: 'JAR',
        stocks: 22,
        category: 'Sweeteners',
        brand: 'BeeNatural'
    },
    {
        key: 12,
        name: 'Cinnamon Ground',
        sellingPrice: 5.5,
        costPrice: 3.5,
        unitType: 'JAR',
        stocks: 28,
        category: 'Spices',
        brand: 'SpiceMaster'
    },
    {
        key: 13,
        name: 'Almond Flour',
        sellingPrice: 14,
        costPrice: 9,
        unitType: 'BUNDLE',
        stocks: 16,
        category: 'Baking',
        brand: 'NutFlour'
    },
    {
        key: 14,
        name: 'Soy Sauce',
        sellingPrice: 6,
        costPrice: 3.5,
        unitType: 'CASE',
        stocks: 35,
        category: 'Condiments',
        brand: 'Asian Delights'
    },
    {
        key: 15,
        name: 'Chia Seeds',
        sellingPrice: 8,
        costPrice: 5,
        unitType: 'JAR',
        stocks: 20,
        category: 'Superfoods',
        brand: 'HealthyLife'
    }
];


