import React, {useEffect, useState} from 'react';
import  {db}  from '../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import {View, TextInput, Button, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { addDoc, collection, getDoc, doc,} from "firebase/firestore"; 

const SetQuestion = (userDepartment) => {

    const[Questions, setQuestions] = useState({});
    const[selected, setSelected] = useState([]);
    const[filled, setFilled] = useState([]);
    const[temp, setTemp] = useState("");

    useEffect(() => {
        console.log(Object.values(userDepartment).toString())
        readfromDB();
    }, []);

    const readfromDB = async () =>{
        try{
            const data = await getDoc(doc(db, "Question" ,Object.values(userDepartment).toString()))
            setQuestions(data.data())

        }catch(error){
            console.log(error.message)
        }
    }

    const answerSendtoDB = async (filled, selected) => {
        try{
            await addDoc(collection(db, "answer" ), {
                question: question,
                answer: answer,
              });
          }catch(error){
            //console.log(error.message)
          }
      }

    const saveSelectedAnswer = (question, answer, number) => e => {
        console.log(question + " : " + answer)
        setSelected(prevQuestions => ({
            ...prevQuestions,
            [question]: number
        }))
        console.log(selected)

    }

    const saveFilledText = (question, answer) => e => {
        console.log(question + " : " + answer)
        setFilled(prevQuestions => ({
            ...prevQuestions,
            [question] : answer
        }))
        onsole.log(filled)
    }

    return(
        <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset = {100}          
        >
        <ScrollView>
            {Object?.entries(Questions).map(([question, answer]) => (
                <View>
                    <Text style={styles.questionLabel}>{question}</Text>
                    {Object.entries(answer)
                        //.filter(([key]) => key !=='type') // <- key가 'type' 이면 제외, 현재는 쓰이지 않지만 추후 응용 가능
                        .map(([key, value]) => { // key : 1, 2, type
                            switch(value) {
                                case 'textinput':
                                    return (
                                            <TextInput 
                                                style={styles.inputContainer}
                                                placeholder="Blank"
                                                returnKeyType="done"
                                                value={filled}
                                                onChangeText={setTemp}
                                                onSubmitEditing={saveFilledText(question, temp)}
                                                />
                                        
                                    );            
                                default:
                                    return (
                                        <TouchableOpacity style={[styles.card, selected[question] === key && styles.selectedCard]} onPress={saveSelectedAnswer(question, value, key)}>
                                            <Text style={[styles.answerLabel, selected[question] === key && styles.selectedAnswerLabel]}>{value}</Text> 
                                        </TouchableOpacity>
                                    );
                            }
                        }
                    )}
                </View>
            ))}
            <Button title="Submit" onPress={answerSendtoDB(filled, selected)}/>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
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
    selectedCard: {
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
    selectedAnswerLabel: {
        color: 'white',
        fontWeight: '600',
    },
    questionLabel: {
        marginHorizontal: 15,
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 10,
    },
    answerLabel: {
        fontSize: 15,
    },
    inputContainer: {
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
        paddingTop: 20,
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 10,
        flex: 1,
    },
    input:{
        width:'100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default SetQuestion;