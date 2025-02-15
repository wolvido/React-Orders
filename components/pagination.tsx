// components/Pagination.tsx
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const renderPageNumbers = () => {
        const pages = [];
        
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.pageButton,
                        currentPage === i && styles.activePageButton
                    ]}
                    onPress={() => onPageChange(i)}
                >
                    <Text style={[
                        styles.pageButtonText,
                        currentPage === i && styles.activePageButtonText
                    ]}>
                        {i}
                    </Text>
                </TouchableOpacity>
            );
        }
        return pages;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.navButton, currentPage === 1 && styles.disabledButton]}
                onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Text style={styles.navButtonText}>←</Text>
            </TouchableOpacity>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pagesContainer}
            >
                {renderPageNumbers()}
            </ScrollView>

            <TouchableOpacity
                style={[styles.navButton, currentPage === totalPages && styles.disabledButton]}
                onPress={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <Text style={styles.navButtonText}>→</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    pagesContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    pageButton: {
        padding: 8,
        marginHorizontal: 4,
        borderRadius: 4,
        minWidth: 40,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    activePageButton: {
        backgroundColor: '#007AFF',
    },
    navButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        minWidth: 40,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    pageButtonText: {
        color: '#333',
        fontSize: 16,
    },
    activePageButtonText: {
        color: 'white',
    },
    navButtonText: {
        color: '#333',
        fontSize: 16,
    },
});
