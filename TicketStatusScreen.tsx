// TicketStatusScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from './src/context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { TicketType, RootStackParamList } from './types';
import { getRequests } from './apiService';
import TicketDetailModal from './TicketDetailModal'; // Import the modal component

type TicketStatusScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'TicketRequest'>;
};

const TicketStatusScreen: React.FC<TicketStatusScreenProps> = ({ navigation }) => {
  const { email, userRole } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTickets = async () => {
    try {
      let response;
      if (userRole === 'admin') {
        response = await getRequests(null);
      } else {
        response = await getRequests(email);
      }

      setTickets(response);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTickets();
    }, [email, modalVisible]) // Execute the effect when email changes (screen comes into focus or email changes)
  );

  const handleDetailsPress = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderTicketItem = ({ item }: { item: TicketType }) => {
    return (
      <View style={styles.ticketItem}>
        <Text style={styles.ticketTitle}>{item.title}</Text>
        <Text style={styles.ticketDescription}>Description:</Text>
        <Text style={styles.ticketDescription}>{item.description}</Text>
        <Text>Status: {item.status}</Text>
        {userRole === 'admin' && (
          <Button title="Update Request" onPress={() => handleDetailsPress(item)} />
        )}
        {userRole !== 'admin' && (
          <View>
            <Text style={styles.ticketDescription}>Response from staff</Text>
            <Text style={styles.ticketDescription}>{item.comment}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {tickets.length > 0 ? (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item._id}
          renderItem={renderTicketItem}
        />
      ) : (
        <Text>No tickets available</Text>
      )}
      <TicketDetailModal modalVisible={modalVisible} ticket={selectedTicket} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  ticketItem: {
    width: '90%', // Adjust the width as needed
    marginHorizontal: '10%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ticketDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TicketStatusScreen;
