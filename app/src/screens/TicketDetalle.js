import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../scripts/firebase';

const TicketDetalle = ({ route, navigation }) => {
  // Validación por si no llegan los parámetros
  if (!route || !route.params || !route.params.ticket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No se encontró información del ticket.</Text>
      </View>
    );
  }

  const { ticket } = route.params;

  const cerrarTicket = async () => {
    try {
      await updateDoc(doc(db, 'tickets', ticket.id), {
        estado: 'Cerrado'
      });
      Alert.alert('Éxito', 'El ticket ha sido cerrado.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar el ticket.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Ticket</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Asunto:</Text>
        <Text style={styles.value}>{ticket.asunto}</Text>

        <Text style={styles.label}>Solicitante:</Text>
        <Text style={styles.value}>{ticket.nombre}</Text>

        <Text style={styles.label}>Departamento:</Text>
        <Text style={styles.value}>{ticket.departamento}</Text>

        <Text style={styles.label}>Prioridad:</Text>
        <Text style={styles.value}>{ticket.prioridad}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{ticket.fecha || 'Sin fecha'}</Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{ticket.descripcion || 'Sin descripción'}</Text>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={cerrarTicket}>
        <Ionicons name="checkmark-done" size={20} color="#fff" />
        <Text style={styles.closeButtonText}>Cerrar Ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TicketDetalle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#16a085',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    gap: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
