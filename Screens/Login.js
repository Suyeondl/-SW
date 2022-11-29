import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';

const Login =(props)=>{
    const [idTextInput, setIdTextInput] = useState(""); //입력 id
    const [pwTextInput, setPwTextInput] = useState(""); //입력 pw
    const [Teacher, setTeacher] = useState(); //불러온 선생님 정보
    
    //로그인 입력값을 useState(id, pw)에 저장
    const idChangeInput = (event) =>{
        console.log("Input ID", event)
        setIdTextInput(event)
    }
    const pwChangeInput = (event) =>{
        console.log("Input PW", event)
        setPwTextInput(event)
    }

    //로그인 DB
    const loginDB = async ()=>{
        try{
            //q:쿼리문,  Readdteacher:쿼리문으로 식별한 DB   
            const q = await query( collection(db, "Teacher"), where('ta_id',"==", idTextInput))
            const Readteacher = await getDocs(q); 
            //ID존재 
            if(Readteacher != null){  
                Readteacher.docs.map((row, idx) =>{ 
                    //PW 일치
                    if(row.data().ta == pwTextInput){
                        setTeacher(row.data()) //최종 teacher DB 저장
                        alert("success login")
                        //로그인 성공 - Home으로 이동
                        props.navigation.navigate("Home", {
                            teacher: idTextInput
                        }) 
                    //PW 불일치
                    }else alert("Password Mismatch")
                })
            }
        }catch(error){ console.log(error.message)}
    }

    return(
    <View style={styles.mainView}>
        <Text>Login Screen</Text>
        <TextInput
            value = {idTextInput}
            onChangeText = {idChangeInput}
            placeholder = 'Teacher ID'
            style={{backgroundColor:"#89EE"}}
        />
        <TextInput
            value = {pwTextInput}
            onChangeText = {pwChangeInput}
            placeholder = 'Password'
            style={{backgroundColor:"#89EE"}}
        />
        <Button
            title = 'Sign Up'
            onPress={()=>{
                props.navigation.navigate("SignUp")
            }}
        />
        <Button
            title = 'Login'
            onPress={loginDB}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      height:"100%",
      marginTop:50,
      alignItems: 'center',
      justifyContent: 'center',
    }
});
export default Login;