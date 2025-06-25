import { StyleSheet } from "react-native";

export const feedbackUserStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40, 
    },
    entry: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderLeftWidth: 4,
        borderLeftColor: '#6a0dad'
    },
    entryText: {
        fontSize: 16
    }
});
