import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6'
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#6a0dad'
    }
});
