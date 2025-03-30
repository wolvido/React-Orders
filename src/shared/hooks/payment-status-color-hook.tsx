import PaymentStatus from '@/src/shared/enums/payment-status';

const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.paid:
        return '#2ecc71';  // Green
      case PaymentStatus.unPaid:
        return '#e74c3c';  // Red
      case PaymentStatus.partialPaid:
        return '#f1c40f';  // Yellow
      default:
        return 'black';
    }
  };

export default getPaymentStatusColor;