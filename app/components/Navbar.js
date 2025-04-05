import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Navbar = ({ navigate }) => {  // Cambiado de navigation a navigate
  const [menuVisible, setMenuVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const navItems = [
    { id: 1, text: 'Inicio', icon: 'home', screen: 'Home' },
    { id: 2, text: 'Nuevo Ticket', icon: 'add-circle-outline', screen: 'NewTicket' },
    { id: 3, text: 'Mis Tickets', icon: 'list-alt', screen: 'MyTickets' },
    { id: 4, text: 'Notificaciones', icon: 'notifications', screen: 'Notifications' },
    { id: 5, text: 'Perfil', icon: 'person', screen: 'Profile' },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegación principal */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>HELPDESK</Text>
        
        {/* Menú para pantallas grandes (md en adelante) */}
        {screenWidth >= 768 && (
          <View style={styles.desktopMenu}>
            {navItems.map(item => (
              <TouchableOpacity 
                key={item.id}
                style={styles.navItem}
                onPress={() => {
                  navigate(item.screen);
                  setMenuVisible(false);
                }}
              >
                <MaterialIcons name={item.icon} size={20} color="#fff" />
                <Text style={styles.navText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Botón de menú hamburguesa para móviles */}
        {screenWidth < 768 && (
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <MaterialIcons 
              name={menuVisible ? 'close' : 'menu'} 
              size={28} 
              color="#fff" 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Menú móvil desplegable */}
      {menuVisible && screenWidth < 768 && (
        <View style={styles.mobileMenu}>
          {navItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.mobileItem}
              onPress={() => {
                navigate(item.screen);
                setMenuVisible(false);
              }}
            >
              <MaterialIcons name={item.icon} size={24} color="#2c3e50" />
              <Text style={styles.mobileText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 60,
  },
  logo: {
    color: '#3498db',
    fontSize: 22,
    fontWeight: 'bold',
  },
  desktopMenu: {
    flexDirection: 'row',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  navText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  menuButton: {
    padding: 5,
  },
  mobileMenu: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    top: 60,
    left: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingVertical: 10,
  },
  mobileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mobileText: {
    color: '#2c3e50',
    marginLeft: 15,
    fontSize: 16,
  },
});

export default Navbar;