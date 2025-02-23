import commonStyles from '@/style/common';
import theme from '@/style/theme';
import * as React from 'react';
import { DataTable, Searchbar, Button, Portal, Modal, Appbar } from 'react-native-paper';
import getStatusColor from '@/hooks/status-color-hook';
import getPaymentStatusColor from '@/hooks/payment-status-color-hook';
import { useState, useEffect, useCallback } from 'react';
import PaymentStatus from '@/enums/payment-status';
import { View, Text, ScrollView } from 'react-native';
import PaymentMethodSelector from '@/components/payment-form';
import StatusForm from '@/components/fulfillment-status';
import Status from '@/enums/status'
import PaymentMethod, { BankTransferPayment, CashPayment, ChequePayment, PaymentGateway } from '@/entities/payment-method';
import { useOrder } from '@/context/order-context';
import { OrderRepository } from '@/repositories/order-repository';
import { Order } from '@/entities/order';
import { useSearch } from '@/hooks/search-filter';
import { EmptyState } from '@/components/empty-state';
import { PaymentRepository } from '@/repositories/payment-repository';
import { router, useFocusEffect } from 'expo-router';
import app from '@/app.json';


//react component
export default function OrdersScreen() {

    console.log("current api:"+ app.api.main);

    const orderRepository = new OrderRepository();

    const paymentRepository = new PaymentRepository();

    const { getOrderbyId, setOrder } = useOrder();
    
    const [items, setItems] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<number>(0);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useFocusEffect(
        useCallback(() => {
            console.log('Orders screen focused - fetching orders');
            orderRepository.getAll().then((data) => {
                setItems(data);
                console.log('Orders refreshed:', data.length);
            });

            //will be very slow in the future

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

    const searchableFields: (keyof Order)[] = [
        'orderType',
        'customer',
    ];
    const { searchQuery, setSearchQuery, filteredItems } = useSearch<Order>(
        items,
        searchableFields
    );

    const{ updatePaymentById, updateFulfillmentById } = useOrder();

    //handles the state of table pagination
    const [page, setPage] = useState<number>(0);

    //stores the initial selection for the number of items per page
    const [numberOfItemsPerPageList] = useState([10, 20, 40, 60]);
        //used for the dropdown menu to display the possible options

    //switches the page options
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );

    //calculates the range of items per page in display
    //whenever the page changes, it calculates from what index of the array the currect state is
    const from = page * itemsPerPage; 
    //calculates the end of the range
    const to = Math.min((page + 1) * itemsPerPage, items.length);
  
    //resets the page to the start item range changes, 
    // so that it doesnt break when page doesnt exist
    useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
        //sometimes a page wont exist when you expand the number of items per page

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
            paymentRepository.createCashPayment(cashPayment);
            console.log('Cash Payment Result:', cashPayment);
        }
        if (paymentMethod.type === "Cheque") {
            const chequePayment: ChequePayment = paymentMethod;
            paymentRepository.createChequePayment(chequePayment);
            console.log('Cheque Payment Result:', chequePayment);
        }
        if (paymentMethod.type === "Bank Transfer") {
            const bankTransferPayment: BankTransferPayment = paymentMethod;
            const result = paymentRepository.createBankTransferPayment(bankTransferPayment);
            console.log('Bank Transfer Payment Result:', result);
        }
        if (paymentMethod.type === "Payment Gateway") {
            const paymentGatewayPayment: PaymentGateway = paymentMethod;
            paymentRepository.createPaymentGateway(paymentGatewayPayment);
            console.log('Payment Gateway Payment Result:', paymentGatewayPayment);
        }

        updatePaymentById(paymentMethod, selectedOrderId);
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
        const order = await getOrderbyId(id);
        if (order) {
            setUpdateOrder(order);
        }
    };

    // Add this useEffect
    useEffect(() => {
        if (updateOrder) {
            setOrder(updateOrder);
            router.push('/update-order');
        }
    }, [updateOrder]);

    if (items.length === 0) {
        //if portrait
        if (window.innerWidth < window.innerHeight) {
            return (
                <View style = {{ marginTop: 20 }}>
                    <EmptyState
                        title="Awaiting Data..."
                        subtitle="No orders available at the moment"
                        loading={true}
                    />
                </View>
            );
        }

        return (
            <View>
                <EmptyState
                    title="Awaiting Data..."
                    subtitle="No orders available at the moment"
                    loading={true}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
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
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <DataTable.Header style={commonStyles.extraHeader}>
                <Searchbar
                    placeholder="Search..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    mode='view'
                    style = {commonStyles.searchBar}
                    inputStyle = {commonStyles.searchBar}
                    theme={{
                        colors: {
                            elevation: {
                                level3: theme.colors.accent,  // This changes the inner background
                            },
                        },
                    }}
                />
            </DataTable.Header>

            <DataTable.Header>
                <DataTable.Title style={{flexGrow: 3}}>Order Type</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Customer</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Transaction Date</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Payment Status</DataTable.Title>
                {/* <DataTable.Title style={{flexGrow: 3}}>Fulfillment Status</DataTable.Title> */}
                <DataTable.Title style={{flexGrow: 3}}>Total</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Actions</DataTable.Title>
            </DataTable.Header>

            <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ScrollView style={{ flex: 1 }}>
                    <DataTable>
                        {filteredItems.slice(from, to).map((item) => (
                            <DataTable.Row key={item.id}>
                                <DataTable.Cell style={{flexGrow: 3}}>{item.orderType}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 3}}>{item.customer.name}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 3}}>{item.transactionDate.toLocaleDateString()}</DataTable.Cell>
                                <DataTable.Cell
                                    style={{flexGrow: 3}}
                                    textStyle = {
                                        {color: getPaymentStatusColor(item.orderStatus)}
                                    }>
                                    {item.orderStatus.toString()}
                                </DataTable.Cell>

                                {/* <DataTable.Cell
                                    style={{flexGrow: 3}}
                                >
                                    <Button 
                                        mode="outlined" 
                                        onPress={() => handleStatusClick(item.id, item.fulfillmentStatus)}
                                        textColor = {getStatusColor(item.fulfillmentStatus)}
                                        >
                                        {item.fulfillmentStatus}
                                    </Button>

                                </DataTable.Cell> */}

                                <DataTable.Cell style={{flexGrow: 3}}>{`₱`+item.total}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 3}}>
                                    <Button 
                                        mode="contained" 
                                        onPress={() => handlePaymentClick(item.id)}
                                        disabled={item.orderStatus === PaymentStatus.paid}
                                    >
                                        Add Pay
                                    </Button>
                                </DataTable.Cell>
                                {/* <DataTable.Cell>
                                    <Button 
                                        mode="contained" 
                                        onPress={() => handleUpdateOrder(item.id)}
                                    >
                                        Update
                                    </Button>
                                </DataTable.Cell> */}
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </ScrollView>
                {/* the table controller */}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                    dropdownItemRippleColor={'white'}
                    theme={{
                        colors: {
                            elevation: {
                                level2: theme.colors.accent,
                            },
                            primary: 'black',
                        },
                    }}
                    style={{
                        backgroundColor: 'white',
                        borderTopWidth: 1,
                        borderTopColor: '#e0e0e0'
                    }}
                />

            </View>
        </View>
        )}

        </View>
    );
}