// TicketStatusScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from './src/context/AuthContext';
import { getRequests } from './apiService';


const TicketStatusScreen = () => {
    // const [tickets, setTickets] = useState<{ id: string; title: string; description: string }[]>([]);
    
  const [tickets, setTickets] = useState([]);

  const { email, userRole } = useAuth(); // Use the useAuth hook
  const fetchTickets = async () => {
    try {
        let response;
        console.log(userRole);
        console.log(userRole == "admin");
        if (userRole == "admin") {
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
    }, [email]) // Execute the effect when email changes (screen comes into focus or email changes)
  );


//   useEffect(() => {
//     // Fetch user's tickets from the backend
//     // Replace this with actual API call or data retrieval logic
//     setTickets(dummyTickets);
//   }, []);

  const renderTicketItem = ({ item }: { item: { _id: string; title: string; email: string; description: string; status: string } }) => (
    <View style={styles.ticketItem}>
      <Text style={styles.ticketTitle}>{item.title}</Text>
      <Text style={styles.ticketDescription}>{item.description}</Text>
      {/* <Text>ID: {item._id}</Text> */}
      {/* <Text>Email: {item.email}</Text>*/}
      <Text>Status: {item.status}</Text>
      {/* <Text>Created At: {item.createdAt}</Text> */}
      {/* Add more details as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Status</Text>
      {tickets.length > 0 ? (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item._id}
          renderItem={renderTicketItem}
        />
      ) : (
        <Text>No tickets available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ticketItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 12,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ticketDescription: {
    fontSize: 16,
  },
});

export default TicketStatusScreen;
