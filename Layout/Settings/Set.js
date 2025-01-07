import React, { useState,useEffect } from 'react'
import {View,Text,TouchableOpacity, ScrollView, Switch,StyleSheet, Alert, TextInput} from 'react-native'
import {customInTakeGoal, getGender, getWeight, ReminderData,storeName} from '../Logic/StoredValues'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUp from './PopUpREminder';
import PopUpNameChange from './PopUpNameChange';
import PopUpWeight from './PopUpWeight';
import Ringtones from './Ringtones';
import TimeTaking from './TimeTaking';
export default function Settings() {
const [popUp,setPopUp]=useState('none')
const [showNameChange, setShowNameChange] = useState(false);
const [showWeight, setShowWeight] = useState(false);
const [Age,setAge]=useState('')
const navigation=useNavigation();
const [gender,setGender]=useState('')
const [weight,setWeight]=useState('')
const [Name,setName]=useState('')
const [Reminderdata,setReminderdata]=useState(0);
const [IntakeGoal,setIntakeGoal]=useState('')
const [showInputGoal,setShowInputGoal]=useState()
const [showRingtones,setShowRingtones]=useState()
const [showTimeTakingAtWakeUp,setShowTimeTakingAtWakeUp]=useState(false)
const [showTimeTakingAtBadUp,setShowTimeTakingAtBedTime]=useState(false)
const [wakeUpTime,setWakeUpTime]=useState('')
const [bedTime,setBedTime]=useState('')



const setReminderUpdate=async()=>{
  const rdata=await ReminderData(null);
  setReminderdata(rdata)
}
const setIntakeGoalUpdate=async()=>{
  const intakeGoal=await customInTakeGoal(null);
  intakeGoal ? setIntakeGoal(intakeGoal) : setIntakeGoal('Default')
}

const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = async() => {
  setIsEnabled(previousState => !previousState);
await AsyncStorage.setItem('Switch',isEnabled.toString())

}
useEffect(()=>{
if(!isEnabled){
  ReminderData('None')
  console.log('Setted None')
}

},[isEnabled])


const getDetails=async()=>{
  const Gender=await getGender(null);
  const weight=await getWeight();
  const name=await storeName(null);
  const wakeUpTime=await AsyncStorage.getItem("WakeUpTime")
  const bedTime=await AsyncStorage.getItem("BedTime")
  const age=await AsyncStorage.getItem('Age')
  const Switch=await AsyncStorage.getItem('Switch')
  setIsEnabled(Switch!=='true')

  setAge(age)
  setWakeUpTime(wakeUpTime)
  setBedTime(bedTime)
  setName(name.charAt(0).toUpperCase()+name.slice(1))
  setGender(Gender)
  setWeight(weight.charAt(0).toUpperCase()+weight.slice(1))
}



useEffect(()=>{
getDetails();
setIntakeGoalUpdate();


},[])
  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          
          <Text style={styles.headerText}>Reminder Settings</Text>
          
        </View>
        <View style={styles.settingItem}> 
          <Text style={styles.settingText}>Reminder </Text>  
          <Switch
          trackColor={{false: 'red', true: 'green'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        </View>
        <TouchableOpacity onPress={()=>{
          setPopUp('flex')
          }}>
        <View style={[styles.settingItem,{display:isEnabled ?'flex':'none'}]}> 
          <Text style={styles.settingText}>Reminder Schedule</Text>  
        <Text style={styles.settingValue}>{Reminderdata ? Reminderdata==='None'?'None': Reminderdata+" Minutes" :"None"}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowRingtones(true)}>
        <View style={[styles.settingItem,{display:isEnabled ?'flex':'none'}]}>
        <Text style={styles.settingText}>Reminder sound</Text>
          <Text style={styles.settingValue}>Default</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowTimeTakingAtWakeUp(true)}>
        <View style={styles.settingItem}>
        <Text style={styles.settingText}>Wake Up Time</Text>
          <Text style={styles.settingValue}>{wakeUpTime ? wakeUpTime : "Default"}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowTimeTakingAtBedTime(true)}>
        <View style={styles.settingItem}>
        <Text style={styles.settingText}>Bed Time</Text>
          <Text style={styles.settingValue}>{bedTime ? bedTime : "Default"}</Text>
        </View>
        </TouchableOpacity>
      </View>
      
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Personal Information</Text>
        </View>
        <TouchableOpacity onPress={() => setShowNameChange(true)}> 
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Name</Text>
          <Text style={styles.settingValue}>
            {Name}
          </Text>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowWeight(true)}> 
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Weight</Text>
          <Text style={styles.settingValue}>
            {weight ? `${weight} Kg` : ""}
          </Text>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          Alert.alert(`Are You Sure You Want To Change Your ${gender} Gender?`,
             `This action will change your ${gender} to ${gender==='male' ? 'female' :'male'}and update your data.`, [
            {text: "Cancel", style: "cancel"},
            {text: "Change", onPress: async() => {
              setGender(gender==='male' ? 'female' : 'male');
              await AsyncStorage.setItem('Gender',gender==='male' ? 'female' : 'male')
              
            }}
           ])
        }}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Gender</Text>
          <Text style={styles.settingValue}>{gender || ""}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity >
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Age</Text>
          <Text style={styles.settingValue}>{Age+" Years" || ""}</Text>
        </View>
        </TouchableOpacity>
      </View>
      
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>General</Text>
        </View>
        <TouchableOpacity 
          onPress={() => {
            setIntakeGoal('')
            setShowInputGoal(!showInputGoal)
          }}
        > 
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Intake goal</Text>
            <Text style={styles.settingValue}>
              {showInputGoal ? (
                <TextInput 
                  style={styles.input}
                  placeholder='Enter in ml'
                  autoFocus={true}
                  keyboardType="numeric"
                  value={IntakeGoal.toString()}
                  onChangeText={(text) => {
                    setIntakeGoal(text)
                    customInTakeGoal(text)
                  }}
                  onBlur={() => setShowInputGoal(false)}
                />
              ) : IntakeGoal ? IntakeGoal : 'Default'}
            </Text>
          </View> 
        </TouchableOpacity>
        <View style={styles.resetView}>
        <TouchableOpacity onPress={()=>{
          
         Alert.alert("Are You Sure You Want To Reset Your Data?", "This action will remove all your data and reset the app to its initial state.", [
          {text: "Cancel", style: "cancel"},
          {text: "Reset", onPress: () => {
            // ResetData();
            navigation.navigate('FirstPage')
            AsyncStorage.clear();
          }}
         ])

        }}>
              <Text style={styles.reset}>
                Reset 
              </Text>
            </TouchableOpacity>
        </View>
        <PopUp visible={popUp} onClose={()=>setPopUp('none')} setReminderUpdate={ setReminderUpdate()}/>
          
        <PopUpNameChange 
  visible={showNameChange}
  onClose={() => setShowNameChange(false)}
  onSave={async (newName) => {
    await storeName(newName);
    setName(newName.charAt(0).toUpperCase() + newName.slice(1));
    setShowNameChange(false);
  }}
/>
<PopUpWeight 
  visible={showWeight}
  onClose={() => setShowWeight(false)}
  onSave={async (newWeight) => {
    await AsyncStorage.setItem('weight', newWeight);
    setWeight(newWeight.charAt(0).toUpperCase() + newWeight.slice(1));
    setShowWeight(false);
  }}
/>

      </View>

      {showRingtones && (
        <Ringtones callBack={() => setShowRingtones(false)} />
      )}

{showTimeTakingAtWakeUp && <TimeTaking callBack={()=>setShowTimeTakingAtWakeUp(false)} setValue={setWakeUpTime} For="WakeUp"/>}
{showTimeTakingAtBadUp && <TimeTaking callBack={()=>setShowTimeTakingAtBedTime(false)} setValue={setBedTime} For="BedTime"/>}


     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    fontStyle: 'italic',
  },
  settingItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  settingValue: {
    fontSize: 16,
    color: '#1E90FF',
    textAlign: 'right',
    fontWeight: 'bold'
  },
  reset:{
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop:10,
    paddingBottom:10
  },
  input: {
    fontSize: 16,
    color: '#1E90FF',
    textAlign: 'right',
    fontWeight: 'bold',
    width: 100,
  },
})