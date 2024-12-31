import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export function Button({ name, callback }) {  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {
        callback();  
        console.log(name);  
      }}>
        <Text style={styles.buttonText}>
          {"   "}<Icon 
            name={name} 
            size={24} 
            color={'#000000'} 
            style={{ marginLeft: 20 }}
          />  
        </Text>
      </TouchableOpacity>
    </View>
  );
}



export function NotificationIconButton({ name, callback ,style}) {
  return (
    <TouchableOpacity style={{ marginRight: 15 }}>
     <Text>
     <Icon 
        name={name} 
        size={24} 
        // color={'blue'} 
        style={style}
        onPress={() => {
          callback();
           console.log(name)
        }}
      />
     </Text>
    </TouchableOpacity>
  );
}



export  function OutButton({name,callback,style,navigation}){
return(
  <TouchableOpacity onPress={callback} style={style}>
    <Text style={{textAlign:'center'}}>{name}</Text>
  </TouchableOpacity>
)
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor:'blue'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'red',
    fontSize: 16,
  },
});
