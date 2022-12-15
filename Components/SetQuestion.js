import React, {useEffect, useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {View, TextInput, Button, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SetQuestion = ({Questions, selected, setSelected, filled, setFilled, temp, setTemp, onUpdateAnswerDB}) => {

    //const[Questions, setQuestions] = useState({});
    // const[selected, setSelected] = useState([]);
    // const[filled, setFilled] = useState([]);
    // const[temp, setTemp] = useState("");

    useEffect(() => {
        //console.log(Object.values(userDepartment).toString())
        //readfromDB();
    }, []);

    // const readfromDB = async () =>{
    //     try{
    //         const data = await getDoc(doc(db, "Question" ,Object.values(userDepartment).toString()))
    //         setQuestions(data.data())

    //     }catch(error){
    //         console.log(error.message)
    //     }
    // }


    const answerSendtoDB = () => {
        onUpdateAnswerDB(filled, selected)
        console.log("Done")
    }

    const saveSelectedAnswer = (question, answer) => e => {
        console.log(question + " : " + answer)
        setSelected(prevQuestions => ({
            ...prevQuestions,
            [question]: answer
        }))
        console.log(selected)
    }

    const saveFilledText = (question, answer) => e => {
        console.log(question + " : " + answer)
        setFilled(prevQuestions => ({
            ...prevQuestions,
            [question] : answer
        }))
        console.log(filled)
    }

    return(
        <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset = {100}          
        >
        <ScrollView>
            {Object?.entries(Questions).map(([question, answer]) => (
                <View>
                    {/*질문*/}
                    <View style={styles.labelContainer }>
                        <Icon name={"chat-question"} size={30}/>
                        <Text style={styles.questionLabel}>{question}</Text>
                    </View>
                    {Object.entries(answer)
                        //.filter(([key]) => key !=='type') // <- key가 'type' 이면 제외
                        .map(([key, value]) => { // key : 1, 2, type
                            switch(value) {
                                /* 답변 */
                                case 'textinput':
                                    return (
                                        <View>
                                            <TextInput 
                                                style={styles.inputContainer}
                                                placeholder="Blank"
                                                returnKeyType="done"
                                                value={filled}
                                                onChangeText={setTemp}
                                                onEndEditing={saveFilledText(question, temp)}
                                                />
                                        </View>  
                                    );            
                                default:
                                    return (
                                        <TouchableOpacity style={[styles.card, selected[question] === value && styles.selectedCard]} onPress={saveSelectedAnswer(question, value)}>
                                            <Text style={[styles.answerLabel, selected[question] === value && styles.selectedAnswerLabel]}>{value}</Text> 
                                        </TouchableOpacity>
                                    );
                            }
                        }
                    )}
                </View>
            ))}
            <TouchableOpacity style={styles.submitCard} onPress={answerSendtoDB}>
                <Text style={styles.submitLabel}>Submit</Text>
            </TouchableOpacity>
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
    submitCard: {
        backgroundColor: '#111111',
        shadowColor: '#111111',
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
        fontWeight: "600",
      },
    selectedCard: {
      backgroundColor: '#4ca64c',
      shadowColor: '#4ca64c',
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
    questionLabel: {
        marginLeft: 5,
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 10,
    },
    answerLabel: {
        fontSize: 17,
    },
    selectedAnswerLabel: {
        color: 'white',
        fontWeight: '700',
    },
    submitLabel: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
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
    labelContainer: {
        alignItems: 'center',
        justifyContent: 'flexStart',
        flexDirection: 'row',
        marginHorizontal: 10,
    },

})

export default SetQuestion;