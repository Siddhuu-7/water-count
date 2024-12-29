import React from 'react'
import {ScrollView, Text, Image} from 'react-native'

export default function About({style}) {
  return (
    <ScrollView style={style} contentContainerStyle={{alignItems: 'center', padding: 16}}>
        <Image 
          source={require('../assets/water.webp')} 
          style={{
            width: 350,
            height: 100,
            paddingBottom: 200,
            marginTop: 100,
            paddingRight:100
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
            About:
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24 ,fontStyle:'italic'}}>
            Welcome to our Task Management App! This application helps you organize your daily activities, 
            set priorities, and track your progress effectively. Whether you're managing personal tasks 
            or coordinating team projects, our app provides the tools you need to stay productive and focused.
            {'\n\n'}
            Features include task creation, priority settings, due date management, and progress tracking. 
            Stay organized and never miss a deadline with our intuitive interface and helpful reminders.
            {'\n\n'}
            This was made by me and my name is <Text style={{fontWeight:'bold'}}> Siddharth</Text>
        </Text>
    </ScrollView>
  )
}
