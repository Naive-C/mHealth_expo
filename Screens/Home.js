import React, {useState, useRef, useEffect} from 'react';
import {Text, TextInput, View, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  {Picker}  from '@react-native-picker/picker';
import  {db}  from '../firebaseConfig';
import { addDoc, collection,  getDocs} from "firebase/firestore"; 

const Home = (userInfo) => {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [department, setDepartment] = useState([]);
const [checkedGender, setCheckedGender] = useState('Male');
const [isChecked, setChecked] = useState(true);
const [selectedDepartment, setSelectedDepartment] = useState("Nurse");
const [userId, setUserId] = useState("")


const firstInput = useRef();
const secondInput = useRef();
const thirdInput = useRef();

// 최초 앱 실행 시 DB에 사용자 인적사항을 DB에 저장. 모두 공백으로 저장됨
useEffect(() => {
    readDepartment();
    addtoDB();
  }, []);

const isTextInputEmpty = () => {
    // 사용자가 입력하지 않을 시 다음 화면으로 넘어가지지 않음
    if(!firstName.trim()) {
        alert('Please Enter First Name')
        return;
    }
    if(!lastName.trim()) {
        alert('Please Enter Last Name')
        return;
    }
    if(!weight.trim()) {
        alert('Please Enter Weight')
        return;
    }
    if(!height.trim()) {
        alert('Please Enter Height')
        return;
    }
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
  //DB에 저장되어 있는 학과의 이름을 불러옴
  const readDepartment = async () =>{
    try{
        const data = await getDocs(collection(db, "Question"))

        setDepartment(data.docs.map(doc => ({id: doc.id})))
        console.log(department)

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
                <View style={styles.labelContainer}>
                    <Icon name="face-man" size={30} color="black"/>
                    <Text style={styles.label}>Name</Text>
                </View>
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
                <View style={styles.labelContainer}>
                    <Icon name="human-male-height" size={30} color="black"/>
                    <Text style={styles.label}>Height</Text>
                </View>
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
                <View style={styles.labelContainer}>
                    <Icon name="weight-kilogram" size={30} color="black"/>
                    <Text style={styles.label}>Weight</Text>
                </View>
               
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
            <View style={styles.labelContainer}>
                <Icon name="gender-male-female" size={30} color="black"/>
                <Text style={styles.label}>Gender</Text>  
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.checkboxCardContainer}>
                    <TouchableOpacity style={[checkedGender === 'Male' ? {...styles.genderCard, backgroundColor:"#0074D9", shadowColor:"#0074D9"} : styles.genderCard]} onPress={()=>setCheckedGender('Male')}>
                        <Icon style={styles.icon} name="gender-male" size={40} color={checkedGender === 'Male' ? "white" : "#0074D9"}/>
                        {/* 남성 */}
                        <Text style={checkedGender === 'Male' ? {...styles.genderLabel, color: 'white'} : styles.genderLabel }>Male</Text>
                    </TouchableOpacity>
      
         
                    <TouchableOpacity style={[checkedGender === 'Female' ? {...styles.genderCard, backgroundColor:"#ff4c4c", shadowColor:"#ff4c4c"} : styles.genderCard]} onPress={()=>setCheckedGender('Female')}>
                        <Icon style={styles.icon} name="gender-female" size={40} color={checkedGender === 'Female' ? "white" : "red"}/>
                            {/* 여성 */}
                            <Text style={checkedGender === 'Female' ? {...styles.genderLabel, color: 'white'} : styles.genderLabel }>Female</Text>
                            
                    </TouchableOpacity>
                    </View>    
            </View>
            {/* 학과 */}
            <View style={styles.labelContainer}>
                <Icon name="office-building" size={30} color="black"/>
                <Text style={styles.label}>Department</Text>  
            </View>
            <View style={styles.card}>
                <View>
                    <Picker
                        style={styles.picker}
                        numberOfLines = '1'
                        selectedValue={selectedDepartment}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedDepartment(itemValue)}
                    >
                        {department?.map((department, idx) => {
                            return(
                                <Picker.Item label={department.id} value={department.id}/>
                            );
                        })}
                    </Picker>
                </View>
            </View>
            <TouchableOpacity style={styles.submitCard} onPress={isTextInputEmpty}>
                <Text style={styles.submitLabel}>Submit</Text>
            </TouchableOpacity>
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
    labelContainer: {
        alignItems: 'center',
        justifyContent: 'flexStart',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        margin: 10
    },
    checkboxCardContainer: {
        flexDirection: 'row',
        margin: 10,
    },
    cardContainer: {
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
        flexDirection:'row',
        justifyContent: 'center',
      },  
    checkbox: {
        alignSelf: "center",
    },
    genderLabel: {
        margin: 8,
        fontSize: 26,
        fontWeight: "600",
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderCard: {
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
        padding: 15,
        marginBottom: 5,
        marginHorizontal: 10,
        fontWeight: "600",
        flexDirection: 'row',
        justifyContent: 'center',
        width:'45%',
      },
    label: {
        marginHorizontal: 5,
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 10,
    },
    icon: {
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 5,
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
      submitLabel: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
})

export default Home;