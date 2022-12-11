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

    const onToggle = (id, question) => async e =>{
        const data = await getDocs(collection(db, "Question",Object.values(onSelectedDepartment).toString(), "Q1"))
        setQuestions(data.docs.map(doc => doc.id === id ? {...doc.data(), id: doc.id, checked: !doc.checked} : doc));
        console.log(Questions)
        test(id, question)
    };

    const test = (answer, question) => e => {
        console.log(question + " : " + answer)
    }

    return(
        <ScrollView>
            {Questions?.map((question, idx) => {
            return (
                <>
                    <Text style={styles.question}>{question.id}</Text>
                    <TouchableOpacity>
                        <Text style={styles.answer} onPress={test(Questions[idx][0], question.id)}>{Questions[idx][0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.answer} onPress={test(Questions[idx][1], question.id)}>{Questions[idx][1]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.answer} onPress={test(Questions[idx][2], question.id)}>{Questions[idx][2]}</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity>
                        <Text style={styles.answer} onPress={test(Questions[idx][3], question.id)}>{Questions[idx][3]}</Text>
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
        fontSize: 30,
    },
    answer: {
        fontSize: 20,
        marginTop: 8,
    },
})

export default ReadFromDB;