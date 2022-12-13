import React, {useEffect, useState} from 'react';
import  {db}  from '../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
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


const ReadFromDB = (onSelectedDepartment) => {

    const[Questions, setQuestions] = useState({});
    const[total, setTotal] = useState(0);
    const[selected, setSelected] = useState([]);

    useEffect(() => {
        readfromDB();
    }, []);

    // const readfromDB = async () =>{
    //     try{
    //         const data = await getDocs(collection(db, "Question",Object.values(onSelectedDepartment).toString(), "Q1"))
    //         setQuestions(data.docs.map(doc => ({...doc.data(), id: doc.id})));

    //         data.forEach((doc) => {
    //             console.log(doc.id, '=>' ,doc.data())
    //         });
    //         console.log(Questions)
    //     }catch(error){
    //         console.log(error.message)
    //     }
    // }

    const readfromDB = async () =>{
        try{
            const data = await getDoc(doc(db, "Question" ,Object.values(onSelectedDepartment).toString()))
            //setQuestions(data.docs.map(doc => ({...doc.data(), id: doc.id})));

            setQuestions(data.data())

            // data.forEach((doc) => {
            //     console.log(doc.id, '=>' ,doc.data())
            // });
            //console.log(Questions)
            //console.log(Object.values(Questions))
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
        console.log(selected)
        //updateDB(answer, question)
    }

    return(
        <ScrollView>

            {Object.entries(Questions).map(([question, answer]) => (
                <View>
                    <Text style={styles.question}>{question}</Text>
                    {Object.entries(answer)
                        //.filter(([key]) => key !=='type') <- key가 'type' 이면 제외, 현재는 쓰이지 않지만 추후 응용 가능
                        .map(([key, value]) => { // key : 1, 2, type
                            switch(value) {
                                case 'textinput':
                                    return <TextInput style={styles.card} placeholder="Fill Out Blank"/>;
                                default:
                                    return (
                                        <TouchableOpacity style={[styles.card, selected[question] === key && styles.selected]} onPress={test(value, question, key)}>
                                            <Text style={styles.answer}>{value}</Text> 
                                        </TouchableOpacity>
                                    );
                                    
      
                            }
                        }
                    )}
                </View>
            ))}
            
            {/* {Questions?.map((question, questionIdx) => {
            return (
                <>
                    <Set_Questions question={question.id} idx={questionIdx} array={Questions} />
                    {Questions?.map((answer, answerIdx) => {
                        return(
                            <Set_Answers answer={answer.id} idx={answerIdx}/>
                        )
                    })}
                    
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
                    
                 </>
                );
            })} */}
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