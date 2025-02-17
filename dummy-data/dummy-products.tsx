import { Product } from '../entities/product';

export const products: Product[] = [
    {
        id: 1,
        name: 'Heinz Ketchup',
        price: 10,
        unitType: 'CASE',
        stocks: 10,
        category: 'Condiments',
        brand: 'Heinz',
        isBundle: false
    },
    {
        id: 2,
        name: 'Parsley Dried',
        price: 5,
        unitType: 'JAR',
        stocks: 15,
        category: 'Spices',
        brand: 'Generic',
        isBundle: false
    },
    {
        id: 3,
        name: 'Olive Oil Extra Virgin',
        price: 15,
        unitType: 'CASE',
        stocks: 8,
        category: 'Oils',
        brand: 'Premium',
        isBundle: false
    },
    {
        id: 4,
        name: 'Basmati Rice',
        price: 12,
        unitType: 'BUNDLE',
        stocks: 20,
        category: 'Grains',
        brand: 'Royal',
        isBundle: false
    },
    {
        id: 5,
        name: 'Black Pepper Ground',
        price: 6,
        unitType: 'JAR',
        stocks: 25,
        category: 'Spices',
        brand: 'Generic',
        isBundle: false
    },
    {
        id: 6,
        name: 'Pasta Spaghetti',
        price: 4,
        unitType: 'BUNDLE',
        stocks: 30,
        category: 'Pasta',
        brand: 'Italia',
        isBundle: false
    },
    {
        id: 7,
        name: 'Tomato Sauce',
        price: 3,
        unitType: 'JAR',
        stocks: 40,
        category: 'Sauces',
        brand: 'HomeMade',
        isBundle: false
    },
    {
        id: 8,
        name: 'Greek Yogurt',
        price: 8,
        unitType: 'CASE',
        stocks: 12,
        category: 'Dairy',
        brand: 'Olympus',
        isBundle: false
    },
    {
        id: 9,
        name: 'Coconut Milk',
        price: 4.5,
        unitType: 'CASE',
        stocks: 18,
        category: 'Dairy Alternatives',
        brand: 'Thai Choice',
        isBundle: false
    },
    {
        id: 10,
        name: 'Quinoa Red',
        price: 9,
        unitType: 'BUNDLE',
        stocks: 15,
        category: 'Grains',
        brand: 'Organic Valley',
        isBundle: false
    },
    {
        id: 11,
        name: 'Honey Raw',
        price: 12,
        unitType: 'JAR',
        stocks: 22,
        category: 'Sweeteners',
        brand: 'BeeNatural',
        isBundle: false
    },
    {
        id: 12,
        name: 'Cinnamon Ground',
        price: 5.5,
        unitType: 'JAR',
        stocks: 28,
        category: 'Spices',
        brand: 'SpiceMaster',
        isBundle: false
    },
    {
        id: 13,
        name: 'Almond Flour',
        price: 14,
        unitType: 'BUNDLE',
        stocks: 16,
        category: 'Baking',
        brand: 'NutFlour',
        isBundle: false
    },
    {
        id: 14,
        name: 'Soy Sauce',
        price: 6,
        unitType: 'CASE',
        stocks: 35,
        category: 'Condiments',
        brand: 'Asian Delights',
        isBundle: false
    },
    {
        id: 15,
        name: 'Chia Seeds',
        price: 8,
        unitType: 'JAR',
        stocks: 20,
        category: 'Superfoods',
        brand: 'HealthyLife',
        isBundle: false
    }
];
