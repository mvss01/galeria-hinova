import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#f7fafd',
    },
    title: {
        fontSize: 20,
        color: '#22223b',
        marginBottom: 28,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    button: {
        backgroundColor: '#3a86ff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#3a86ff',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 1,
    }
})
