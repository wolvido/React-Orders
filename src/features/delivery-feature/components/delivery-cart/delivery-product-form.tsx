import { Product } from "@/src/entities/product/type/product";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import { DiscountMenuForm } from "@/src/shared/ui/discount-menu-form";
import { memo, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, TextInput, Text, Menu} from "react-native-paper";

interface DeliveryProductFormProps {
    product: Product;
    onAdd: (receivedItem: ReceivedItem) => void;
    onError?: (message: string) => void;
    isPortrait?: boolean;
    onSubTotalChange?: (subtotal: number) => void;
}

const DeliveryProductForm = memo(({
    product, 
    onAdd,
    onError,
    isPortrait,
    onSubTotalChange,
}: DeliveryProductFormProps) => {
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState<string>(product.costPrice.toString());
    const [error, setError] = useState(false);
    const [flatDiscount, setFlatDiscount] = useState(0);
    const [percentageDiscount, setPercentageDiscount] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const [subtotal, setSubtotal] = useState(0);

    const handlePriceChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setPrice(numericValue);
        setError(false);
    };

    const handleQuantityChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setQuantity(numericValue);
        setError(false);
    };

    const onApplyDiscount = (percentageDiscount?: number, flatDiscount?: number) => {

        if(!flatDiscount){
            setFlatDiscount(0);
            flatDiscount = 0;
        }
        if(!percentageDiscount){
            setPercentageDiscount(0);
            percentageDiscount = 0;
        }

        setFlatDiscount(flatDiscount);
        setPercentageDiscount(percentageDiscount);
        setMenuVisible(false);
    };

    useEffect(() => {

        const numericQuantity = parseInt(quantity);
        const numericPrice = parseFloat(price);
        const numericFlatDiscount = flatDiscount;
        const numericPercentageDiscount = percentageDiscount;
        const customPrice = numericPrice ? numericPrice : product.costPrice;
        const discountAmount = numericFlatDiscount + (customPrice * (numericPercentageDiscount / 100));
        const discountedPrice = customPrice - discountAmount;
        const calculatedSubtotal = (discountedPrice * numericQuantity) || 0;

        setSubtotal(calculatedSubtotal);
        onSubTotalChange?.(calculatedSubtotal);
        setError(false);
    },[flatDiscount, percentageDiscount, price, quantity]);

    const handleAddItem = (product: Product) => {

        const numericQuantity = parseInt(quantity);
        const numericPrice = parseFloat(price);
        
        // Check if product exists or quantity is valid
        if (!product || !quantity) return;
        
        if (numericQuantity < 1) {
            return;
        }

        const customPrice = numericPrice ? numericPrice : product.costPrice;
        console.log('subtotal', subtotal);
    
        const receivedItem: ReceivedItem = {
            id: 0,
            product: product,
            quantity: numericQuantity,
            manualPrice: customPrice,
            total: subtotal,
            discountPercentage: percentageDiscount,
            discountFlat: flatDiscount,
        };

        onAdd(receivedItem);

        setQuantity('');
        setError(false);
    };

    return (
        <View style={[styles.actionSection, isPortrait && styles.actionSectionPortrait, !isPortrait && styles.actionSectionLandscape]}>
            {!isPortrait ? (
                <IconButton
                    icon="chevron-right"
                    mode="contained"
                    size={20}
                    onPress={() => handleAddItem(product)}
                />
            ) : (            
                    <DiscountMenuForm
                        onApplyDiscount={onApplyDiscount}
                        visible={menuVisible}
                        onError={onError}
                    />

                )
            }
            <View style={styles.inputGroup}>
            
                <TextInput
                    mode="outlined"
                    label="Price"
                    value={price}
                    onChangeText={handlePriceChange}
                    keyboardType="numeric"
                    style={[styles.priceInput, isPortrait && styles.priceInputPortrait]}
                    maxLength={10}
                    error={error}
                    focusable={true}
                    autoComplete="off"
                    importantForAutofill="no"
                    textContentType="none"
                />

                <TextInput
                    mode="outlined"
                    label="Qty"
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    keyboardType="numeric"
                    style={[styles.quantityInput, isPortrait && styles.quantityInputPortrait]}
                    maxLength={5}
                    error={error}
                    focusable={true}
                    autoComplete="off"
                    importantForAutofill="no"
                    textContentType="none"
                />
            </View>
            
            {isPortrait ? (
                <IconButton
                    icon="chevron-right"
                    mode="contained"
                    size={20}
                    onPress={() => handleAddItem(product)}
                />
            ) : (
                <DiscountMenuForm
                    onApplyDiscount={onApplyDiscount}
                    visible={menuVisible}
                    onError={onError}
                />
            )}
        </View>
    );
});

export default DeliveryProductForm;

const styles = StyleSheet.create({
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    formGroup:{
        flexDirection: 'column',
    },
    
    discountButton: {
        margin: 0,
        marginLeft: -8,
        borderRadius: 4,
        height: 30,
        width: 30
    },

    discountButtonLandscape: {
        margin: 0,
        marginLeft: 0,
        borderRadius: 4,
        height: 30,
        width: 30
    },
    
    menuContent: {
        padding: 8,
        marginTop: 4,
    },
    
    discountInputs: {
        flexDirection: 'row',
        gap: 8,
        padding: 4,
        minWidth: 160,
    },
    
    discountInput: {
        flex: 1,
        height: 40,
        fontSize: 12,
    },
    
    priceInput: {
        width: 70,
    },
    
    priceInputPortrait: {
        width: 50,
        height: 35,
        fontSize: 12,
    },
    
    quantityInput: {
        width: 70,
    },
    
    quantityInputPortrait: {
        width: 50,
        height: 35,
        fontSize: 12,
    },
    actionSectionLandscape: {
        flex: 3
    },
    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    rightPanel: {
        flex: 1,
        backgroundColor: 'white',
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        position: 'relative',
    },
    cartContent: {
        flex: 1,
        padding: 10,
        paddingTop: 15, // Give space for the collapse button
    },
    cartList: {
        flex: 1, // This ensures the list is scrollable
    },
    cartListContent: {
        padding: 4,
    },
    cartItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        width: '100%',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cartItemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },
    cartItemPrice: {
        fontSize: 14,
        color: '#666',
    },
    cartItemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    removeButton: {
        margin: 0,
    },
    cartItemDetails: {
        fontSize: 12,
        color: '#666',
    },
    collapseButtonContainer: {
        position: 'absolute',
        top: -30,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    collapseButton: {
        position: 'absolute',
        top: -20, // Move it slightly above the panel
        left: -20, // Pull it slightly to the left
        zIndex: 1,
        backgroundColor: 'white', // Add background to make it stand out
        // Add shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flex: 1,
        flexDirection: 'row', // side by side in landscape
    },
    contentPortrait: {
        flexDirection: 'column', // stacked in portrait
    },
    leftPanel: {
        flex: 1,
        padding: 10,
    },
    rightPanelPortrait: {
        flex: 1, // cart height in portrait
    },
    rightPanelCollapsed: {
        flex: 0.1, // When collapsed, take minimal space
    },

    productsList: {
        height: 10,
    },
    rightPanelPortraitFocused: {
        height: '20%', // Adjust this value as needed
    },
    cartRow: {
        justifyContent: 'flex-start',
        gap: 8,
    },
    cartItemText: {
        fontSize: 12,
        flex: 1,
    },
    summaryContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    emptyText: {
        textAlign: 'center',
        padding: 16,
        color: '#666',
    },
    cartItemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        padding: 4,
    },
    cardContent: {
        paddingVertical: 4, // minimal padding
        paddingHorizontal: 8,
    },
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    productCard: {
        marginBottom: 8,
    },
    productCardPortrait: {
        marginBottom: 4,
        paddingVertical: 0, // reduced padding
    },
    productInfo: {
        flex: 2,
        justifyContent: 'center',
    },
    productName: {
        marginBottom: 2,
    },
    priceText: {
        color: '#666',
    },
    stockInfo: {
        flex: 1,
        alignItems: 'center',
    },
    actionSectionPortrait: {
        gap: 4,
        justifyContent: 'flex-end',
    },
    compactText: {
        fontSize: 13,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 4,
    },
    pill: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    addItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    quantityContainer: {
        flex: 1,
        marginRight: 10,
    },
    total: {
        textAlign: 'right',
        fontSize: 20
    },
    errorText: {
        color: '#B00020', 
        fontSize: 12,
        marginTop: 4,
    },
    proceedButton: {
        paddingVertical: 6,
    },
    searchBar: {
        marginTop: 10,
        elevation: 0, // Removes shadow on Android
        borderRadius: 8,
    },
    leftPanelPortrait: {
        flex: 2,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cartItemTitlePortrait: {
        fontSize: 14,
    },
    cartItemDescPortrait: {
        fontSize: 12,
    },
    proceedButtonPortrait: {
        marginTop: 8,
    },
    loadingText: {
        textAlign: 'center',
        padding: 16,
        height: '85%',
    }
    
});