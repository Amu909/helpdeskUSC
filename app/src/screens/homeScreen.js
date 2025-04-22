import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HelpDeskScreen = () => {
  return (
    <ImageBackground 
      source={require('../components/assets/helpdesk-bg')} 
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="help-outline" size={32} color="#fff" />
          <Text style={styles.title}>Help Desk</Text>
          <Text style={styles.subtitle}>Support</Text>
        </View>

        {/* Contenido principal */}
        <View style={styles.content}>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget libero feugiat, 
            faucibus libero id, scelerisque quam.
          </Text>
        </View>

        {/* Botón de acción */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4CAF50', // Verde USC (ajusta según branding)
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HelpDeskScreen;