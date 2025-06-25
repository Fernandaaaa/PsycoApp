import { StyleSheet } from "react-native";

export const diarioStyles = StyleSheet.create({
    moodSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
    moodButton: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 6,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    selectedMoodButton: {
        backgroundColor: '#836FFF',
    },
    moodEmoji: {
        fontSize: 32,
    },
    moodText: {
        marginTop: 6,
        fontWeight: '600',
        color: '#000',
    },
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
});
