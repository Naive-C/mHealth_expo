import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import ReadFromDB from './Components/ReadFromDB';

export default function App() {
  const [addName, setAddName] = useState('');
  const [addAge, setAddAge] = useState('');
  const [id, setID] = useState('');

  const deletefromDB = async ()=>{
    try{
      const docRef = doc(db, "user", id);
      await deleteDoc(docRef);
      alert("Deleted!!")
      readfromDB()
    }catch(error){
      console.log(error.message)
    }
  }

  const updateDB = async ()=>{
    try{
      const docRef = doc(db, "user", id);
      await updateDoc(docRef, {
        addName: addName,
        addAge: addAge
      });
      alert("Updated!!")
      readfromDB()
    }catch(error){
      console.log(error.message)
    }
  }

  const queryDB = async ()=>{
    try{
      const q = await query(collection(db, "user" ), where('addName',"==","test23"))
      const singleDoc = await getDocs(q);
      console.log(singleDoc)
    }catch(error){
      console.log(error.message)
    }
  }

  const readfromDB = async ()=>{
    try{
      const data = await getDocs(collection(db, "Question/Psychology/Q1"))
      //const data = await getDocs(collection(db, "user" ))
      setQuestions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
        addName: addName,
        addAge: addAge,
        createdAt: new Date(),
      });
      alert("Added!!")
      setAddName("")
      setAddAge("")
    }catch(error){
      console.log(error.message)
    }
  }

  return (
    <View>
      <TextInput
        placeholder="name"
        value={addName}
        onChangeText={setAddName}
      />
      <TextInput
        placeholder="age"
        value={addAge}
        onChangeText={setAddAge}
      />
      <Button title="Add Text" onPress={addtoDB} />
      <ReadFromDB/>
      <Button title="Update Text" onPress={updateDB} />
      <TextInput
        placeholder="Updata ID"
        value={id}
        onChangeText={setID}
      />
      <TextInput
        placeholder="name"
        value={addName}
        onChangeText={setAddName}
      />
      <TextInput
        placeholder="age"
        value={addAge}
        onChangeText={setAddAge}
      />
      <Button title="Delete Text" onPress={deletefromDB} />
      <TextInput
        placeholder="Delete ID"
        value={id}
        onChangeText={setID}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
