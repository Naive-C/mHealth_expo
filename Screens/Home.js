import React, {useState, useRef} from 'react';
import {Text, Button, TextInput, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import  {Picker}  from '@react-native-picker/picker';

const Home = (userInfo) => {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [checkedGender, setCheckedGender] = useState('Male');
const [checkedRace, setCheckedRace] = useState([]);
const [selectedDepartment, setSelectedDepartment] = useState("Nurse");

const firstInput = useRef();
const secondInput = useRef();
const thirdInput = useRef();

const isTextInputEmpty = () => {
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
    });
}

    return(
        <View>
            <View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.card}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                    autoFocus = {true}
                    returnKeyType='next'
                    onSubmitEditing={()=> firstInput.current.focus()}
                />
                <TextInput
                    style={styles.card}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                    returnKeyType='next'

                    ref={firstInput}
                    onSubmitEditing={()=> secondInput.current.focus()}
                />
            </View>
            
            <View>
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
            </View>
            
            <View>
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
            </View>
            
            {/* <Text>Race: </Text>
            <TouchableOpacity>
                <View>
                    <Icon name=""/>
                </View>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isAsian}
                        onValueChange={setAsian}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Asian</Text>
                    <Checkbox
                        value={isBlack}
                        onValueChange={setBlack}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Black</Text>
                    <Checkbox
                        value={isWhite}
                        onValueChange={setWhite}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>White</Text>
                    <Checkbox
                        value={isHispanic}
                        onValueChange={setHispanic}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Hispanic</Text>
                    <Checkbox
                        value={isOtherRace}
                        onValueChange={setOtherRace}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Other</Text>
                </View>
            </View> */}
            <Text style={styles.label}>Gender</Text>
            <View style={styles.card}>
                <View style={styles.container}>
                    <View style={styles.checkboxContainer}>
                        <Icon style={styles.icon} name="man" size={25} color="blue"/>
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
                        <Text style={styles.genderLabel}>Female</Text>
                        <RadioButton
                            value ='Female'
                            status = {checkedGender === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedGender('Female')}
                        />
                    </View>
                </View>
            </View>

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
           
            
        </View>       
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