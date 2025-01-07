import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
const navigation=useNavigation();

const storeAge=async()=>{
  await AsyncStorage.setItem('Age',age.toString());
  console.log(age)
  navigation.navigate('Gender')
}
  useEffect(() => {
    if (day && month && year) {
      calculateAge();
    }
  }, [day, month, year]);

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(`${year}-${month}-${day}`);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge > 0 ? calculatedAge : 0); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Age</Text>

      <Text style={styles.subText}>
        Enter your birthdate, and we will calculate your age for hydration advice.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Day"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={setDay}
        />
        <TextInput
          style={styles.input}
          placeholder="Month"
          keyboardType="numeric"
          maxLength={2}
          value={month}
          onChangeText={setMonth}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          keyboardType="numeric"
          maxLength={4}
          value={year}
          onChangeText={setYear}
        />
      </View>

      {age !== null && (
        <Text style={styles.resultText}>
          Your calculated age: <Text style={styles.age}>{age}</Text> years old
        </Text>
      )}
      <View style={{position:'absolute',bottom:30,right:30}}>
      <TouchableOpacity onPress={async()=>{

        
        if(day>31){
          setDay('')
          setAge('Not Valid')
          Alert.alert('Please enter valid day')
          return
        }else if(month>12){
          setMonth('')
          setAge('Not Valid')
          Alert.alert('Please enter valid month')
          return
        }else if(year>2025||year<1950){
          setYear('')
          setAge('Not Valid')
          Alert.alert('Please enter valid year')
          return
        }else{
          
            await storeAge()
          
        }
        
        // console.log(age)
      }}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: '#000000',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  age: {
    fontWeight: 'bold',
    color: 'blue',
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
});
