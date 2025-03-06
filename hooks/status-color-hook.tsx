import Status from "@/enums/status";

const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Delivered:
        return '#2ecc71';  // Green
      case Status.Pending:
        return '#f1c40f';  // Yellow
      default:
        return 'black';
    }
  };

export default getStatusColor;

