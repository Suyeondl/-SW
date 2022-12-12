import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import { styles } from '../style';

const Prompt =(props)=>{
    const [promptData,setPromptData] = useState([])//prompt배열
    const [promptIdx,setPromptIdx] = useState(0)   //인덱스 번호
    const [countPrompt, setCountPrompt] = useState(); //prompt개수)-몇번째 prompt인지 확인
    const [studentId, setStudentId] = useState(""); 
    const [testId, setTestId] = useState(""); 
    const [questionId, setQuestionId] = useState("");     //문제 id
    const [strategyId, setStrategyId] = useState();       //전략 id
    const [printQuestion,setPrintQuestion] = useState("") //question지문
    const [questionCount, setQuestionCount] = useState(); //현재 문제
    const [promptAnswer, setPromptAnswer] = useState(""); //학생 입력 prompt answer 저장
    let nowCount = 100; //prompt개수 확인 및 prompt진행 상태 확인

    const ReadPromptDB = async()=>{ 
        const questionId = props.route.params.questionId;
        const strategyId = props.route.params.strategyId;
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const questionPrint = props.route.params.questionPrint;
        const Count = props.route.params.Count;
        setStudentId(studentId);
        setTestId(testId);
        setQuestionId(questionId);
        setStrategyId(strategyId);
        setPrintQuestion(questionPrint);
        setQuestionCount(Count);
        try{
            const q1 = await query( collection(db, "Prompt"), where('questionId',"==", questionId)) 
            const PromptQuestion = await getDocs(q1); //question에 해당하는 모든 prompt 리스트 
            let tempData=[] //prompt저장
            PromptQuestion.docs.map((doc)=>{
                if(doc.data().strategyId === strategyId) { //strategy 일치 확인
                    //prompts배열에서 tempData배열로 item하나하나 push
                    doc.data().prompts.map(item =>{tempData.push(item)})
                    nowCount = doc.data().count; //prompt개수
                    setCountPrompt(doc.data().count)
                }
            })
            setPromptData(tempData)
        }catch(error){

        }
    }

    const showPrompt =  async() =>{
        const strategyId = props.route.params.strategyId;
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const Count = props.route.params.Count;
        try{
            const q = await query( collection(db, "AnswerStudent"), where('testId',"==", testId)) 
            const answer = await getDocs(q); //test id일치 답안지
            let docID; //answer의 DB ID
            answer.docs.map((row, idx)=>{docID = row.id;})
            const docRef = doc(db, "AnswerStudent", docID); //해당 id가진 user업데이트

            //답안지 저장 
            let q1_A_p1, q1_A_p2, q1_A_p3, q1_A_p4, q1_A_p5;
            let q1_B_p1, q1_B_p2, q1_B_p3, q1_B_p4;
            let q1_C_p1, q1_C_p2, q1_C_p3, q1_C_p4;
            let q2_A_p1, q2_A_p2, q2_A_p3, q2_A_p4, q2_A_p5;
            let q2_B_p1, q2_B_p2, q2_B_p3, q2_B_p4;
            let q2_C_p1, q2_C_p2, q2_C_p3, q2_C_p4;                   
            let q3_A_p1, q3_A_p2, q3_A_p3, q3_A_p4, q3_A_p5;
            let q3_B_p1, q3_B_p2, q3_B_p3, q3_B_p4;
            let q3_C_p1, q3_C_p2, q3_C_p3, q3_C_p4;

            const q2 = await query( collection(db, "Answer"), where('testId',"==", testId)) 
            const mark = await getDocs(q2); //test id일치 답안지
            mark.docs.map((row, idx)=>{  
                q1_A_p1 = row.data().q1_A_p1;
                q1_A_p2 = row.data().q1_A_p2;
                q1_A_p3 = row.data().q1_A_p3;
                q1_A_p4 = row.data().q1_A_p4;
                q1_A_p5 = row.data().q1_A_p5;
                q1_B_p1 = row.data().q1_B_p1;
                q1_B_p2 = row.data().q1_B_p2;
                q1_B_p3 = row.data().q1_B_p3;
                q1_B_p4 = row.data().q1_B_p4;
                q1_C_p1 = row.data().q1_C_p1;
                q1_C_p2 = row.data().q1_C_p2;
                q1_C_p3 = row.data().q1_C_p3;
                q1_C_p4 = row.data().q1_C_p4;
                q2_A_p1 = row.data().q2_A_p1;
                q2_A_p2 = row.data().q2_A_p2;
                q2_A_p3 = row.data().q2_A_p3;
                q2_A_p4 = row.data().q2_A_p4;
                q2_A_p5 = row.data().q2_A_p5;
                q2_B_p1 = row.data().q2_B_p1;
                q2_B_p2 = row.data().q2_B_p2;
                q2_B_p3 = row.data().q2_B_p3;
                q2_B_p4 = row.data().q2_B_p4;
                q2_C_p1 = row.data().q2_C_p1;
                q2_C_p2 = row.data().q2_C_p2;
                q2_C_p3 = row.data().q2_C_p3;
                q2_C_p4 = row.data().q2_C_p4;
                q3_A_p1 = row.data().q3_A_p1;
                q3_A_p2 = row.data().q3_A_p2;
                q3_A_p3 = row.data().q3_A_p3;
                q3_A_p4 = row.data().q3_A_p4;
                q3_A_p5 = row.data().q3_A_p5;
                q3_B_p1 = row.data().q3_B_p1;
                q3_B_p2 = row.data().q3_B_p2;
                q3_B_p3 = row.data().q3_B_p3;
                q3_B_p4 = row.data().q3_B_p4;
                q3_C_p1 = row.data().q3_C_p1;
                q3_C_p2 = row.data().q3_C_p2;
                q3_C_p3 = row.data().q3_C_p3;
                q3_C_p4 = row.data().q3_C_p4;
            })

            if(Count==3){ //1번문제
                if(strategyId==0){ //A전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q1_A_p1: promptAnswer });
                            if(promptAnswer!=q1_A_p1) alert("[wrong answer]: "+q1_A_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q1_A_p2: promptAnswer });
                            if(promptAnswer!=q1_A_p2) alert("[wrong answer]: "+q1_A_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q1_A_p3: promptAnswer });
                            if(promptAnswer!=q1_A_p3) alert("[wrong answer]: "+q1_A_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_A_p4: promptAnswer });
                            if(promptAnswer!=q1_A_p4) alert("[wrong answer]: "+q1_A_p4);
                            break;
                        case 4: 
                            await updateDoc(docRef, { q1_A_p5: promptAnswer });
                            if(promptAnswer!=q1_A_p5) alert("[wrong answer]: "+q1_A_p5);
                            break;
                    }
                }else if(strategyId==1){ //B전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q1_B_p1: promptAnswer });
                            if(promptAnswer!=q1_B_p1) alert("[wrong answer]: "+q1_B_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q1_B_p2: promptAnswer });
                            if(promptAnswer!=q1_B_p2) alert("[wrong answer]: "+q1_B_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q1_B_p3: promptAnswer });
                            if(promptAnswer!=q1_B_p3) alert("[wrong answer]: "+q1_B_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_B_p4: promptAnswer });
                            if(promptAnswer!=q1_B_p4) alert("[wrong answer]: "+q1_B_p4);
                            break;
                    }
                }else if(strategyId==2){ //C전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q1_C_p1: promptAnswer });
                            if(promptAnswer!=q1_C_p1) alert("[wrong answer]: "+q1_C_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q1_C_p2: promptAnswer });
                            if(promptAnswer!=q1_C_p2) alert("[wrong answer]: "+q1_C_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q1_C_p3: promptAnswer });
                            if(promptAnswer!=q1_C_p3) alert("[wrong answer]: "+q1_C_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_C_p4: promptAnswer });
                            if(promptAnswer!=q1_C_p4) alert("[wrong answer]: "+q1_C_p4);
                            break;
                    }
                }
            }else if(Count==2){ //2번문제
                if(strategyId==0){ //A전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q2_A_p1: promptAnswer });
                            if(promptAnswer!=q2_A_p1) alert("[wrong answer]: "+q2_A_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q2_A_p2: promptAnswer });
                            if(promptAnswer!=q2_A_p2) alert("[wrong answer]: "+q2_A_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q2_A_p3: promptAnswer });
                            if(promptAnswer!=q2_A_p3) alert("[wrong answer]: "+q2_A_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q2_A_p4: promptAnswer });
                            if(promptAnswer!=q2_A_p4) alert("[wrong answer]: "+q2_A_p4);
                            break;
                        case 4: 
                            await updateDoc(docRef, { q2_A_p5: promptAnswer });
                            if(promptAnswer!=q2_A_p5) alert("[wrong answer]: "+q2_A_p5);
                            break;
                    }
                }else if(strategyId==1){ //B전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q2_B_p1: promptAnswer });
                            if(promptAnswer!=q2_B_p1) alert("[wrong answer]: "+q2_B_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q2_B_p2: promptAnswer });
                            if(promptAnswer!=q2_B_p2) alert("[wrong answer]: "+q2_B_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q2_B_p3: promptAnswer });
                            if(promptAnswer!=q2_B_p3) alert("[wrong answer]: "+q2_B_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_B_p4: promptAnswer });
                            if(promptAnswer!=q1_B_p4) alert("[wrong answer]: "+q1_B_p4);
                            break;
                    }
                }else if(strategyId==2){ //C전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q2_C_p1: promptAnswer });
                            if(promptAnswer!=q2_C_p1) alert("[wrong answer]: "+q2_C_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q2_C_p2: promptAnswer });
                            if(promptAnswer!=q2_C_p2) alert("[wrong answer]: "+q2_C_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q2_C_p3: promptAnswer });
                            if(promptAnswer!=q2_C_p3) alert("[wrong answer]: "+q2_C_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q2_C_p4: promptAnswer });
                            if(promptAnswer!=q2_C_p4) alert("[wrong answer]: "+q2_C_p4);
                            break;
                    }
                }

            }else if(Count==1){ //3번문제
                if(strategyId==0){ //A전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q3_A_p1: promptAnswer });
                            if(promptAnswer!=q3_A_p1) alert("[wrong answer]: "+q3_A_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q3_A_p2: promptAnswer });
                            if(promptAnswer!=q3_A_p2) alert("[wrong answer]: "+q3_A_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q3_A_p3: promptAnswer });
                            if(promptAnswer!=q3_A_p3) alert("[wrong answer]: "+q3_A_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q3_A_p4: promptAnswer });
                            if(promptAnswer!=q3_A_p4) alert("[wrong answer]: "+q3_A_p4);
                            break;
                        case 4: 
                            await updateDoc(docRef, { q3_A_p5: promptAnswer });
                            if(promptAnswer!=q3_A_p5) alert("[wrong answer]: "+q3_A_p5);
                            break;
                    }
                }else if(strategyId==1){ //B전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q3_B_p1: promptAnswer });
                            if(promptAnswer!=q2_C_p4) alert("[wrong answer]: "+q2_C_p4);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q3_B_p2: promptAnswer });
                            if(promptAnswer!=q3_B_p1) alert("[wrong answer]: "+q3_B_p1);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q3_B_p3: promptAnswer });
                            if(promptAnswer!=q3_B_p3) alert("[wrong answer]: "+q3_B_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q3_B_p4: promptAnswer });
                            if(promptAnswer!=q3_B_p4) alert("[wrong answer]: "+q3_B_p4);
                            break;
                    }
                }else if(strategyId==2){ //C전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q3_C_p1: promptAnswer });
                            if(promptAnswer!=q3_C_p1) alert("[wrong answer]: "+q3_C_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q3_C_p2: promptAnswer });
                            if(promptAnswer!=q3_C_p2) alert("[wrong answer]: "+q3_C_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q3_C_p3: promptAnswer });
                             if(promptAnswer!=q3_C_p3) alert("[wrong answer]: "+q3_C_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q3_C_p4: promptAnswer });
                            if(promptAnswer!=q3_C_p4) alert("[wrong answer]: "+q3_C_p4);
                            break;
                    }
                }

            }
          }catch(error){ console.log(error.message)}



        let newIdx = promptIdx +1 //인덱스+1
        setPromptIdx(newIdx)

        if(nowCount == 100){ //첫prompt인 경우에 nowCount를 DB에서 불러옴
            const questionId = props.route.params.questionId;
            const strategyId = props.route.params.strategyId;
            try{
                const q5 = await query( collection(db, "Prompt"), where('questionId',"==", questionId))
                const p1 = await getDocs(q5); //question에 해당하는 모든 prompt 리스트 
                p1.docs.map((doc)=>{
                    if(doc.data().strategyId === strategyId)  nowCount = doc.data().count;
                })
            }catch(error){}
        }

        if(countPrompt == 1) { //count가 1이면 모든 prompt가 종료
            backStrategy();
        }
        else{
            setCountPrompt(countPrompt-1)
            console.log('change'+ countPrompt);
        }

    }


    const backStrategy = ()=>{
        props.navigation.navigate("Strategy", {
            studentId: studentId,   //학생id
            testId: testId,         //시험id
            questionId: questionId, //문제id
            strategyId: strategyId, //전략id
            questionPrint: printQuestion,
            BackCount: questionCount,
            Count: questionCount
        })
    }

    const answerChangeInput = (event) =>{
        console.log("Input Answer", event);
        setPromptAnswer(event);
    }

    useEffect(()=>{
        ReadPromptDB()
    },[])

    return(
        <ImageBackground style={styles.image} source={require("../images/QuestionScreen.png")} resizeMode="cover">
        <View style={styles.mainView}>
            {/* <Text>{nowPrompt}</Text> */}
            <Text style={styles.questionText}>{promptData[promptIdx]}</Text>
            <TextInput
                style={styles.mainText}
                value = {promptAnswer}
                onChangeText = {answerChangeInput}
                placeholder = 'Write your answer'
            />
            <TouchableOpacity 
                style={styles.Qbutton}
                onPress={()=>{
                    showPrompt()
                }}>
                <Text style={styles.QbuttonText}>Submit</Text> 
            </TouchableOpacity>
        </View>
        </ImageBackground>
    )
}
export default Prompt;