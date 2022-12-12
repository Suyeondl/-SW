import { StyleSheet, Text, View, Button, TextInput,ImageBackground,TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { styles } from '../style';

const Strategy =(props)=>{
    //전략 지문 저장
    const [AStrategy, setAStrategy] = useState(""); 
    const [BStrategy, setBStrategy] = useState(""); 
    const [CStrategy, setCStrategy] = useState("");

    //전략 풀이 상태
    const [firstPromptFlag,setFirstPromptFlag] = useState(false)
    const [secondPromptFlag,setSecondPromptFlag] = useState(false)
    const [thridthPromptFlag,setThridPromptFlag] = useState(false)

    const [studentId, setStudentId] = useState(""); // (StartTest) studentId
    const [testId, setTestId] = useState("");       // (StartTest) testId
    const [printQuestion,setPrintQuestion] = useState("")   // 현재 question 지문
    const [questionId, setQuestionId] = useState("");       // 현재 questionId
    const [questionCount, setQuestionCount] = useState();   // 문제 진행상태 확인: Count
    const [back, setBack] = useState();

    //strategy DB를 가져옴
    const StrategyDB = async()=>{
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const questionId = props.route.params.questionId;
        const questionPrint = props.route.params.questionPrint;
        const count = props.route.params.Count;
        const BackCount = props.route.params.BackCount; 
        setBack(BackCount);        //prompt에서 전달받은 count
        setQuestionCount(count);   //StartTest에서 전달받은 count
        setStudentId(studentId);
        setTestId(testId);
        setQuestionId(questionId);
        setPrintQuestion(questionPrint);

        //해당 question 전략 저장
        try{
            const q = await query( collection(db, "Question"), where('key',"==", questionId)) 
            const whatQuestion = await getDocs(q);
            whatQuestion.docs.map((row, idx) =>{
                setAStrategy(row.data().strategy[0]); //strategyA
                setBStrategy(row.data().strategy[1]); //strategyB
                setCStrategy(row.data().strategy[2]); //strategyC
            })
        }catch(error) { console.log(error.message) }
    }

    //다음 문제 버튼
    const nextQuestion = ()=>{
        //모든 전략이 true인 경우에 활성화
        if(firstPromptFlag==true && secondPromptFlag==true && thridthPromptFlag==true){
            props.navigation.navigate("StartTest", {
                studentId: studentId,
                testId: testId,
                questionId: questionId,
                Count: (questionCount-1) //count -1: 다음문제
            })
        } 
        else alert("Complete all strategies..");
    }
    useEffect(()=>{
         StrategyDB()
    },[props])

    return(
        <ImageBackground style={styles.image} source={require("../images/QuestionScreen.png")} resizeMode="cover">
        <View style={styles.mainView}>
            <Text style={styles.questionText}>{printQuestion}</Text>
            <Text style={styles.selectQuestion}>Which strategy do you want to try?</Text> 
           
            <TouchableOpacity 
                style={{
                    color:'black', 
                    fontSize:18, 
                    backgroundColor:firstPromptFlag?"#bbb":"#fffff0",
                    height:35,
                    width:340,
                    alignItems: 'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderRadius:3,
                    marginBottom:3
                }}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 0,
                        questionPrint: printQuestion,
                        choiceStrategy: AStrategy,
                        Count: questionCount
                    })
                    setFirstPromptFlag(true)
                }}
                disabled={firstPromptFlag}
                >
                <Text style={styles.selectText}>{AStrategy}</Text> 
            </TouchableOpacity>

            <TouchableOpacity 
                style={{
                    color:'black', 
                    fontSize:18, 
                    backgroundColor:secondPromptFlag?"#bbb":"#fffff0",
                    height:35,
                    width:340,
                    alignItems: 'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderRadius:3,
                    marginBottom:3
                }}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 1,
                        questionPrint: printQuestion,
                        choiceStrategy: BStrategy,
                        Count: questionCount
                    })
                    setSecondPromptFlag(true)
                }}
                disabled={secondPromptFlag}
                >
                <Text style={styles.selectText}>{BStrategy}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{
                    color:'black', 
                    fontSize:18, 
                    backgroundColor:thridthPromptFlag?"#bbb":"#fffff0",
                    height:35,
                    width:340,
                    alignItems: 'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderRadius:3,
                    marginBottom:3
                }}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 2,
                        questionPrint: printQuestion,
                        choiceStrategy: CStrategy,
                        Count: questionCount
                    })
                    setThridPromptFlag(true)
                }}
                disabled={thridthPromptFlag}
                >
                <Text style={styles.selectText}>{CStrategy}</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.Qbutton} onPress={nextQuestion}>
                <Text style={styles.QbuttonText}>Next</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    )
}
// const styles = StyleSheet.create({
//     mainView: {
//       flex: 1,
//       height:"100%",
//       marginTop:50,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     mainText: {
//         fontSize:20,
//         color:"black",
//         padding:20,
//         margin:20,
//         backgroundColor:'pink'
//     }
// });
export default Strategy;