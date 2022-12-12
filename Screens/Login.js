import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { styles } from '../style';

const Login =(props)=>{
    const [idTextInput, setIdTextInput] = useState(""); //입력 id
    const [pwTextInput, setPwTextInput] = useState(""); //입력 pw
    const [student, setStudent] = useState(); //불러온 student 정보
    
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
            //q:쿼리문,  Readstudent:쿼리문으로 식별한 DB   
            const q = await query( collection(db, "Student"), where('st_id',"==", idTextInput))
            const Readstudent = await getDocs(q); 
            //ID존재 
            if(Readstudent != null){  
                Readstudent.docs.map((row, idx) =>{ 
                    //PW 일치
                    if(row.data().st_pw == pwTextInput){
                        setStudent(row.data()) //최종 student DB 저장
                        alert("success login")
                        //로그인 성공 - Home으로 이동
                        props.navigation.navigate("Home", {
                            student: idTextInput
                        }) 
                    //PW 불일치
                    }else alert("Password Mismatch")
                })
            }
        }catch(error){ console.log(error.message)}
    }

    return(
    <ImageBackground style={styles.image} source={require("../images/LoginScreen.png")} resizeMode="cover">
    <View style={styles.mainView}>
        {/* <Text>Login Screen</Text> */}
        <TextInput
            style={styles.text}
            value = {idTextInput}
            onChangeText = {idChangeInput}
            placeholder = 'Student ID'
        />
        <TextInput
            style={styles.text}
            value = {pwTextInput}
            onChangeText = {pwChangeInput}
            placeholder = 'Password'
        />
        <TouchableOpacity style={styles.Qbutton}
        onPress={()=>{
            props.navigation.navigate("SignUp")
        }}>
            <Text style={styles.QbuttonText}>Sign Up</Text>
            </TouchableOpacity>

        <TouchableOpacity style={styles.Qbutton} onPress={loginDB}>
            <Text style={styles.QbuttonText}>Login</Text>
        </TouchableOpacity>
        {/* <Button
            color={'#008b8b'}
            title = 'Sign Up'
            onPress={()=>{
                props.navigation.navigate("SignUp")
            }}
        /> */}
        {/* <Button
            color={'#008b8b'}
            title = 'Login'
            onPress={loginDB}
        /> */}
    </View>
    </ImageBackground>
    );
}

export default Login;