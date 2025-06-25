import { StyleSheet } from "react-native";

export const feedbackPacienteStyles = StyleSheet.create({
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
    item: {
        fontSize: 16,
        marginVertical: 2,
        color: '#333',
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    noRecordsText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 40,
        color: '#999',
    },
});
