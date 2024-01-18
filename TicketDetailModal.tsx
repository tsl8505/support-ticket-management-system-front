// TicketDetailModal.tsx
import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { TicketType } from './types';
import { updateRequest } from './apiService'
import DropDownPicker from 'react-native-dropdown-picker';
type TicketDetailModalProps = {
modalVisible: boolean
  ticket: TicketType | null;
  onClose: () => void;
};

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ modalVisible, ticket, onClose }) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(ticket?.status);
  const [comment, setComment] = useState('');
  const items = [
    {label: 'New', value: 'new'},
    {label: 'In Progress', value: 'in progress'},
    {label: 'Resolved', value: 'resolved'}
  ];

  useEffect(() => {
    setValue(ticket?.status);
  }, [ticket]);

  
    const handleStatusUpdate = async () => {
        try {
          if (ticket) {
            const ticketId = ticket._id;
            // Call the updateRequest function to update the ticket status
            await updateRequest(ticketId, value, comment);
            // Do something after successful status update
          }
        } catch (error) {
          // Handle error
          console.error('Error updating ticket status:', error);
        } finally {
          // Close the modal whether the update succeeds or fails
          onClose();
        }
      };
  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Ticket Details</Text>
        {ticket && (
          <>
            <Text>Title: {ticket.title}</Text>
            <Text>Description: {ticket.description}</Text>
            <Text>Status: {ticket.status}</Text>
            <DropDownPicker
              open={open}
              value={value || null}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
            />
            <TextInput
              placeholder="Add a comment..."
              value={comment}
              onChangeText={(text) => setComment(text)}
              style={styles.commentInput}
            />
            
            {/* Add more details as needed */}
          </>
        )}
        <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleStatusUpdate}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 16,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  }, button: {
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  closeButton: {
    backgroundColor: 'red',
  },
  submitButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default TicketDetailModal;
