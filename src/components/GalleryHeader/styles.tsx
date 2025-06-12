import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        paddingHorizontal: 4,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        color: "#0a85ff"
    }
});
