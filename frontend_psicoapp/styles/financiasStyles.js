import { StyleSheet } from "react-native";

export const financiasStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    card: {
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 16,
        color: '#6a0dad',
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic'
    }
});
