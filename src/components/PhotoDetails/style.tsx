import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(240,240,240,0.95)',
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
        marginHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: "#888",
        fontWeight: "600",
        marginTop: 8,
    },
    coordinate: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    value: {
        fontSize: 16,
        color: "#222",
        fontWeight: "bold",
        marginBottom: 4,
    },
    image: {
        height: 72,
        width: 72,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
    }
});
