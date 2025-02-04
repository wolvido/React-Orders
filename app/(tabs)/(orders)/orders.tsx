import commonStyles from '@/style/common';
import theme from '@/style/theme';
import * as React from 'react';
import { DataTable, Searchbar, Button, Portal, Modal, Appbar } from 'react-native-paper';
import { orders } from '@/dummy-data/dummy-orders';
import getStatusColor from '@/hooks/status-color-hook';
import getPaymentStatusColor from '@/hooks/payment-status-color-hook';
import { useState, useEffect } from 'react';
import PaymentStatus from '@/enums/payment-status';
import { View } from 'react-native';
import PaymentMethodSelector from '@/components/payment-form';
import StatusForm from '@/components/fulfillment-status';
import Status from '@/enums/status'
import PaymentMethod from '@/entities/payment-method';
import { useOrder } from '@/context/order-context';

//react component
export default function OrdersScreen() {

    const{ updatePaymentById } = useOrder();

    //handles the state of table pagination
    const [page, setPage] = useState<number>(0);

    //stores the initial selection for the number of items per page
    const [numberOfItemsPerPageList] = useState([5, 6, 7, 8, 9, 10]);
        //used for the dropdown menu to display the possible options

    //switches the page options
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );

    const [searchQuery, setSearchQuery] = useState('');

    const items = orders;
  
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

    // Handle payment button click
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedTotal, setSelectedTotal] = useState(0)
    const handlePaymentClick = (total: number, id: number) => {
        setSelectedTotal(total);
        setSelectedOrderId(id);
        setShowPaymentForm(true);
    };

    //payment status
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(0);
    const [initialStatus, setInitialStatus] = useState<Status>();
    const handleStatusClick = (orderId: number, status: Status) => {
        setSelectedOrderId(orderId);
        setShowStatusModal(true);
        setInitialStatus(status);
    };

    const handlePaymentSubmit = (paymentMethod: PaymentMethod) => {
        // Handle the payment method data here
        console.log('Payment Method:', paymentMethod);
        updatePaymentById(paymentMethod, selectedOrderId);
        // Update order or perform other actions
    };

    return (
        <View>    
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
                    <StatusForm orderId={selectedOrderId} defaultStatus={initialStatus || Status.Pending} />

                    <Button 
                        mode="contained" 
                        onPress={() => setShowStatusModal(false)}
                        style={{ marginTop: 10 }}
                    >
                        Back
                    </Button>
                </Modal>
            </Portal>

        {showPaymentForm && (
            <View>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => setShowPaymentForm(false)} />
                    <Appbar.Content title="Add Payment Method" />
                </Appbar.Header>
                <PaymentMethodSelector balance={selectedTotal} orderId={selectedOrderId} onPaymentSubmit={handlePaymentSubmit}/>
            </View>
        )}

        {!showPaymentForm && (
        <DataTable>
            <DataTable.Header style={commonStyles.extraHeader}>
                <Searchbar
                    placeholder="Search"
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
                <DataTable.Title style={{flexGrow: 1}}>Order ID</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Order Type</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Customer</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Transaction Date</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Payment Status</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Fulfillment Status</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Total</DataTable.Title>
                <DataTable.Title style={{flexGrow: 2}}>Action</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.id}>
                    <DataTable.Cell style={{flexGrow: 1}}>{item.id}</DataTable.Cell>
                    <DataTable.Cell style={{flexGrow: 3}}>{item.orderType.type}</DataTable.Cell>
                    <DataTable.Cell style={{flexGrow: 3}}>{item.customer.name}</DataTable.Cell>
                    <DataTable.Cell style={{flexGrow: 3}}>{item.transactionDate.toLocaleDateString()}</DataTable.Cell>
                    <DataTable.Cell
                        style={{flexGrow: 3}}
                        textStyle = {
                            {color: getPaymentStatusColor(item.orderStatus)}
                        }

                        >{item.orderStatus}</DataTable.Cell>

                    {/* <DataTable.Cell 
                        style={{flexGrow: 3}}
                        textStyle = {
                            {color: getStatusColor(item.fulfillmentStatus)}
                        }
                    >{item.fulfillmentStatus}</DataTable.Cell> */}

                    <DataTable.Cell
                        style={{flexGrow: 3}}
                    >
                        <Button 
                            mode="outlined" 
                            onPress={() => handleStatusClick(item.id, item.fulfillmentStatus)}
                            textColor = {getStatusColor(item.fulfillmentStatus)}
                            >
                            {item.fulfillmentStatus}
                        </Button>

                    </DataTable.Cell>

                    <DataTable.Cell style={{flexGrow: 3}}>{item.total}</DataTable.Cell>
                    <DataTable.Cell style={{flexGrow: 2}}>
                            <Button 
                                mode="contained" 
                                onPress={() => handlePaymentClick(item.total, item.id)}
                                disabled={item.orderStatus === PaymentStatus.paid}
                            >
                                Add Pay
                            </Button>
                        </DataTable.Cell>
                </DataTable.Row>
            ))}

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
            />

        </DataTable>
        )}

        </View>
    );
}