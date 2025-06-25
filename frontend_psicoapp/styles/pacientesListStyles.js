import { StyleSheet } from "react-native";

export const pacientesListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    listContainer: {
        padding: 16
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        elevation: 2
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingHorizontal: 8,
        paddingBottom: 12,
        gap: 8
    },
    button: {
        flexGrow: 1,
        flexBasis: '48%'
    },
    buttonLabel: {
        fontSize: 14
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic',
    }
});
