import React, { useState } from 'react'
import { TextInput,View } from 'react-native'

export default function Name() {
    const [name,setname]=useState('')
  return (
    <View>
        <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#999"
            onChangeText={setname}
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
  )
}
