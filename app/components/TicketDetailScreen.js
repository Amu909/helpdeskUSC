import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TicketDetailScreen = ({ route }) => {
  const { ticket } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text>Fecha: {ticket.date}</Text>
      <Text>Estado: {ticket.status}</Text>
      <Text>Prioridad: {ticket.priority}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  }
});

export default TicketDetailScreen;