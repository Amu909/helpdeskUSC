import { Text, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { auth } from '../../../firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';



export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logeo = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Iniciando sesión', 'Accediendo...');
      props.setIsLoggedIn(true); // Aquí activamos el login
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Credenciales inválidas');
    }
    
  };

  const registro = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('¡Registro exitoso!', 'Sesión iniciada');
      props.setIsLoggedIn(true); 
    } catch (error) {
      console.log(error);
      Alert.alert('Error al registrar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../components/assets/images/helpdesk.jpg')}
        style={styles.profile}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido Verifica tu identidad para continuar</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Correo institucional</Text>
          <TextInput
            placeholder="correo@usc.edu.co"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={logeo}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonreg} onPress={registro}>
          <Text style={styles.buttonText}>Registro</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#f8f9fa',
  },
  profile: {
    width: 100, height: 100, borderRadius: 50,
    marginBottom: 20, borderWidth: 2, borderColor: '#3498db',
  },
  card: {
    width: '100%', backgroundColor: '#ffffff',
    borderRadius: 10, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 5, elevation: 8,
  },
  title: {
    fontSize: 22, fontWeight: '600', textAlign: 'center',
    marginBottom: 20, color: '#343a40',
  },
  inputGroup: { marginBottom: 15 },
  label: { marginBottom: 5, color: '#495057', fontWeight: '500' },
  input: {
    backgroundColor: '#e9ecef', borderRadius: 8,
    paddingVertical: 10, paddingHorizontal: 15,
    fontSize: 16, color: '#212529',
  },
  button: {
    backgroundColor: '#3498db', paddingVertical: 15,
    borderRadius: 8, marginTop: 10, alignItems: 'center',
  },

  buttonreg: {
    backgroundColor: '#e31300', paddingVertical: 15,
    borderRadius: 8, marginTop: 10, alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});
