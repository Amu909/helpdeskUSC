import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../scripts/firebase';

const TicketDetalle = ({ route, navigation }) => {
  const [tipoCierre, setTipoCierre] = useState('');
  const [medioAtencion, setMedioAtencion] = useState('');
  const [comentario, setComentario] = useState('');
  const [solucion, setSolucion] = useState('');

  if (!route || !route.params || !route.params.ticket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No se encontró información del ticket.</Text>
      </View>
    );
  }

  const { ticket } = route.params;

  const cerrarTicket = async () => {
    if (!tipoCierre || !medioAtencion || !solucion) {
      Alert.alert('Campos obligatorios', 'Por favor completa todos los campos antes de cerrar el ticket.');
      return;
    }

    try {
      const newTicket = {
        ...ticket,
        tipoCierre,
        medioAtencion,
        comentario,
        solucion,
        fechaCierre: new Date().toISOString(),
        estado: 'Cerrado',
      };

      await setDoc(doc(db, 'tickets_realizados', ticket.id), newTicket);
      await deleteDoc(doc(db, 'tickets', ticket.id));

      Alert.alert('Éxito', 'El ticket ha sido cerrado y archivado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cerrar el ticket.');
    }
  };

  const opcionesTipoCierre = ['Solucionado', 'No Aplica', 'Requiere seguimiento', 'Usuario canceló'];
  const opcionesMedio = ['Telefónico', 'Correo', 'Presencial', 'Chat', 'Remoto'];

  const renderScrollBox = (opciones, seleccion, setSeleccion) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollBox}>
      {opciones.map((opcion, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.scrollItem, seleccion === opcion && styles.scrollItemSelected]}
          onPress={() => setSeleccion(opcion)}
        >
          <Text style={[styles.scrollItemText, seleccion === opcion && styles.scrollItemTextSelected]}>
            {opcion}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Detalles del Ticket</Text>

        <View style={styles.card}>
          <Info label="Asunto" value={ticket.asunto} />
          <Info label="Solicitante" value={ticket.nombre} />
          <Info label="Departamento" value={ticket.departamento} />
          <Info label="Prioridad" value={ticket.prioridad} />
          <Info label="Fecha" value={ticket.fecha || 'Sin fecha'} />
          <Info label="Descripción" value={ticket.descripcion || 'Sin descripción'} />
        </View>

        {/* Tipo de cierre */}
        <Text style={styles.sectionLabel}>Tipo de Cierre *</Text>
        {renderScrollBox(opcionesTipoCierre, tipoCierre, setTipoCierre)}

        {/* Medio de atención */}
        <Text style={styles.sectionLabel}>Medio de Atención *</Text>
        {renderScrollBox(opcionesMedio, medioAtencion, setMedioAtencion)}

        {/* Solución aplicada */}
        <Text style={styles.sectionLabel}>¿Qué se hizo para solucionar? *</Text>
        <TextInput
          placeholder="Describe la solución aplicada"
          style={[styles.input, styles.inputMultiline]}
          value={solucion}
          onChangeText={setSolucion}
          multiline
        />

        {/* Comentario adicional */}
        <Text style={styles.sectionLabel}>Comentario Adicional</Text>
        <TextInput
          placeholder="Observaciones finales (opcional)"
          style={[styles.input, styles.inputMultiline]}
          value={comentario}
          onChangeText={setComentario}
          multiline
        />

        <TouchableOpacity style={styles.closeButton} onPress={cerrarTicket}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.closeButtonText}>Cerrar Ticket</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Info = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default TicketDetalle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#34495e',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 6,
    marginTop: 16,
  },
  scrollBox: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scrollItem: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  scrollItemSelected: {
    backgroundColor: '#2980b9',
  },
  scrollItemText: {
    fontSize: 13,
    color: '#333',
  },
  scrollItemTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 10,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 30,
    gap: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
