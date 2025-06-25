import { StyleSheet } from "react-native";

export const diarioPacienteStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333'
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    cardDate: {
        fontSize: 14,
        color: '#666'
    },
    cardEmoji: {
        fontSize: 20
    },
    cardDescricao: {
        fontSize: 14,
        color: '#333'
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic',
    }
});
