
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import {ReminderData} from '../Logic/StoredValues'
export default function PopUp({ visible, onClose,setReminderUpdate }) {
  const [showCustom, setShowCustom] = React.useState(false);
  const [ReminderOptions,setReminderOptions]=React.useState('60')
  const reminderOptions = ['None','Every 30 minutes', 'Every 1 hour', 'Every 2 hours', 'Custom'];
const setReminder=async()=>{
    await ReminderData(ReminderOptions)
    setReminderUpdate();
}
  return (
    <Modal
      transparent={true}
      visible={visible === 'flex'}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Reminder Schedule</Text>
          
          {reminderOptions.map((option, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.optionButton}
              onPress={() => {
                if(option==='Every 30 minutes'){
                    setReminderOptions('30')
                    setShowCustom(true);
                }else if(option==='Every 1 hour'){
                    setReminderOptions('60')
                    setShowCustom(true);
                }else if(option==='Every 2 hours'){
                    setReminderOptions('120')
                    setShowCustom(true);
                }else if (option === 'Custom') {
                
                    setReminderOptions('')
                  setShowCustom(true);
                } else if(option==='None'){
                    setReminderOptions('None')
                    setShowCustom(true);
                 
                }else{
                  onClose();
                }
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {showCustom && (
            <View style={styles.customContainer}>
              <TextInput
                style={styles.customInput}
                placeholder="Enter minutes"
                keyboardType="numeric"
                value={ReminderOptions}
                onChangeText={setReminderOptions}
              />
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={() => {
                  if (ReminderOptions) {
                    // Handle custom time here
                    setReminder();
                    
                    onClose();
                  }
                }}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  customContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
    paddingTop: 15,
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
  },
  confirmText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
