import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import  {db}  from '../firebaseConfig';
import { 
    addDoc, 
    collection, 
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,  
    where,
    query } from "firebase/firestore"; 

import Answer_Psychology from './Answer_Psychology.js';
import ReadFromDB from './ReadFromDB';

const Question_Psychology = (props) => {

    const[Questions, setQuestions] = useState();
    const[gender, setGender] = useState('');
    const[name, setName] = useState('');
    const[firstName, setFirstName] = useState('');
    const[id, setID] = useState('');

    const[isChecked, setChecked] = useState(false);

    const readfromDB = async () =>{
        try{
            const docRef = doc(db, "Question", "Psychology");
            //const data = await getDoc(docRef);

            const data = await getDocs(collection(db, "Question","Psychology", "Q1"))
            setQuestions(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            data.forEach((doc) => {
                //console.log(doc.id, '=>' ,doc.data())
            });
            //console.log(Questions)
        }catch(error){
            console.log(error.message)
        }
    }

    return(
        <View>
            <Text>Question{props.idx + 1} : {props.question} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default Question_Psychology;