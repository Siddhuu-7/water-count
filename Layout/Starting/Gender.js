import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, SafeAreaView,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { storeName } from '../Logic/StoredValues';


export default function Gender() {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation();
  const [name,setname]=useState('')
  const storeGender = async () => {
    if (!selectedGender) {
      alert('Please select a gender');
      return;
    }
    await AsyncStorage.setItem('Gender', selectedGender);
    navigation.navigate('Weight');
  };
const StoreNameAndGender=async()=>{
  await storeName(name);
  await storeGender();
}
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.contentContainer, { paddingTop: 100 }]}>
          <Text style={styles.title}>Your Gender</Text>
          
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderBox,
                selectedGender === 'male' && styles.selected
              ]}
              onPress={() => setSelectedGender('male')}
              accessible={true}
              accessibilityLabel="Select male gender"
              accessibilityRole="button"
            >
              <Image
                source={require('../../assets/male.jpg')}
                style={styles.genderIcon}
              />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderBox,
                selectedGender === 'female' && styles.selected
              ]}
              onPress={() => setSelectedGender('female')}
              accessible={true}
              accessibilityLabel="Select female gender"
              accessibilityRole="button"
            >
              <Image
                source={require('../../assets/female.jpg')}
                style={styles.genderIcon}
              />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          <View>
        <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#999"
            onChangeText={setname}
            autoFocus={true}
            value={name}
            style={{
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 10,
                borderRadius: 5,
                marginVertical: 10
            }}
        >
        </TextInput>
    </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={StoreNameAndGender}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  genderBox: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    width: '45%',
  },
  selected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  genderIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#007AFF',
  },
  nextButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});