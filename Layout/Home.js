import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DailyTarget from './DailyTarget';
import { StatusBar } from 'react-native';
// import {FontAwesome} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  const navigation = useNavigation();
  

    
  

  return (
    
    <View style={styles.container}>
      <StatusBar barStyle="white" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>
          <Icon name='home' size={20} color='white'/>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.buttonText}>
            <Icon name='history' size={20} color='white'/> Anyalsis</Text>
            
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>
          <Icon name='cog' size={20} color='white'/>Setting</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text>Home Content</Text>
        <DailyTarget  />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F5FFFA'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    paddingTop: 5,
    paddingBottom: 10,
  },
  headerButton: {
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection:'row',
    
    alignItems:'center',
    paddingTop:5
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
