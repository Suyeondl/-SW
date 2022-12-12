import { StyleSheet } from "react-native"
import { withSafeAreaInsets } from "react-native-safe-area-context"

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        height: "100%",
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signView: {
        marginTop: 180,
        marginLeft: 30,
        flex: 1
    },
    text: {
        width: 180,
        height: 35,
        fontSize: 18,
        color: 'grey',
        backgroundColor: '#fffff0',
        borderWidth: 1,
        borderRadius: 3,
        margin: 3,
        alignItems: 'center',
        padding: 5,
    },
    mainText: {
        width: 340,
        height: 35,
        fontSize: 18,
        color: 'grey',
        backgroundColor: '#fffff0',
        borderWidth: 1,
        borderRadius: 3,
        margin: 3,
        alignItems: 'center',
        justifyConten:'center',
        padding: 5
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008b8b',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'grey',
        padding: 5,
        width: 150,
        height: 50,
        marginBottom: 10
    },
    Qbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008b8b',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'grey',
        padding: 5,
        width: 90,
        height: 40,
        margin: 3
    },
    buttonText: {
        fontSize: 30,
        color: 'white',
        fontStyle: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    QbuttonText: {
        fontSize: 20,
        color: 'white',
        fontStyle: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    questionText: {
        backgroundColor: 'white',
        borderColor: '#ffe4b5',
        height: 200,
        width: 350,
        fontSize: 23,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        marginBottom: 10
    },
    selectText: {
        color:'black',
        fontSize: 18,
    },
    selectQuestion: {
        fontWeight:'bold',
        fontSize: 17.5
    },
    answerContainer: {

    }
    })