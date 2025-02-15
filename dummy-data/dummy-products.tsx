import { Product } from '../entities/product';

export const products: Product[] = [
    {
        id: 1,
        name: 'Heinz Ketchup',
        price: 10,
        costPrice: 5,
        unitType: 'CASE',
        stocks: 10,
        category: 'Condiments',
        brand: 'Heinz'
    },
    {
        id: 2,
        name: 'Parsley Dried', // Fixed typo in Parsley
        price: 5,
        costPrice: 3,         // Added missing costPrice
        unitType: 'JAR',
        stocks: 15,           // Added missing stocks
        category: 'Spices',   // Added category
        brand: 'Generic'      // Added brand
    },
    {
        id: 3,
        name: 'Olive Oil Extra Virgin',
        price: 15,
        costPrice: 10,        // Added missing costPrice
        unitType: 'CASE',
        stocks: 8,            // Added missing stocks
        category: 'Oils',     // Added category
        brand: 'Premium'      // Added brand
    },
    {
        id: 4,
        name: 'Basmati Rice',
        price: 12,
        costPrice: 8,         // Added missing costPrice
        unitType: 'BUNDLE',
        stocks: 20,           // Added missing stocks
        category: 'Grains',   // Added category
        brand: 'Royal'        // Added brand
    },
    {
        id: 5,
        name: 'Black Pepper Ground',
        price: 6,
        costPrice: 4,         // Added missing costPrice
        unitType: 'JAR',
        stocks: 25,           // Added missing stocks
        category: 'Spices',   // Added category
        brand: 'Generic'      // Added brand
    },
    {
        id: 6,
        name: 'Pasta Spaghetti',
        price: 4,
        costPrice: 2,         // Added missing costPrice
        unitType: 'BUNDLE',
        stocks: 30,           // Added missing stocks
        category: 'Pasta',    // Added category
        brand: 'Italia'       // Added brand
    },
    {
        id: 7,
        name: 'Tomato Sauce',
        price: 3,
        costPrice: 1.5,       // Added missing costPrice
        unitType: 'JAR',
        stocks: 40,           // Added missing stocks
        category: 'Sauces',   // Added category
        brand: 'HomeMade'     // Added brand
    },
    {
        id: 8,
        name: 'Greek Yogurt',
        price: 8,
        costPrice: 5,         // Added missing costPrice
        unitType: 'CASE',
        stocks: 12,           // Added missing stocks
        category: 'Dairy',    // Added category
        brand: 'Olympus'      // Added brand
    },
    {
        id: 9,
        name: 'Coconut Milk',
        price: 4.5,
        costPrice: 2.5,
        unitType: 'CASE',
        stocks: 18,
        category: 'Dairy Alternatives',
        brand: 'Thai Choice'
    },
    {
        id: 10,
        name: 'Quinoa Red',
        price: 9,
        costPrice: 6,
        unitType: 'BUNDLE',
        stocks: 15,
        category: 'Grains',
        brand: 'Organic Valley'
    },
    {
        id: 11,
        name: 'Honey Raw',
        price: 12,
        costPrice: 8,
        unitType: 'JAR',
        stocks: 22,
        category: 'Sweeteners',
        brand: 'BeeNatural'
    },
    {
        id: 12,
        name: 'Cinnamon Ground',
        price: 5.5,
        costPrice: 3.5,
        unitType: 'JAR',
        stocks: 28,
        category: 'Spices',
        brand: 'SpiceMaster'
    },
    {
        id: 13,
        name: 'Almond Flour',
        price: 14,
        costPrice: 9,
        unitType: 'BUNDLE',
        stocks: 16,
        category: 'Baking',
        brand: 'NutFlour'
    },
    {
        id: 14,
        name: 'Soy Sauce',
        price: 6,
        costPrice: 3.5,
        unitType: 'CASE',
        stocks: 35,
        category: 'Condiments',
        brand: 'Asian Delights'
    },
    {
        id: 15,
        name: 'Chia Seeds',
        price: 8,
        costPrice: 5,
        unitType: 'JAR',
        stocks: 20,
        category: 'Superfoods',
        brand: 'HealthyLife'
    }
];


