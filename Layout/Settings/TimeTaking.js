import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  
  Modal,
} from 'react-native';

const TimeTaking = ({callBack,setValue,For}) => {
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [modalVisible, setModalVisible] = useState(false);

  const StoreTime = async (Time) => {
    console.log(Time);
    if (For === "WakeUp") {
      await AsyncStorage.setItem("WakeUpTime", Time);
    } else {
      await AsyncStorage.setItem('BedTime', Time);
    }
  };

  const hoursArray = Array.from({ length: 24 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutesArray = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleHourChange = (hour) => {
    setHours(hour);
  };

  const handleMinuteChange = (minute) => {
    setMinutes(minute);
  };

  const ItemSeparator = () => <View style={styles.separator} />;

useEffect(()=>{
    setModalVisible(true)

    // callBack()
})
  return (
    <View style={styles.container}>
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Time Picker</Text>
            </View>

            <View style={styles.pickerContainer}>
              {/* Hours Picker */}
              <View style={styles.scrollContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  decelerationRate="fast"
                >
                  <View style={styles.paddingView} />
                  {hoursArray.map((hour) => (
                    <TouchableOpacity
                      key={hour}
                      style={[
                        styles.timeItem,
                        hours === hour && styles.selectedItem
                      ]}
                      onPress={() => handleHourChange(hour)}
                    >
                      <Text style={[
                        styles.timeText,
                        hours === hour && styles.selectedText
                      ]}>
                        {hour}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <View style={styles.paddingView} />
                </ScrollView>
              </View>

              <Text style={styles.separator}>:</Text>

              {/* Minutes Picker */}
              <View style={styles.scrollContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  decelerationRate="fast"
                >
                  <View style={styles.paddingView} />
                  {minutesArray.map((minute) => (
                    <TouchableOpacity
                      key={minute}
                      style={[
                        styles.timeItem,
                        minutes === minute && styles.selectedItem
                      ]}
                      onPress={() => handleMinuteChange(minute)}
                    >
                      <Text style={[
                        styles.timeText,
                        minutes === minute && styles.selectedText
                      ]}>
                        {minute}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <View style={styles.paddingView} />
                </ScrollView>
              </View>
            </View>

            <View style={styles.selectedTimeContainer}>
              <Text style={styles.selectedTimeText}>
                Selected Time: {hours}:{minutes}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                callBack();
                const Time = hours + ":" + minutes;
                StoreTime(Time);
                setValue(Time);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 150,
    width: 60,
  },
  paddingView: {
    height: 50,
  },
  timeItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: '#f3f4f6',
  },
  timeText: {
    fontSize: 18,
    color: '#4b5563',
  },
  selectedText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  separator: {
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  periodButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  periodButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTimeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedTimeText: {
    fontSize: 16,
    color: '#4b5563',
  },
//   openButton: {
//     backgroundColor: '#2563eb',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   openButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//   },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TimeTaking;