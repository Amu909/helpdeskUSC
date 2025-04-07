// src/screens/Login.tsx
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

export function login() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../components/assets/helpdesk.jpg')}
        style={styles.profile}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Correo institucional</Text>
          <TextInput
            placeholder="correo@usc.edu.co"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="password"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    profile: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: '#007bff',
    },
    card: {
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 20,
      color: '#343a40',
    },
    inputGroup: {
      marginBottom: 15,
    },
    label: {
      marginBottom: 5,
      color: '#495057',
      fontWeight: '500',
    },
    input: {
      backgroundColor: '#e9ecef',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      color: '#212529',
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 15,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  