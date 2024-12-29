import React, { useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')

  useEffect(() => {
    const checkExistingUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData')
        if (userData) {
          const data = JSON.parse(userData)
          if (data.username && data.email && data.dob) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }
        }
      } catch (error) {
        console.log('Error checking existing user:', error)
      }
    }
 
    checkExistingUser()
  }, [navigation])

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify({
        username,
        email,
        dob
      }))
if(username && email && dob){
    navigation.reset({
        index: 1,
        routes: [{ name: 'Home' }],
      })
}
     
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }

  return (
    <ImageBackground 
      source={require('../assets/drinking.jpg')}
      style={styles.backgroundImage}
      resizeMode='cover'
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD-MM-YYYY)"
          value={dob}
          keyboardType='numeric'
          onChangeText={setDob}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  input: {
    width: width * 0.9,
    height: height * 0.06,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: width * 0.01,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: width * 0.04,
    borderRadius: width * 0.01,
    width: width * 0.9,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
})
