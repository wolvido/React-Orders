// import StepIndicator from "@/components/order-step-indicator";
// import receivePOSteps from "./receive-PO-steps";
// import { ScrollView, View } from "react-native";
// import deliverySteps from "../(add-delivery)/delivery-steps-label";
// import PurchaseOrderForm from "@/components/purchase-order-form";
// import { purchaseOrders } from "@/dummy-data/dummy-purchase-orders";
// import { PurchaseOrder } from "@/entities/purchase-order";
// import { router } from "expo-router";
// import { usePurchaseOrder } from "@/context/purchase-order-context";

// export default function ReceiveOrderScreen() {
//     const {purchaseOrder,  initializePurchaseOrder} = usePurchaseOrder();

//     const handleSubmitPO = (purchaseOrder: PurchaseOrder) => {
//         // Handle the form submission here
//         initializePurchaseOrder(purchaseOrder);
//         router.push("./purchase-order-items");
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <StepIndicator currentStep={1} backPath="./purchase-orders" steps={receivePOSteps}/>
//             <ScrollView
//                 keyboardShouldPersistTaps="handled"
//                 contentContainerStyle={{
//                     paddingBottom: 100
//                 }}
//                 showsVerticalScrollIndicator={true}
//                 keyboardDismissMode="interactive"
//                 automaticallyAdjustKeyboardInsets={true}
//             >
//                 <PurchaseOrderForm purchaseOrder={purchaseOrder} onSubmit={handleSubmitPO}/>
//             </ScrollView>
//         </View>
//     );

// }