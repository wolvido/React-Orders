import { PurchaseOrder } from "@/src/entities/purchase-order/type/purchase-order";
import { Supplier } from "@/src/entities/supplier/type/supplier";
import { SuppliersSelection } from "@/src/entities/supplier/ui/suppliers-selection";
import { DatePicker } from "@/src/shared/ui/date-picker";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface PurchaseOrderFormProps {
    onSubmit: (purchaseOrder: PurchaseOrder) => void;
    initialValues?: PurchaseOrder;
    suppliers: Supplier[];
}

export const PurchaseOrderForm = ({
    onSubmit,
    initialValues,
    suppliers,
}: PurchaseOrderFormProps) => {

    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [deliveryId, setDeliveryId] = useState<number | undefined>(undefined);
    const [supplierId, setSupplierId] = useState<number | undefined>(undefined);
    const [preparedBy, setPreparedBy] = useState<string>("");
    const [transactionDate, setTransactionDate] = useState<Date>(new Date());
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<Date>(new Date());
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [remarks, setRemarks] = useState<string>("");
    const [noOfItems, setNoOfItems] = useState<number>(0);
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [poDiscount, setPoDiscount] = useState<number>(0);
    const [otherFee, setOtherFee] = useState<number>(0);
    const [createDate, setCreateDate] = useState<Date>(new Date());
    const [potentialCost, setPotentialCost] = useState<number>(0);

    // Populate form when initialValues is provided
    useEffect(() => {
        if (initialValues) {
            setSupplierId(initialValues.supplierId || undefined);
            setDeliveryId(initialValues.deliveryId || undefined);
            setCreateDate(initialValues.createDate || new Date());
            setPreparedBy(initialValues.preparedBy || "");
            setSupplier(initialValues.supplier || null);
            setTransactionDate(initialValues.transactionDate || new Date());
            setExpectedDeliveryDate(initialValues.expectedDeliveryDate || new Date());
            setIsComplete(initialValues.isComplete || false);
            setNoOfItems(initialValues.noOfItems || 0);
            setDeliveryFee(initialValues.deliveryFee || 0);
            setPoDiscount(initialValues.poDiscount || 0);
            setOtherFee(initialValues.otherFee || 0);
            setPotentialCost(initialValues.potentialCost || 0);
            setRemarks(initialValues.remarks || "");
        }
    }, [initialValues]);

    const handleSubmit = () => {
        if (!supplier) return;

        const newPurchaseOrder: PurchaseOrder = {
            id: initialValues?.id || 0,
            deliveryId: deliveryId,
            supplierId: supplierId,
            createDate: createDate,
            preparedBy: preparedBy,
            supplier: supplier,
            transactionDate: transactionDate,
            expectedDeliveryDate: expectedDeliveryDate,
            isComplete: isComplete,
            isDeleted: false,
            noOfItems: noOfItems,
            deliveryFee: deliveryFee,
            poDiscount: poDiscount,
            otherFee: otherFee,
            potentialCost: potentialCost,
            remarks: remarks,
        };

        onSubmit(newPurchaseOrder);
    };

    return (
        <View>
            <SuppliersSelection
                suppliers={suppliers}
                onSupplierSelect={setSupplier}
                existingSupplier={supplier}
            />

            <DatePicker
                label="PO Date"
                value={transactionDate}
                onChange={(d) => d && setTransactionDate(d)}
            />

            <DatePicker
                label="ETA"
                value={expectedDeliveryDate}
                onChange={(d) => d && setExpectedDeliveryDate(d)}
            />

            <TextInput
                label="Remarks"
                value={remarks}
                onChangeText={setRemarks}
                mode="outlined"
                style={styles.input}
            />

            {/* Daghan pa kulang na TextInput */}

            <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
            >
                Submit PO Form
            </Button>

        </View>
    );

}

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    modalTitle: {
        marginBottom: 16,
        textAlign: 'center',
    },
    modalCloseButton: {
        marginTop: 16,
    },
    supplierInputContainer: {
        marginBottom: 16,
        position: 'relative',
        height: 56, // Match TextInput height
    },
    supplierLabel: {
        position: 'absolute',
        left: 16,
        top: 16,
        fontSize: 16,
        color: '#666666',
        backgroundColor: 'transparent',
        zIndex: 1,
        transform: [{translateY: 0}],
    },
    supplierLabelSelected: {
        top: -8,
        left: 12,
        fontSize: 12,
        color: '#000000',
        backgroundColor: 'white',
        paddingHorizontal: 4,
    },
    supplierButton: {
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    supplierButtonContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        height: '100%',
    },
    supplierButtonText: {
        textAlign: 'left',
        flex: 1,
        color: '#000000',
        fontSize: 16,
    },
    supplierButtonPlaceholder: {
        color: '#666666',
    },
    container: {

    },
    form: {
        padding: 16
    },
    input: {
        marginBottom: 16,
    },
    submitButton: {
        marginTop: 16,
    }
});