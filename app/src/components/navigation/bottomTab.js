import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomTab = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Text>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Nuevo</Text>
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
    zIndex: 999, // aseguramos que esté encima
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomTab;
