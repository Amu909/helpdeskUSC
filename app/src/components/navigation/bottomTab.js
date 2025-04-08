import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const BottomTab = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Text>
        <Ionicons name="home" size={40} color="#3498db" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
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
