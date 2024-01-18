// TicketStatusScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Dummy data for testing purposes
const dummyTickets = [
  { id: '1', title: 'Issue 1', description: 'Description for issue 1' },
  { id: '2', title: 'Issue 2', description: 'Description for issue 2' },
  // Add more ticket objects as needed
];

const TicketStatusScreen = () => {
    const [tickets, setTickets] = useState<{ id: string; title: string; description: string }[]>([]);


  useEffect(() => {
    // Fetch user's tickets from the backend
    // Replace this with actual API call or data retrieval logic
    setTickets(dummyTickets);
  }, []);

  const renderTicketItem = ({ item }: { item: { id: string; title: string; description: string } }) => (
    <View style={styles.ticketItem}>
      <Text style={styles.ticketTitle}>{item.title}</Text>
      <Text style={styles.ticketDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Status</Text>
      {tickets.length > 0 ? (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
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
