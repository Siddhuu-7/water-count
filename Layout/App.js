import React from 'react'
import {  View, StyleSheet, ImageBackground } from 'react-native'
import Days from './Days'
import { Button ,NotificationIconButton} from './Buttons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './Profile'
import { useNavigation } from '@react-navigation/native' 
import WaterCircle from './WaterCircle'
import SetLimit  from './SetLimit'
import Notification from './Notification'
import Login from './Login'
import Settings from './Settings'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import Graphs from './Graphs'


export default function App() {
  const Stack = createNativeStackNavigator(); 
  
  return (
    <View style={{flex: 1}}>  
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          headerTransparent: true, 
          headerStyle: {
            backgroundColor: 'transparent',  
          },
          headerTintColor: '#000',  
        }}>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Graphs' component={Graphs}/>
          <Stack.Screen name="SetLimit" component={SetLimit} />

          <Stack.Screen 
            name='Profile' 
            component={Profile}
            options={({ navigation }) => ({
              headerRight: () => (
                <NotificationIconButton 
                  name="gear" 
                  callback={() => navigation.navigate('Settings')}
                />
              ),
            })}
          />
          <Stack.Screen name='Notification' component={Notification}/>
          <Stack.Screen name='Settings' component={Settings}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const HomeScreen = () => {
  const navigation = useNavigation(); 

  React.useEffect(() => {
    
    navigation.setOptions({
      headerRight: () => (
        <NotificationIconButton 
          name="bell" 
          style={{color:'black'}}
          callback={() => {
            navigation.navigate('Notification')
            
          }} 
        />

      ),
    });
    // navigation.setOptions({
    //   headerRight:()=>{
    //     <OutButton name="Settings" callback={()=>{
    //             navigation.navigate('Settings')
    //         }}/>
    //   }
    // })
  }, [navigation]);

  return (
    <ImageBackground 
      source={require('../assets/HomeBackGround.jpg')}
      style={[styles.container,{opacity:0.5}]}
    >
      <View style={styles.contentContainer}>
        <Days/>
        <WaterCircle/>
        
        <View style={styles.buttonRow}>
          <View style={styles.leftButton}>
            <Button name={'home'} callback={() => navigation.navigate('Home')}/>
          </View>

                    <View style={styles.leftButton}>
                      <Button name={'area-chart'} callback={()=>navigation.navigate('Graphs')}/>
                    </View>
          <View style={styles.rightButton}>
            <Button name={'user'} callback={() => navigation.navigate('Profile')}/>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'lightblue'
  },
  leftButton: {
    flex: 1,
    marginRight: 10,
    padding: 20,
  },
  rightButton: {
    flex: 1,
    marginLeft: 10,
    padding: 20,
  }
});
