// TicketDetailModal.tsx
import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { TicketType } from './types';
import { uupdateRequest } from './apiService';
type TicketDetailModalProps = {
modalVisible: boolean
  ticket: TicketType | null;
  onClose: () => void;
};

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ modalVisible, ticket, onClose }) => {
    // const [visible, setVisible] = useState(true);
  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Ticket Details</Text>
        {ticket && (
          <>
            <Text>Title: {ticket.title}</Text>
            <Text>Description: {ticket.description}</Text>
            <Text>Status: {ticket.status}</Text>
            {/* Add more details as needed */}
          </>
        )}
        <Button title="Close" onPress={onClose} />
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
});

export default TicketDetailModal;
