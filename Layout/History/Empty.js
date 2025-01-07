import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function Empty() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/Drinkingwater.png')} 
        style={styles.image}
      />
      <Text style={styles.text}>Keep Drinking Water</Text>
      <Text style={styles.text}>Records Will Appear Here</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontStyle: 'italic',
    fontSize:20
  },
});
