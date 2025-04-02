import theme from '@/src/shared/lib/theme/theme';
import * as React from 'react';
import { Button, Portal, Modal, Appbar, ActivityIndicator, Card } from 'react-native-paper';
import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PaymentMethodSelector from '@/src/features/order-feature/components/payment-forms/payment-form';
import StatusForm from '@/src/features/order-feature/components/fulfillment-status';
import Status from '@/src/shared/lib/theme/status'
import PaymentMethod, { BankTransferPayment, CashPayment, ChequePayment, PaymentGateway } from '@/src/entities/payment-method/type/payment-method';
import { useOrder } from '@/src/features/order-feature/context/order-context';
import { OrderRepository } from '@/src/infrastructure/repositories/order-repository';
import { Order } from '@/src/entities/order/type/order';
import { EmptyState } from '@/src/shared/ui/empty-state';
import { PaymentRepository } from '@/src/infrastructure/repositories/payment-repository';
import { router, useFocusEffect } from 'expo-router';
import { OrdersList } from '@/src/features/order-feature/components/orders-list';


//react component
export default function OrdersScreen() {

    const orderRepository = new OrderRepository();
    const paymentRepository = new PaymentRepository();

    const { getOrderbyId, setOrder } = useOrder();
    
    const [items, setItems] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<number>(0);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);

    useFocusEffect(
        useCallback(() => {
            console.log('Orders screen focused - fetching orders');
            //will be very slow in the future
            orderRepository.getAll().then((data) => {
                setItems(data);
                console.log('Orders refreshed:', data.length);
            });

            return () => {
                console.log('Orders screen unfocused');
            };
        }, [])
    );

    useEffect(() => {
        if (selectedOrderId) {
            getOrderbyId(selectedOrderId).then(order => {
                setSelectedOrder(order || null);
            });
        }
    }, [selectedOrderId]);

    const{ updatePaymentById, updateFulfillmentById } = useOrder();

    //payment status
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [initialStatus, setInitialStatus] = useState<Status>();
    const handleStatusClick = (orderId: number, status: Status) => {
        setSelectedOrderId(orderId);
        setShowStatusModal(true);
        setInitialStatus(status);
    };

    // Handle payment button click
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const handlePaymentClick = (id: number) => {
        setSelectedOrderId(id);
        setShowPaymentForm(true);
    };

    const handlePaymentSubmit = (paymentMethod: PaymentMethod) => {
        // Handle the payment method data
        if (paymentMethod.type === "Cash") {
            const cashPayment: CashPayment = paymentMethod;
            const result = paymentRepository.createCashPayment(cashPayment);
            console.log(
                'Cash Payment Result:', 
                result.then(value => console.log(value.paymentId))
            );
        }
        if (paymentMethod.type === "Cheque") {
            const chequePayment: ChequePayment = paymentMethod;
            const result = paymentRepository.createChequePayment(chequePayment);
            console.log(
                'Cheque Payment Result:', 
                result.then(value => console.log(value.paymentId))
            );
        }
        if (paymentMethod.type === "Bank Transfer") {
            const bankTransferPayment: BankTransferPayment = paymentMethod;
            const result = paymentRepository.createBankTransferPayment(bankTransferPayment);
            console.log(
                'Bank Transfer Payment Result:', 
                result.then(value => console.log(value.paymentId))
            );
        }
        if (paymentMethod.type === "Payment Gateway") {
            const paymentGatewayPayment: PaymentGateway = paymentMethod;
            const result = paymentRepository.createPaymentGateway(paymentGatewayPayment);
            console.log(
                'Payment Gateway Payment Result:', 
                result.then(value => console.log(value.paymentId))
            );
        }

        //updatePaymentById(paymentMethod, selectedOrderId);
        //hide the payment form
        setShowPaymentForm(false);
    };

    const handleStatusChange = (status: Status) => {
        // Do something with the new status
        updateFulfillmentById(status, selectedOrderId);
    };

    //handle update order
    const [updateOrder, setUpdateOrder] = useState<Order | null>(null);

    const handleUpdateOrder = async (id: number) => {
        setIsLoading(true);

        const order = await getOrderbyId(id);
        if (order) {
            setUpdateOrder(order);
        }

        setIsLoading(false);
    };
    
    //navigate to update order screen
    useEffect(() => {
        if (updateOrder) {
            setOrder(updateOrder);
            router.push('/update-order');
        }
    }, [updateOrder]);

    // Check if there are no items and show loading state
    if (items.length === 0) {
        //if portrait
        if (window.innerWidth < window.innerHeight) {
            return (
                <EmptyState
                    title="Awaiting Data..."
                    subtitle="Orders will be available shortly"
                    loading={true}
                />
            );
        }

        return (
            <EmptyState 
                title="Awaiting Data..."
                subtitle="Orders will be available shortly"
                loading={true}
            />
        );

    }

    //sort the items newest to oldest
    items.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

    return (
        <View style={{ flex: 1 }}>
            <Portal>
                <Modal
                    visible={isLoading}
                    dismissable={false}
                    contentContainerStyle={{
                        backgroundColor: 'transparent',
                        padding: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'  // This creates the dark overlay
                    }}
                >
                    <Card style={{ padding: 20, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={{ marginTop: 10 }}>Loading...</Text>
                    </Card>
                </Modal>
            </Portal>

            <Portal>
                <Modal
                    visible={showStatusModal}
                    onDismiss={() => setShowStatusModal(false)}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        padding: 20,
                        margin: 20,
                        borderRadius: 8
                    }}
                >
                    <StatusForm onStatusChange={handleStatusChange} defaultStatus={initialStatus || Status.Pending} />

                    <Button 
                        mode="contained" 
                        onPress={() => setShowStatusModal(false)}
                        style={{ marginTop: 10 }}
                    >
                        Back
                    </Button>
                </Modal>
            </Portal>

        {showPaymentForm && selectedOrder && (
            <View>
                <ScrollView 
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ 
                        paddingBottom: 100 // Add extra padding at bottom
                    }}
                    showsVerticalScrollIndicator={true}
                    keyboardDismissMode="interactive"
                    automaticallyAdjustKeyboardInsets={true}
                >
                    <Appbar.Header>
                        <Appbar.BackAction onPress={() => setShowPaymentForm(false)} />
                        <Appbar.Content title="Add Payment Method" />
                    </Appbar.Header>

                    <PaymentMethodSelector getOrderById={() => selectedOrder} orderId={selectedOrderId} onPaymentSubmit={handlePaymentSubmit}/>

                </ScrollView>
            </View>
        )}

        {!showPaymentForm && (
            <OrdersList 
                items={items}
                onPaymentClick={handlePaymentClick}
                onUpdateOrder={handleUpdateOrder}
            />
        )}

        </View>
    );
}