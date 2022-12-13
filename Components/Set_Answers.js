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


const Set_Answers = (props) => {

    return(
        <View>
            <Text>{props.answer}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default Set_Answers;