import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    message: {
        fontFamily: "ShantellSans_700Bold",
        fontSize: 24,
        textAlign: "center",
        color: "#00000050",
    },
    arrow: {
        position: "absolute",
        bottom: "18%",
        right: "22%",
        alignSelf: "center",
        transform: [{ rotate: '45deg' }],
        opacity: 0.3,
        width: 160,
        height: 160
    }
})
