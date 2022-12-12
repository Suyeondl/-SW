import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig';
import { addDoc, collection, getDocs, doc, updateDoc, where, query } from 'firebase/firestore';
import { styles } from '../style';

const SignUp =(props)=>{
    const [nameTextInput, setNameTextInput] = useState(""); //회원가입 name
    const [idTextInput, setIdTextInput] = useState(""); //회원가입 student-id
    const [pwTextInput, setPwTextInput] = useState(""); //회원가입 pw
    const [classChoice, setClassChoice] = useState(""); //회원가입 class선택
   
    //회원가입 입력값을 useState(name, id, pw, class)에 저장
    const nameChangeInput = (event) =>{
        console.log("Input Name", event)
        setNameTextInput(event)
    }
    const idChangeInput = (event) =>{
        console.log("Input ID", event)
        setIdTextInput(event)
    }
    const pwChangeInput = (event) =>{
        console.log("Input PW", event)
        setPwTextInput(event)
    }
    const classChangeInput = (event) =>{
        console.log("Input Class", event)
        setClassTextInput(event)
    }

    //student 추가하기(회원가입)
    const addStudent = async()=> {
        try{
            await addDoc(collection(db, "Student"), {
                name: nameTextInput,
                st_id: idTextInput,
                st_pw: pwTextInput,
                class: classChoice
            });
            //값 초기화
            alert("Add Student!!")
            setNameTextInput("")
            setIdTextInput("")
            setPwTextInput("")
            setClassChoice("")
        }catch(error){ console.log(error.message) }
    }

    return(
        <ImageBackground style={styles.image} source={require("../images/SignupScreen.png")} resizeMode="cover">
        <View style={styles.mainView}>
            {/* <Text>Signup</Text> */}
            <Text style={styles.selectText}>Name</Text>
            <TextInput
                value = {nameTextInput}
                onChangeText = {nameChangeInput}
                placeholder = 'Student Name'
                style={styles.text}
            />
            <Text style={styles.selectText}>ID</Text>
            <TextInput
                value = {idTextInput}
                onChangeText = {idChangeInput}
                placeholder = 'Student ID'
                style={styles.text}
            />
            <Text style={styles.selectText}>Password</Text>
            <TextInput
                value = {pwTextInput}
                onChangeText = {pwChangeInput}
                placeholder = 'Password'
                style={styles.text}
            />

            <Text style={styles.selectText}>Choice Class :</Text>
            <Picker 
                style={{height:50, width:180, borderWidth: 1, borderRadius: 3,backgroundColor:'#fffff0'}}
                selectedValue={classChoice}
                onValueChange={(val,idx)=>setClassChoice(val)}
            >
                <Picker.Item label="Class 1" value="1"></Picker.Item>
                <Picker.Item label="Class 2" value="2"></Picker.Item>
                <Picker.Item label="Class 3" value="3"></Picker.Item>
            </Picker>

            <TouchableOpacity style={styles.Qbutton} onPress={addStudent}>
                <Text style={styles.QbuttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Qbutton}
            onPress={()=>{
                props.navigation.navigate("Login")
            }}
            >
                <Text style={styles.QbuttonText}>Login</Text>
            </TouchableOpacity>

        </View>
        </ImageBackground>
    );
}
export default SignUp;