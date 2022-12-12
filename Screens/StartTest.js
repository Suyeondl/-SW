import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query, updateDoc, doc } from 'firebase/firestore';
import { styles } from '../style';

//Test첫 페이지
const StartTest =(props)=>{
    const [firstAnswer, setStAnswer] = useState("");        // 문제의 첫번째 질문: answer저장
    const [questionCount, setQuestionCount] = useState();   // 3문제: 문제 진행 상태 확인
    const [studentId, setStudentId] = useState("");         // (Home) studentId
    const [testId, setTestId] = useState("");               // (Home) testId
    const [printQuestion,setPrintQuestion] = useState("")   // Question지문
    const [questionId, setQuestionId] = useState("");       // 현재 questionId

    //문제 진행 상태
    const [firstQuestionFlag,setFirstQuestionFlag] = useState(false)
    const [secondQuestionFlag,setSecondQuestionFlag] = useState(false)
    const [thridQuestionFlag,setThridQuestionFlag] = useState(false)
    var QuestionArray = [,,]; // 시험지 questionId 저장(3문제)

    //첫 질문 Answer 저장
    const answerChangeInput = (event) =>{
        console.log("Input Answer", event)
        setStAnswer(event)
    }

    //Answer저장
    const updateAnswer = async() =>{
        const st_Id = props.route.params.studentId;
        const t_Id = props.route.params.testId;
        const Count = props.route.params.Count; //문제 진행 상태 확인

        try{
            const q = await query( collection(db, "AnswerStudent"), where('testId',"==", t_Id)) 
            const answer = await getDocs(q); // test 일치 답안지
            let docID; //불러온 AnswerStudent의 고유ID
            answer.docs.map((row, idx)=>{ docID = row.id; })
            const docRef = doc(db, "AnswerStudent", docID); //고유ID가진 AnswerStudent DB

            //Count: (3)1번문제, (2)2번문제, (1)3번문제
            //firstAnswer: 첫 질문 input answer
            switch(Count){
                case 3:
                    await updateDoc(docRef, { firstAnswer: firstAnswer }); 
                    break;
                case 2:
                    await updateDoc(docRef, { secondAnswer: firstAnswer });
                    break;
                case 1:
                    await updateDoc(docRef, { thirdAnswer: firstAnswer });
                    break;
            }
        }catch(error){ console.log(error.message)}

        //Strategy 이동
        props.navigation.navigate("Strategy", {
            studentId: studentId,
            testId: testId,
            questionPrint: printQuestion,
            questionId: questionId,
            Count: questionCount
        })
    }

    //Question DB: testid와 일치하는 시험지 가져와 문제 출력
    const QuestionDB = async ()=>{
        const st_Id = props.route.params.studentId;
        const t_Id = props.route.params.testId;
        const Count = props.route.params.Count;
        setStudentId(st_Id);
        setTestId(t_Id);
        setQuestionCount(Count);
        console.log("StartTest CountNum", Count);
        
        //1번 문제 종료
        if(Count == 2) setFirstQuestionFlag(true);
        //2번 문제 종료
        else if(Count == 1){
            setFirstQuestionFlag(true);
            setSecondQuestionFlag(true);
        } 
        //모든 문제 종료
        else if(Count == 0){
            setFirstQuestionFlag(true);
            setSecondQuestionFlag(true);
            setThridQuestionFlag(true);
        } 
        try{
            const q = await query( collection(db, "Test"), where('testId',"==", t_Id)) 
            const Test = await getDocs(q); //현재 test 시험DB
            Test.docs.map((row, idx) =>{
                //question저장
                QuestionArray[0] = row.data().Q1 
                QuestionArray[1] = row.data().Q2
                QuestionArray[2] = row.data().Q3
            })
            //var i = 0;
            //for(i=0; i<3; i++) console.log(QuestionArray[i])

            //count에 따라 다른 문제지문이 출력
            if(Count == 3){
                const q2 = await query( collection(db, "Question"), where('key',"==", QuestionArray[0]))
                const whatQuestion = await getDocs(q2); 
                whatQuestion.docs.map((row, idx) =>{setPrintQuestion(row.data().question); })//문제1 지문을 읽어옴
                setQuestionId(QuestionArray[0]); //현재 question을 저장
            } 
            else if(Count == 2){
                const q2 = await query( collection(db, "Question"), where('key',"==", QuestionArray[1]))
                const whatQuestion = await getDocs(q2);
                whatQuestion.docs.map((row, idx) =>{setPrintQuestion(row.data().question); })//문제2 지문을 읽어옴
                setQuestionId(QuestionArray[1]) 
            }else{
                const q2 = await query( collection(db, "Question"), where('key',"==", QuestionArray[2]))
                const whatQuestion = await getDocs(q2);
                whatQuestion.docs.map((row, idx) =>{setPrintQuestion(row.data().question); })//문제3 지문을 읽어옴
                setQuestionId(QuestionArray[2]) 
            }
        }catch(error){ console.log(error.message)}
    }
    
    //next버튼
    const nextQuestion = ()=>{
        //2번문제가 완료 or 3번문제가 완료 -> 다음 문제로 이동
        //1번문제가 완료되면 Count값이 2로 변화 -> 이미 첫 화면에 문제가 출력
        if(questionCount==2 && firstQuestionFlag==true
           || questionCount==1 && secondQuestionFlag==true
        ){
            props.navigation.navigate("StartTest", {
                studentId: studentId,
                testId: testId,
                questionId: questionId,
                Count: (questionCount)
            })
        }
        //모든 문제가 완료 -> Home이동
        else if(firstQuestionFlag==true && secondQuestionFlag==true && thridQuestionFlag==true){
            alert("clear");
            props.navigation.navigate("Home", {
                studentId: studentId,
                testId: testId,
                finish: true
            })
        }else alert("Complete all question..");
    }

    useEffect(()=>{
        QuestionDB()
    },[props])

    return(
        <ImageBackground style={styles.image} source={require("../images/QuestionScreen.png")} resizeMode="cover">
        <View style={styles.mainView}>
            <Text style={styles.questionText}>{printQuestion}</Text>
            <Text style={styles.selectQuestion}>What do you think the problem is asking you to do?</Text>
            <TextInput
                style={styles.mainText}
                value = {firstAnswer}
                onChangeText = {answerChangeInput}
                placeholder = 'Write your answer'
            />
            <TouchableOpacity style={styles.Qbutton} onPress={updateAnswer}>
                <Text style={styles.QbuttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Qbutton} onPress={nextQuestion}>
                <Text style={styles.QbuttonText}>Next</Text>
            </TouchableOpacity>

        </View>
        </ImageBackground>
    );
}
// const styles = StyleSheet.create({
//     mainView: {
//         flex: 1,
//         height:"100%",
//         marginTop:50,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     mainText: {
//         fontSize:20,
//         color:"black",
//         padding:20,
//         margin:20,
//         backgroundColor:'pink'
//     }
// });
export default StartTest;