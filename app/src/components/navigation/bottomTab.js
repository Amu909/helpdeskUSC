import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Formu = async() => {
    try{
      props.navigation.navigate('Formulario Helpdesk')
    }catch(error) {
      console.log(error);
    }
  }

  const homeS = async() => {
    try{
      props.navigation.navigate('homeScreen')
    }catch(error) {
      console.log(error);
    }
  }


const BottomTab = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={Formu}>
        <Text>
        <Ionicons name="home" size={40} color="#3498db" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}onPress={homeS}>
        <Text>
          <MaterialIcons name="support-agent" size={40} color="#3498db" />
        </Text>
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
    height: 53,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    zIndex: 999, // aseguramos que esté encima
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomTab;
