import useOrientation from '../hooks/orientation-hook';
import React, { useState, useMemo } from 'react';
import { View, Modal, StyleSheet, Animated, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Text, TouchableRipple, IconButton } from 'react-native-paper';

interface DatePickerProps {
    label: string;
    value: Date | null;
    onChange: (date: Date) => void;
    error?: string;
}

export const DatePicker = ({ label, value, onChange, error }: DatePickerProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(0));
    const [isFocused, setIsFocused] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());

    const isLandscape = useOrientation() === 'LANDSCAPE';

    const showDatePicker = () => {
        setIsVisible(true);
        setIsFocused(true);
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const hideDatePicker = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsVisible(false);
            setIsFocused(false);
        });
    };

    const handleDateSelect = (date: Date) => {
        onChange(date);
        hideDatePicker();
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calendar = useMemo(() => {
        const days = [];
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        
        // Add empty spaces for days before first of month
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
        }

        // Add days of month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const isSelected = value && date.toDateString() === value.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();

            days.push(
                <TouchableRipple
                    key={i}
                    style={[
                        styles.dayCell,
                        //conditional styles, applies when true
                        isSelected && styles.selectedDay,
                        isToday && styles.today,
                        isLandscape && styles.dayCellLandscape // Adjust cell height in landscape mode
                    ]}
                    onPress={() => handleDateSelect(date)}
                >
                    <Text style={[
                        styles.dayText,
                        isSelected && styles.selectedDayText
                    ]}>
                        {i}
                    </Text>
                </TouchableRipple>
            );
        }

        return days;
    }, [currentMonth, value, isLandscape]);

    const changeMonth = (increment: number) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));
    };

    return (
        <View style={styles.container}>
            <TouchableRipple
                onPress={showDatePicker}
                style={[
                    styles.input,
                    isFocused && styles.focused,
                    error && styles.error
                ]}
            >
                <View style={styles.inputContent}>
                    <Text style={[
                            styles.label,
                            (isFocused || value) && styles.labelSmall,
                            error && styles.errorText
                        ]}>
                        {label}
                    </Text>
                    <Text style={[
                            styles.value,
                            !value && styles.placeholder
                        ]}>
                        {value ? formatDate(value) : 'Select date'}
                    </Text>
                </View>
            </TouchableRipple>

            {error && <Text style={styles.errorMessage}>{error}</Text>}

            {isVisible && (
                <Modal
                    transparent
                    animationType="none"
                    visible={isVisible}
                    onRequestClose={hideDatePicker}
                >
                    <TouchableWithoutFeedback onPress={hideDatePicker}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <Animated.View
                                    style={[
                                        styles.datePickerContainer,
                                        {
                                            transform: [{
                                                translateY: slideAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [300, 0]
                                                })
                                            }],
                                            width: isLandscape ? '90%' : 'auto',
                                            height: isLandscape ? '90%' : 'auto', // Adjust height in landscape mode
                                            alignSelf: isLandscape ? 'center' : 'stretch',
                                        }
                                    ]}
                                >
                                    <View style={styles.header}>
                                        <IconButton
                                            icon="chevron-left"
                                            onPress={() => changeMonth(-1)}
                                        />
                                        <Text style={styles.monthText}>
                                            {currentMonth.toLocaleDateString('en', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </Text>
                                        <IconButton
                                            icon="chevron-right"
                                            onPress={() => changeMonth(1)}
                                        />
                                    </View>
                                    <View style={styles.weekDays}>
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <Text key={day} style={styles.weekDayText}>{day}</Text>
                                        ))}
                                    </View>
                                    <View style={styles.calendar}>
                                        {calendar}
                                    </View>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#79747E',
        borderRadius: 4,
        backgroundColor: 'white',
        minHeight: 56,
        justifyContent: 'center',
    },
    inputContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    focused: {
        borderWidth: 2,
        borderColor: '#6200EE',
    },
    error: {
        borderColor: '#B00020',
    },
    label: {
        position: 'absolute',
        left: 16,
        top: 16,
        fontSize: 16,
        color: '#49454F',
        backgroundColor: 'transparent',
    },
    labelSmall: {
        top: 8,
        fontSize: 12,
    },
    value: {
        fontSize: 16,
        color: '#1C1B1F',
        marginTop: 16,
    },
    placeholder: {
        color: '#49454F',
    },
    errorText: {
        color: '#B00020',
    },
    errorMessage: {
        color: '#B00020',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    datePickerContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthText: {
        fontSize: 16,
        fontWeight: '500',
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },
    weekDayText: {
        color: '#666',
        fontSize: 12,
    },
    calendar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
    },
    dayCellLandscape: {
        aspectRatio: 1.2, // Adjust cell height in landscape mode
    },
    dayText: {
        fontSize: 14,
    },
    selectedDay: {
        backgroundColor: 'rgb(15, 119, 107)',
        borderRadius: 20,
    },
    selectedDayText: {
        color: 'white',
    },
    today: {
    },
});