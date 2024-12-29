import React from 'react'
import { View ,Text,StyleSheet,Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification() {
  const waterReminders = [
    "Stay hydrated! Time for water.",
    "Water is essential for your health.",
    "Remember to drink water regularly!",
    "Take a water break now.",
    "Hydration check! Have you had enough water?",
  ];

  const notificationData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('waterTaken');
      const value = await AsyncStorage.getItem('dailyWaterLimit');
      return {
        storedValue: Number(storedValue),
        value: Number(value)
      };
    } catch (error) {
      console.log(error);
      return { storedValue: 0, value: 0 };
    }
  }

  const [notification, setNotification] = React.useState({ storedValue: 0, value: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentReminder, setCurrentReminder] = React.useState('');

  const showRandomReminder = () => {
    const randomIndex = Math.floor(Math.random() * waterReminders.length);
    setCurrentReminder(waterReminders[randomIndex]);
    setIsVisible(true);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await notificationData();
      setNotification(data);
    };
    fetchData();

    const getRandomInterval = () => Math.floor(Math.random() * (3600000 - 1800000) + 1800000);

    showRandomReminder();

    const intervalId = setInterval(() => {
      showRandomReminder();
    }, getRandomInterval());

    const hideNotification = () => {
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    if (isVisible) {
      hideNotification();
    }

    return () => clearInterval(intervalId);
  }, []);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.notificationBox}>
        <Text style={styles.notificationText}>
          {notification.storedValue === notification.value 
            ? "You've Reached Today's Limit!" 
            : currentReminder}
        </Text>
        <Button 
          title='✕' 
          color="#FF6B6B"
          onPress={() => setIsVisible(false)}
        />
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    margin:10,
  },
  notificationBox: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
    flex: 1,
    marginRight: 10,
  }
})
