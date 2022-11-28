import React, {useState} from 'react';
import  {db}  from '../firebaseConfig';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
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

import Question_Psychology from './Question_Psychology';
import Answer_Psychology from './Answer_Psychology.js';

const ReadFromDB = () => {

    const[Questions, setQuestions] = useState();


    

    const readfromDB = async () =>{
        try{
            const data = await getDocs(collection(db, "Question","Psychology", "Q1"))
            setQuestions(data.docs.map(doc => ({...doc.data(), id: doc.id})));

            data.forEach((doc) => {
                console.log(doc.id, '=>' ,doc.data())
            });
            console.log(Questions)
            console.log("배열 : ", Questions[0][0])
        }catch(error){
            console.log(error.message)
        }
    }

    return(
        <View>
            <Button title="Read Text" onPress={readfromDB} />
            {Questions?.map((row, idx) => {
            return (
                <>
                    <Question_Psychology question={row.id} idx={idx}/>

                    <Answer_Psychology answer={row.id} idx={idx}/>
                </>
                );
            })}
           
        </View>
    );
}

export default ReadFromDB;