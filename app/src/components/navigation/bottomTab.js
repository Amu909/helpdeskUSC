import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const BottomTab = () => {
  const navigation = useNavigation();

  const goToFormulario = () => {
    navigation.navigate('Formulario Helpdesk');
  };

  const goToHome = () => {
    navigation.navigate('homeScreen');
  };

  const goToGrilla = () =>{
    navigation.navigate('grilla')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={goToHome}>
        <Ionicons name="home" size={30} color="#3498db" />
        <Text style={styles.label}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={goToFormulario}>
        <MaterialIcons name="support-agent" size={30} color="#3498db" />
        <Text style={styles.label}>Helpdesk</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={goToGrilla}>
      <FontAwesome5 name="list-alt" size={30} color="#3498db" />
        <Text style={styles.label}>Grilla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    zIndex: 999,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#333',
  },
});

export default BottomTab;
