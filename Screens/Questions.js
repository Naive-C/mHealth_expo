import React, {useState} from 'react';
import {Text, Button, TextInput, View, StyleSheet, ScrollView} from 'react-native';
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

import ReadFromDB from '../Components/ReadFromDB';
import Set_Questions from '../Components/Set_Questions';

const Questions = (userInfo) => {

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

  const {params} = userInfo.route
  const userFirstName = params? params.userFirstName:null;
  const userLastName = params? params.userLastName:null;
  const userHeight = params? params.userHeight:null;
  const userWeight = params? params.userWeight:null;
  const userGender = params? params.userGender:null;
  const userDepartment = params? params.userDepartment:null

  return(
    <View>
      {/* <Text>User First Name : {JSON.stringify(userFirstName)}</Text>
      <Text>User Last Name : {JSON.stringify(userLastName)}</Text>
      <Text>User Height : {JSON.stringify(userHeight)}</Text>
      <Text>User Weight : {JSON.stringify(userWeight)}</Text>
      <Text>User Gender : {JSON.stringify(userGender)}</Text>
      <Text>User Gender : {JSON.stringify(userDepartment)}</Text> */}
        <ReadFromDB onSelectedDepartment={userDepartment} />
    </View>       
  );
}

const styles = StyleSheet.create({

})

export default Questions;