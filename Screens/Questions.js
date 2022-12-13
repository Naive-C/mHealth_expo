import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import  {db}  from '../firebaseConfig';
import { doc,updateDoc, getDoc} from "firebase/firestore"; 

import SetQuestion from '../Components/SetQuestion';

const Questions = (userInfo) => {
  const[Questions, setQuestions] = useState({});
  const[selected, setSelected] = useState([]);
  const[filled, setFilled] = useState([]);
  const[temp, setTemp] = useState("");

  // Submit 버튼을 누를 때 마다 수정된 사항이 적용됨.
  useEffect(() => {
    console.log(userDepartment)
    updateDB(userId);
    readfromDB();
  }, []);

  const readfromDB = async () =>{
    try{
        const data = await getDoc(doc(db, "Question" ,userDepartment))
        setQuestions(data.data())

    }catch(error){
        console.log(error.message)
    }
}

  const updateDB = async (id, filled, selected)=>{
    try{
      const docRef = doc(db, "User", id);
      await updateDoc(docRef, {
        FirstName: userFirstName,
        LastName: userLastName,
        Height: userHeight,
        Weight: userWeight,
        Gender: userGender,
        Department: userDepartment,
      });
    }catch(error){
      console.log(error.message)
    }
  }

  const updateAnswerDB = async (filled, selected) => {
    try{
      const docRef = doc(db, "User", userId);
      await updateDoc(docRef, {
        Filled: filled,
        Selected: selected,
      });
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
  const userId = params? params.userId:null

  return(
    <View>
      {/* <Text>User First Name : {JSON.stringify(userFirstName)}</Text>
      <Text>User Last Name : {JSON.stringify(userLastName)}</Text>
      <Text>User Height : {JSON.stringify(userHeight)}</Text>
      <Text>User Weight : {JSON.stringify(userWeight)}</Text>
      <Text>User Gender : {JSON.stringify(userGender)}</Text>
      <Text>User Gender : {JSON.stringify(userDepartment)}</Text> */}
      <SetQuestion  Questions={Questions} onUpdateAnswerDB={updateAnswerDB} selected={selected} setSelected={setSelected} filled={filled} setFilled={setFilled} temp={temp} setTemp={setTemp}/>
    </View>       
  );
}

const styles = StyleSheet.create({

})

export default Questions;