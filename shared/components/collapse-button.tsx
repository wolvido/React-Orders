import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface CollapseButtonProps {
    isPortrait: boolean;
    isCartCollapsed: boolean;
    onToggleCollapse: () => void;
}

export function CollapseButton({
    isPortrait,
    isCartCollapsed,
    onToggleCollapse,
}: CollapseButtonProps) {
    return (
        <View style={[
            isPortrait && styles.collapseButtonContainer,
            // !isPortrait && styles.landscapeCollapseButtonContainer
        ]}>
            {isPortrait && (
                <IconButton
                    icon={isCartCollapsed ? "chevron-up" : "chevron-down"}
                    onPress={onToggleCollapse}
                    size={20}
                    mode="contained"
                />
            )}

            {!isPortrait && (
                <IconButton
                    icon={isCartCollapsed ? "chevron-left" : "chevron-right"}
                    onPress={onToggleCollapse}
                    size={20}
                    mode="contained"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    collapseButtonContainer: {
        //flex center
        alignSelf: 'center',
        height: 0,
        zIndex: 100,
        marginBottom: 25,
        marginTop: -28,
    },
    landscapeCollapseButtonContainer:{
        position: 'absolute',
        top: 0,
        right: 650,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
});

