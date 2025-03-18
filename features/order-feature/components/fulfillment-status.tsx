import { View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import { useState, useEffect } from 'react';
import Status from '@/shared/enums/status';

interface StatusFormProps {
    defaultStatus: Status;
    onStatusChange: (status: Status) => void;
}

export default function StatusForm({ defaultStatus, onStatusChange }: StatusFormProps) {
    const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus);

    useEffect(() => {
        // Update selected status when defaultStatus prop changes
        setSelectedStatus(defaultStatus);
    }, [defaultStatus]);

    const statusOptions = [
        { value: Status.Delivered, label: 'Fulfilled' },
        { value: Status.Pending, label: 'Pending' }
    ];

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
                onValueChange={(value) => {
                    setSelectedStatus(value);
                    onStatusChange(value as Status);
                }}
                buttons={statusOptions}
            />
        </View>
    );
}
