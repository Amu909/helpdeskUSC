import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NewTicketScreen = ({ navigate }) => {  // Cambiado de navigation a navigate
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Soporte Técnico',
    priority: 'Media',
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false); // Nuevo estado para modal
  const [showPriorityModal, setShowPriorityModal] = useState(false); // Nuevo estado para modal

  const categories = ['Soporte Técnico', 'Hardware', 'Software', 'Redes', 'Otro'];
  const priorities = ['Baja', 'Media', 'Alta', 'Urgente'];

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
      return;
    }

    Alert.alert('Éxito', 'Ticket creado correctamente', [
      { 
        text: 'OK', 
        onPress: () => navigate('Home') // Cambiado de navigation.goBack() a navigate('Home')
      }
    ]);
    
    console.log('Datos del ticket:', formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Ticket</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => handleChange('title', text)}
          placeholder="Describa brevemente el problema"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Proporcione todos los detalles necesarios"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoría</Text>
        <TouchableOpacity 
          style={styles.selectContainer}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={styles.selectedValue}>{formData.category}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#7f8c8d" />
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Prioridad</Text>
        <View style={styles.priorityContainer}>
          {priorities.map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                formData.priority === priority && styles.priorityButtonSelected
              ]}
              onPress={() => handleChange('priority', priority)}
            >
              <Text style={[
                styles.priorityText,
                formData.priority === priority && styles.priorityTextSelected
              ]}>
                {priority}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Ticket</Text>
      </TouchableOpacity>

      {/* Modal para categorías */}
      {showCategoryModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Categoría</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                onPress={() => {
                  handleChange('category', category);
                  setShowCategoryModal(false);
                }}
              >
                <Text>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowCategoryModal(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
  },
  selectedValue: {
    fontSize: 14,
    color: '#2c3e50',
  },
  priorityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priorityButton: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  priorityButtonSelected: {
    backgroundColor: '#3498db',
  },
  priorityText: {
    color: '#2c3e50',
    fontSize: 12,
    fontWeight: '500',
  },
  priorityTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalCancel: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default NewTicketScreen;