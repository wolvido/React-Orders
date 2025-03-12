import { View } from "react-native";
import useOrientation from "@/shared/hooks/orientation-hook";
import { Cart } from "../../types/cart";
import { Product } from "@/shared/entities/product";
import { CartItem } from "../../types/cart-item";
import { SummaryPanel } from "../../../../shared/components/summary-panel";
import styles from "./cart-styles";
import { CartPanel } from "./cart-panel";
import { ProductList } from "./product-list";
import { ProductSchema } from "@/features/order-feature/types/product-schema";

interface CartComponentProps {
    products: Product[];
    cart: Cart;
    onAddToCart: (cartItem: CartItem) => void;
    onBundleProductToCart: (product: Product, quantity: number) => {success: boolean, error?: string};
    onRemoveFromCart: (product: Product) => void;
    onProceed: () => void;
    onUpdateProducts: () => Promise<void>;
    onError?: (message: string) => void;
    isLoading?: boolean;
    productSchemas?: ProductSchema[];
    onSchemaSelect?: (schema: ProductSchema) => void;
}

export function CartComponent({
    products,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onBundleProductToCart,
    onProceed,
    onError,
    onUpdateProducts,
    isLoading,
    productSchemas,
    onSchemaSelect
}: CartComponentProps) {

    const isPortrait = useOrientation() === 'PORTRAIT';

    // if (isLoading) {
    //     return <Text style={styles.loadingText}>Loading...</Text>;
    // }

    return (
        <View style={[styles.content, styles.contentPortrait]}>
            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>
                <ProductList
                    products={products}
                    onAddToCart={onBundleProductToCart}
                    onError={onError}
                    isPortrait={isPortrait}
                    onUpdateProducts={onUpdateProducts}
                    isLoading={isLoading}
                    productSchemas={productSchemas}
                    onSchemaSelect={onSchemaSelect}
                />
                <CartPanel
                    items={cart.items}
                    isPortrait = {isPortrait}
                    onRemoveFromCart={(cartItem) => onRemoveFromCart(cartItem.product)}
                    collapsible = {true}
                />
            </View>
            <SummaryPanel
                total={cart.total}
                quantity={cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                onProceed={onProceed}
            />
        </View>
    );
}
