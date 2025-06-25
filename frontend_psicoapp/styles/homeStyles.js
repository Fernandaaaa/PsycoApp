import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f5f5f5'
    },
    welcome: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
        color: '#333'
    },
    button: {
        marginVertical: 8,
        borderRadius: 8
    },
    logout: {
        marginTop: 20,
        alignSelf: 'center'
    }
});
