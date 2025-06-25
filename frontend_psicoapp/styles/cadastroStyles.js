import { StyleSheet } from "react-native";

export const cadastroStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        padding: 20,
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        marginBottom: 20,
        color: "#6a0dad",
        alignSelf: "center",
    },
    input: {
        marginBottom: 15,
    },
    toggleButton: {
        marginVertical: 10,
    },
    submitButton: {
        marginTop: 10,
    },
});
