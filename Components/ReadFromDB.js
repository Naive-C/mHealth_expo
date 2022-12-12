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
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        readfromDB();
    }, []);

    const readfromDB = async () =>{
        try{
            const data = await getDocs(collection(db, "Question",Object.values(onSelectedDepartment).toString(), "Q1"))
            setQuestions(data.docs.map(doc => ({...doc.data(), id: doc.id})));

            data.forEach((doc) => {
                console.log(doc.id, '=>' ,doc.data())
            });
            console.log(Questions)
        }catch(error){
            console.log(error.message)
        }
    }

    const updateDB = async (answer, question)=>{
        try{
            await addDoc(collection(db, "answer" ), {
                question: question,
                answer: answer,
              });
              console.log(Questions[2])
          }catch(error){
            console.log(error.message)
          }
      }

    const test = (answer, question, number) => e => {
        console.log(question + " : " + answer)
        setSelected(prevState => ({
            ...prevState,
            [question]: number
        }))
        //updateDB(answer, question)
    }

    const setColor =() => {

    }

    return(
        <ScrollView>
            {Questions?.map((question, idx) => {
            return (
                <>
                    <Text style={styles.question}>{question.id}</Text>
                    <TouchableOpacity style={[styles.card, selected[question.id] === 0 && styles.selected]} onPress={test(Questions[idx][0], question.id, 0)}>
                        <Text style={styles.answer}>{Questions[idx][0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.card, selected[question.id] === 1 && styles.selected]} onPress={test(Questions[idx][1], question.id, 1)}>
                        <Text style={styles.answer}>{Questions[idx][1]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.card, selected[question.id] === 2 && styles.selected]} onPress={test(Questions[idx][2], question.id, 2)}>
                        <Text style={styles.answer}>{Questions[idx][2]}</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity style={[styles.card, selected[question.id] === 3 && styles.selected]} onPress={test(Questions[idx][3], question.id, 3)}>
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
    selected: {
      backgroundColor: 'green',
      shadowColor: 'green',
        shadowOffset: {
          width: 2,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 10,
        borderwidth: 2,
        borderColor:'white',
        padding: 20,
        marginBottom: 10,
        marginHorizontal: 10,  
    },
    answer: {
        fontSize: 15,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default ReadFromDB;