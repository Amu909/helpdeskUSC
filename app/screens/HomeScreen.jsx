import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigate }) => {
  // Datos de ejemplo para tickets
  const tickets = [
    {
      id: '1',
      title: 'No puedo iniciar sesión en el sistema',
      date: '15 Ago 2023',
      status: 'Abierto',
      priority: 'Alta'
    },
    {
      id: '2',
      title: 'Problema con la impresora',
      date: '14 Ago 2023',
      status: 'En progreso',
      priority: 'Media'
    },
    {
      id: '3',
      title: 'Solicitud de acceso a carpeta',
      date: '10 Ago 2023',
      status: 'Cerrado',
      priority: 'Baja'
    }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.ticketCard}
      onPress={() => navigate('TicketDetail', { ticket: item })}
    >
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>{item.title}</Text>
        <Text style={styles.ticketDate}>{item.date}</Text>
      </View>
      <View style={styles.ticketFooter}>
        <View style={[
          styles.statusBadge,
          item.status === 'Abierto' && styles.statusOpen,
          item.status === 'En progreso' && styles.statusProgress,
          item.status === 'Cerrado' && styles.statusClosed
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <Text style={styles.priorityText}>Prioridad: {item.priority}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Contenido principal con ScrollView */}
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mis Tickets</Text>
          <TouchableOpacity 
            style={styles.newTicketButton}
            onPress={() => navigate('NewTicket')}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.newTicketText}>Nuevo Ticket</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false} // Desactiva el scroll de FlatList
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: 60, // Espacio para la Navbar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  newTicketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  newTicketText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  ticketCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketHeader: {
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  ticketDate: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#e74c3c20',
  },
  statusProgress: {
    backgroundColor: '#f39c1220',
  },
  statusClosed: {
    backgroundColor: '#2ecc7120',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  priorityText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});

export default HomeScreen;