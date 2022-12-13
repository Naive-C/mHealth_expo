import React, {useState, useRef, useEffect} from 'react';
import {Text, Button, TextInput, View, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import  {Picker}  from '@react-native-picker/picker';
import  {db}  from '../firebaseConfig';
import { addDoc, collection,  } from "firebase/firestore"; 

const Home = (userInfo) => {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [checkedGender, setCheckedGender] = useState('Male');
const [selectedDepartment, setSelectedDepartment] = useState("Nurse");
const [userId, setUserId] = useState("")

const firstInput = useRef();
const secondInput = useRef();
const thirdInput = useRef();

// 최초 앱 실행 시 DB에 사용자 인적사항을 DB에 저장. 모두 공백으로 저장됨
useEffect(() => {
    addtoDB();
  }, []);

const isTextInputEmpty = () => {
    // 사용자가 입력하지 않을 시 다음 화면으로 넘어가지지 않음
    // if(!firstName.trim()) {
    //     alert('Please Enter First Name')
    //     return;
    // }
    // if(!lastName.trim()) {
    //     alert('Please Enter Last Name')
    //     return;
    // }
    // if(!weight.trim()) {
    //     alert('Please Enter Weight')
    //     return;
    // }
    // if(!height.trim()) {
    //     alert('Please Enter Height')
    //     return;
    // }
        userInfo.navigation.navigate("Questions", {
            userFirstName: firstName,
            userLastName: lastName,
            userHeight: height,
            userWeight: weight,
            userGender: checkedGender,
            userDepartment: selectedDepartment,
            userId: userId,
    });
}

const addtoDB = async ()=>{
    try{
      const docRef = await addDoc(collection(db, "User"), {
        FirstName: firstName,
        LastName: lastName,
        Height: height,
        Weight: weight,
        Gender: checkedGender,
        Department: selectedDepartment,
      });
      setUserId(docRef.id)
      }catch(error){
        console.log(error.message)
      }
  }

    return(
        <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset = {100}    
        >
        <ScrollView>
                {/* 이름 */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.card}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                    autoFocus = {true}
                    returnKeyType='next'
                    onSubmitEditing={()=> firstInput.current.focus()}   // 작성이 완료되면 'firstInput'이라는 ref를 가지는 TextInput으로 넘어감
                />
                {/* 성 */}
                <TextInput
                    style={styles.card}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                    returnKeyType='next'

                    ref={firstInput}
                    onSubmitEditing={()=> secondInput.current.focus()}
                />
                {/* 키 */}
                <Text style={styles.label}>Height</Text>
                <TextInput
                    style={styles.card}
                    value={height}
                    onChangeText={setHeight}
                    placeholder="cm"
                    keyboardType='number-pad'
                    maxLength = "3"
                    returnKeyType='done'

                    ref={secondInput}
                    onSubmitEditing={()=> thirdInput.current.focus()}
                />
                {/* 몸무게 */}
                <Text style={styles.label}>Weight</Text>
                <TextInput
                    style={styles.card}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="kg"
                    keyboardType='number-pad'
                    maxLength = "3"
                    returnKeyType='done'

                    ref={thirdInput}
                />
            {/* 성별 */}
            <Text style={styles.label}>Gender</Text>
            <View style={styles.card}>
                <View style={styles.container}>
                    <View style={styles.checkboxContainer}>
                        <Icon style={styles.icon} name="man" size={25} color="blue"/>
                        {/* 남성 */}
                        <Text style={styles.genderLabel}>Male</Text>
                        <RadioButton
                            value ='Male'
                            status = {checkedGender === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => 
                                setCheckedGender('Male')
                            }
                        />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Icon style={styles.icon} name="woman" size={25} color="red"/>
                        {/* 여성 */}
                        <Text style={styles.genderLabel}>Female</Text>
                        <RadioButton
                            value ='Female'
                            status = {checkedGender === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedGender('Female')}
                        />
                    </View>
                </View>
            </View>
            {/* 학과 */}
            <Text style={styles.label}>Department</Text>
            <View style={styles.card}>
                <View>
                    <Picker
                        style={styles.picker}
                        numberOfLines = '1'
                        selectedValue={selectedDepartment}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedDepartment(itemValue)
                    }>
                        <Picker.Item label="Nurse" value="Nurse"/>
                        <Picker.Item label="Psychology" value="Psychology"/>
                    </Picker>
                </View>
            </View>
            <View style={styles.submitCard}>
                <Button title="Submit" color="white" onPress={isTextInputEmpty}/>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>       
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        margin: 10
    },
    checkbox: {
        alignSelf: "center",
    },
    genderLabel: {
        margin: 8,
        fontSize: 15,
        fontWeight: "600",
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        marginHorizontal: 10,
        fontWeight: "600",
        fontSize: 15
    },
    icon: {
        justifyContent: 'center',
        marginTop: 5
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
        fontWeight: "600",
      },
      picker: {
        height: 80,
        justifyContent: 'center',
      },
      submitCard: {
        backgroundColor: '#7522D7',
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
        fontWeight: "600",
      },
})

export default Home;