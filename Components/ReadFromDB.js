import React, {useEffect, useState} from 'react';
import  {db}  from '../firebaseConfig';
import {View, TextInput, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { 
    addDoc, 
    collection, 
    getDocs,
    getCountFromServer,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,  
    where,
    query, 
    QuerySnapshot} from "firebase/firestore"; 

import Set_Questions from './Set_Questions';
import Set_Answers from './Set_Answers';
import { ScrollView } from 'react-native-gesture-handler';

const ReadFromDB = (onSelectedDepartment) => {

    const[Questions, setQuestions] = useState();
    const[total, setTotal] = useState(0);

    useEffect(() => {
        readfromDB();
    }, []);

    const readfromDB = async () =>{
        try{
            const data = await getDocs(collection(db, "Question",Object.values(onSelectedDepartment).toString(), "Q1"))
            setQuestions(data.docs.map(doc => ({...doc.data(), id: doc.id, checked: false})));

            data.forEach((doc) => {
                console.log(doc.id, '=>' ,doc.data())
            });
            
        }catch(error){
            console.log(error.message)
        }
    }

    const addtoDB = async ()=>{
        try{
          await addDoc(collection(db, "user" ), {
            FirstName: userFirstName,
            LastName: userLastName,
            Height: userHeight,
            Weight: userWeight,
            Gender: userGender,
            createdAt: new Date(),
          });
          alert("Added!!")
          }catch(error){
            console.log(error.message)
          }
      }

    const test = (answer, question) => e => {
        console.log(question + " : " + answer)
        addtoDB
    }

    const setColor =() => {

    }

    return(
        <ScrollView>
            {Questions?.map((question, idx) => {
            return (
                <>
                    <Text style={styles.question}>{question.id}</Text>
                    <TouchableOpacity style={styles.card} onPress={test(Questions[idx][0], question.id)}>
                        <Text style={styles.answer}>{Questions[idx][0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={test(Questions[idx][1], question.id)}>
                        <Text style={styles.answer}>{Questions[idx][1]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={test(Questions[idx][2], question.id)}>
                        <Text style={styles.answer}>{Questions[idx][2]}</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity style={styles.card} onPress={test(Questions[idx][3], question.id)}>
                        <Text style={styles.answer}>{Questions[idx][3]}</Text>
                    </TouchableOpacity>

                    
                    {/* <Text>{Questions[idx][idx]}</Text> */}
                    {/* <Set_Questions question={row.id} idx={idx} array={Questions}/> */}
                </>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    question: {
        marginHorizontal: 15,
        fontWeight: "600",
        fontSize: 20
    },
    card: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    answer: {
        fontSize: 15,
    },
    selectedAnswer :{
        fontSize: 15,
        color: 'red',
    },
})

export default ReadFromDB;