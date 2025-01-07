import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';

const PopUpWeight = ({ visible, onClose, onSave, initialWeight }) => {
  const [weight, setWeight] = useState(initialWeight || '');

  const handleWeightChange = (text) => {
    
    const numericValue = text.replace(/[^0-9.]/g, '');
    setWeight(numericValue);
  };

  const handleSave = () => {
    onSave(weight);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Enter Weight</Text>
          <TextInput
            style={styles.input}
            value={weight.toString()}
            autoFocus={true}
            onChangeText={handleWeightChange}
            keyboardType="numeric"
            placeholder="Enter weight"
            maxLength={5}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#1E90FF',color:'#fff'}]} onPress={handleSave}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    
    minWidth: 80,
    alignItems: 'center',
  },
});

export default PopUpWeight;
