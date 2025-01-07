import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function PopUpNameChange({ visible, onClose, onSave }) {
  const [newName, setNewName] = useState('');

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Name</Text>
          
          <TextInput
            style={styles.customInput}
            placeholder="Enter new name"
            value={newName}
            autoFocus={true}
            onChangeText={setNewName}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => {
                if (newName.trim()) {
                  onSave(newName);
                  setNewName('');
                  onClose();
                }
              }}
            >
              <Text style={styles.confirmText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setNewName('');
                onClose();
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
  customInput: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  confirmButton: {
    flex: 1,
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
  cancelButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 5,
  },
  cancelText: {
    color: '#FF0000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
