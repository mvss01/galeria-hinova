import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold'

    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    photo: {
        width: '90%',
        height: '70%',
        borderRadius: 20,
        marginBottom: 20,
    },

})
