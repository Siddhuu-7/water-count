import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getRecords } from './Logic/RecordsLogic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  getwater } from './Logic/StoredValues';

export default function Record({ waterTaken,dayTarget }) {
  const [records, setRecords] = useState([]);
 

  const getNextTime = () => {
    if (records.length === 0) return "12:00 PM"; 
    
    const nextTime = records[records.length - 1].time;
    let [hours, minutes] = nextTime.split(":").map(num => parseInt(num));
    
    minutes += 60; 
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
    
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  const saveRecords = async (recordsToSave) => {
    
    // console.log('recordsTosave',recordsToSave)
    try {
      // const check=await customInTakeGoal();
      // const limit=!check?await getTarget():await customInTakeGoal();
      // recordsToSave.push(limit)
      
      
      await AsyncStorage.setItem('waterRecords', JSON.stringify(recordsToSave));
      
    } catch (error) {
      console.error('Error saving records:', error);
    }
  };

  const loadRecords = async () => {
    try {

      const water = await getwater();
            if(water===0){
                await AsyncStorage.removeItem('waterRecords');
            }
      const savedRecords = await AsyncStorage.getItem('waterRecords');
      // console.log('savedRecords',savedRecords)
      
      if (savedRecords) {
        const parsedRecords = JSON.parse(savedRecords);
        setRecords(Array.isArray(parsedRecords) ? parsedRecords : []);
      }
    } catch (error) {
      console.error('Error loading records:', error);
      setRecords([]);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    if (waterTaken) {
      const newRecord = getRecords(waterTaken);
      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      saveRecords(updatedRecords);
      
      
    }
  }, [waterTaken]);

  const handleDelete = (index) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedRecords = records.filter((_, i) => i !== index);
            setRecords(updatedRecords);
            saveRecords(updatedRecords);
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderRecordItem = (record, index) => (
    <View key={index} style={styles.recordItem}>
      <View style={styles.timeContainer}>
  <Icon name="clock-o" size={20} color="#666" style={styles.clockIcon} />
  <View>
    <Text style={styles.timeText}>{record.time}</Text>
    <Text style={styles.nextTimeText}>
      {record.isNext ? 'Next time' : ''}
    </Text>
  </View>
</View>

      <View style={styles.waterAmountContainer}>
        <Text style={styles.waterAmount}>{record.water} ml</Text>
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => handleDelete(index)}
        >
          <Icon name="trash" size={16} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Today's records</Text>
        <TouchableOpacity style={styles.addButton} 
        onPress={()=>{
          Alert.alert(
            'Add a Record of drinking water in the past that you forgot to confirm',
            '',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: () => {
                  console.log('setted')
                }
              }
            ]
          )
        }}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recordsList}>
        {Array.isArray(records) && records.length > 0 && (
          <View style={styles.timeContainer}>
            <Icon name="clock-o" size={20} color="#666" style={styles.clockIcon} />
            <View>
              <Text style={styles.timeText}>{"Drink Water"}</Text>
              <Text style={styles.nextTimeText}>
                {waterTaken===dayTarget?"Next Session Tommarow": "Next Time Drink After"+getNextTime()}
              </Text>
            </View>
          </View>
        )}
        {Array.isArray(records) ? (
          records.map((record, index) => renderRecordItem(record, index))
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    width: '90%',
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    padding: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  recordsList: {
    gap: 16,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clockIcon: {
    width: 24,
  },
  timeText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  nextTimeText: {
    fontSize: 14,
    color: '#666',
  },
  waterAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 80,
    justifyContent: 'flex-end',
  },
  waterAmount: {
    fontSize: 16,
    color: '#666',
  },
  moreButton: {
    padding: 4,
  },
});