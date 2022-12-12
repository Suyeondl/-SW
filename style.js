import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    //뷰 스타일
    mainView: {
        flex: 1,
        height: "100%",
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //회원가입 뷰 스타일
    signView: {
        marginTop: 180,
        marginLeft: 30,
        flex: 1
    },
    //회원가입 입력창 텍스트
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
    //답안 입력 창
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
    //백그라운드 이미지
    image: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    //홈 스크린 버튼
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
    //제출, 다음 안내 버튼
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
    //홈 스크린 버튼 텍스트
    buttonText: {
        fontSize: 30,
        color: 'white',
        fontStyle: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    //버튼 텍스트
    QbuttonText: {
        fontSize: 20,
        color: 'white',
        fontStyle: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    //문제 출력 텍스트
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
    //풀이 방식 선택 버튼 텍스트
    selectText: {
        color:'black',
        fontSize: 18,
    },
    //풀이 방식 선택 안내 텍스트
    selectQuestion: {
        fontWeight:'bold',
        fontSize: 17.5
    },
    })