import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';

import Set_Answers from './Set_Answers';

const Set_Questions = (props) => {

    const[Questions, setQuestions] = useState();
    const[gender, setGender] = useState('');
    const[name, setName] = useState('');
    const[firstName, setFirstName] = useState('');
    const[id, setID] = useState('');

    const[isChecked, setChecked] = useState(false);

    console.log("question: ", props.id)

    return(
        <View>
            <Text>Question : {props.id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default Set_Questions;