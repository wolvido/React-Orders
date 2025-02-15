// add-items.tsx
import { View, StyleSheet } from "react-native";
import StepIndicator from "@/components/order-step-indicator";
import { router } from "expo-router";
import { useCart } from "@/context/cart-context";
import { CartComponent } from "@/components/cart";
import { Pagination } from "@/components/pagination";
import orderSteps from "./order-steps-label";
import { useOrder } from "@/context/order-context";
import { useEffect, useState } from "react";
import { ProductRepository } from "@/repositories/product-repository";
import { Product } from "@/entities/product";

const ITEMS_PER_PAGE = 20;

export default function AddItemsScreen() {
    const productRepository = new ProductRepository();
    const { cart, addToCart, removeFromCart, emptyCart } = useCart();
    const { updateCart } = useOrder();
    const [items, setItems] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleProceed = () => {
        updateCart(cart);
        emptyCart();
        router.push('/finalize-order');
    };

    const loadItems = async (page: number) => {
        try {
            setIsLoading(true);
            const products = await productRepository.getProductPerPage(page, ITEMS_PER_PAGE);
            setItems(products);
            
            // Get total count from your API
            const totalCount = await productRepository.getAll(); // Implement this method
            setTotalPages(Math.ceil(totalCount.length / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        loadItems(newPage);
    };

    useEffect(() => {
        loadItems(currentPage);
    }, []);

    return (
        <View style={styles.container}>
            <StepIndicator currentStep={2} backPath="./add-order" steps={orderSteps} />
            
            <CartComponent
                products={items}
                cart={cart}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onProceed={handleProceed}
                isLoading={isLoading}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
