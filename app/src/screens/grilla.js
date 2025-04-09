// src/screens/Grilla.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, auth } from '../scripts/firebase'; 
import { useNavigation } from '@react-navigation/native';

const Grilla = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, 'tickets'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTickets(fetched);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'crítica':
      case 'critica':
        return '#ff4444';
      case 'alta':
        return '#ff9900';
      case 'media':
        return '#4CAF50';
      case 'baja':
        return '#2196F3';
      default:
        return '#dde';
    }
  };

  const getTextColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'crítica':
      case 'critica':
        return 'white';
      default:
        return '#555';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TicketDetalle', { ticket: item })}>
      <View style={styles.ticketContainer}>
        <View style={styles.ticketHeader}>
          <Text style={styles.ticketId}>#{item.id}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>{item.fecha || 'Sin fecha'}</Text>
        </View>

        <Text style={styles.ticketTitle}>{item.asunto}</Text>

        <View style={styles.ticketFooter}>
          <View>
            <Text style={styles.assignedLabel}>Solicitante:</Text>
            <Text style={styles.assignedUser}>{item.nombre}</Text>
          </View>
          <View style={[styles.statusBox, { backgroundColor: getPriorityColor(item.prioridad) }]}>
            <Text style={{ color: getTextColor(item.prioridad), fontWeight: 'bold' }}>
              {item.prioridad}
            </Text>
          </View>
          <View style={styles.progressBox}>
            <Text style={{ fontWeight: 'bold' }}>{item.departamento}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>GRILLA</Text>
      <Text style={styles.sectionTitle}>Mis Solicitudes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default Grilla;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  ticketContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ticketId: {
    color: '#888',
    fontSize: 12,
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignedLabel: {
    fontSize: 11,
    color: '#999',
  },
  assignedUser: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  statusBox: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  progressBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
