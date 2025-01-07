import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import maleweight from '../../assets/weight.jpg';
// import femaleweight from '../../assets/femaleweight.jpg';
export default function Weight() {
  const [weight, setWeight] = useState(60);
    const navigation=useNavigation();
    const[Gender,setGender]=useState('');

const setgender=async()=>{
  try{
    const gender=await AsyncStorage.getItem('Gender')
    setGender(gender)
    
  }catch(error){
    console.error(error)
  }

}
useEffect(()=>{
setgender();

},[])

    const StoreWeight=async()=>{
await AsyncStorage.setItem('weight',weight.toString());
navigation.navigate('Preparation');

    }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container,{paddingTop:150}]}>
        <Text style={styles.title}>Select Your Weight</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={Gender==='male'? require('../../assets/maleweight.jpg') :require('../../assets/femaleweight.jpg')}
              style={[styles.image]}
            />
          </View>

          <View style={styles.weightSelector}>
            <Text style={styles.label}>Weight kg</Text>
            <View style={styles.pickerContainer}>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {Array.from({ length: 150 }, (_, i) => i + 30).map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => setWeight(num)}
                    style={[
                      styles.weightOption,
                      weight === num && styles.selectedWeight
                    ]}
                  >
                    <Text
                      style={[
                        styles.weightText,
                        weight === num && styles.selectedWeightText
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
            </View>

            <View style={styles.selectedDisplay}>
              <Text style={styles.selectedWeightDisplay}>
                Selected Weight: {weight} kg
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        onPress={StoreWeight}
        style={styles.nextButton}>
        <Text style={styles.nextButtonText}>
          Next
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  imageContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight:30
  },
  image: {
    width:"100%",
    height: "50%",
    resizeMode: 'contain',
  },
  weightSelector: {
    flex: 0.6,
    height: '80%',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
  },
  pickerContainer: {
    height: 200,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  weightOption: {
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
  },
  selectedWeight: {
    backgroundColor: '#007AFF',
  },
  weightText: {
    fontSize: 18,
    color: '#333',
  },
  selectedWeightText: {
    color: '#fff',
    fontWeight: '600',
  },
  selectedDisplay: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedWeightDisplay: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  nextButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 100,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});