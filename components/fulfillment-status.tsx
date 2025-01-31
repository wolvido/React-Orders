import { View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import { useState, useEffect } from 'react';
import Status from '@/enums/status';

interface StatusFormProps {
    orderId: number;
    defaultStatus: Status;
}

export default function StatusForm({ orderId, defaultStatus }: StatusFormProps) {
    const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus);

    useEffect(() => {
        // Update selected status when defaultStatus prop changes
        setSelectedStatus(defaultStatus);
    }, [defaultStatus]);

    const statusOptions = [
        { value: Status.Delivered, label: 'Fulfilled' },
        { value: Status.Pending, label: 'Pending' },
        { value: Status.Cancelled, label: 'Cancelled' },
    ];

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        console.log('Order ID:', orderId);
        console.log('Selected Status:', value);
    };

    return (
        <View style={{ padding: 16 }}>
            <Text variant="headlineSmall">Update Fulfillment Status</Text>
            
            <SegmentedButtons
                style = {
                    {
                        marginTop: 25
                    }
                }
                value={selectedStatus}
                onValueChange={handleStatusChange}
                buttons={statusOptions}
            />
        </View>
    );
}
