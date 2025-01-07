import React, { useCallback, useState } from 'react'
import {View ,SafeAreaView,Text} from 'react-native'
import WaterConsumptionScroll from './Graph'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Empty from './Empty'

export default function History() {


const [waterData,setWaterData]=useState([])
const [todayData,setTodayData]=useState()
const FetchData=async()=>{
  const TODAYrecords=await AsyncStorage.getItem('waterRecords')
  const TODAYparsedRecords=TODAYrecords?JSON.parse(TODAYrecords):[]
  setTodayData(TODAYparsedRecords)
  const records=await AsyncStorage.getItem('ALLDAYSRECORDS')
  const parsedRecords=records? JSON.parse(records):[];
  if(TODAYparsedRecords){
    parsedRecords.unshift(TODAYparsedRecords)
  }
  console.log('todayRecords',parsedRecords)
  
  setWaterData(parsedRecords)
}
useFocusEffect(
  React.useCallback(() => {
      FetchData();
  }, [])
);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* <B/> */}
       {
       waterData.length===1&&todayData.length===0?<Empty/>: <WaterConsumptionScroll data={waterData}/>
       }

      </View>
    </SafeAreaView>
  )
}
