import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, Pressable, ScrollView, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import appfirebase from '../../../firebaseconfig';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(appfirebase);

const FormularioHelpdesk = () => {
  // Animaciones
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];
  
  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Función para formatear la fecha (existente)
  const formatearFecha = (fecha: Date) => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const nombreDia = dias[fecha.getDay()];
    const dia = fecha.getDate();
    const nombreMes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    
    return `${nombreDia}, ${dia} ${nombreMes} ${año}`;
  };

  const fechaActual = formatearFecha(new Date());

  // Estado del formulario (existente)
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    departamento: 'TI',
    prioridad: 'Media',
    asunto: '',
    descripcion: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [seleccionActual, setSeleccionActual] = useState('');
  const [tipoSeleccion, setTipoSeleccion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departamentos = ['TI', 'RRHH', 'Finanzas', 'Operaciones', 'Otros'];
  const prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

  // Efecto de color para prioridad
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Baja': return '#4CAF50';
      case 'Media': return '#FFC107';
      case 'Alta': return '#FF9800';
      case 'Crítica': return '#F44336';
      default: return '#555';
    }
  };

  // Resto de las funciones existentes (manejarCambio, abrirSelector, manejarSeleccion, guardarTicket, enviarFormulario)

  return (
    <Animated.View 
      style={[
        estilos.contenedor,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      {/* Encabezado con sombra */}
      <View style={estilos.encabezado}>
        <View style={estilos.tarjetaEncabezado}>
          <Text style={estilos.tituloEncabezado}>NUEVO TICKET DE HELP DESK</Text>
          <Text style={estilos.fechaEncabezado}>{fechaActual}</Text>
        </View>
      </View>

      <View style={estilos.divisor} />

      <ScrollView 
        style={estilos.contenedorFormulario}
        showsVerticalScrollIndicator={false}
      >
        {/* Campo de Nombre con icono */}
        <View style={estilos.grupoFormulario}>
          <View style={estilos.contenedorEtiqueta}>
            <MaterialIcons name="person" size={18} color="#555" style={estilos.icono} />
            <Text style={estilos.etiqueta}>Nombre completo *</Text>
          </View>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={estilos.input}
              value={datosFormulario.nombre}
              onChangeText={(texto) => manejarCambio('nombre', texto)}
              placeholder="Ingrese su nombre completo"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Campo de Email con icono */}
        <View style={estilos.grupoFormulario}>
          <View style={estilos.contenedorEtiqueta}>
            <MaterialIcons name="email" size={18} color="#555" style={estilos.icono} />
            <Text style={estilos.etiqueta}>Correo electrónico *</Text>
          </View>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={estilos.input}
              value={datosFormulario.email}
              onChangeText={(texto) => manejarCambio('email', texto)}
              placeholder="Ingrese su correo electrónico"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Selector de Departamento con estilo mejorado */}
        <View style={estilos.grupoFormulario}>
          <View style={estilos.contenedorEtiqueta}>
            <MaterialIcons name="business" size={18} color="#555" style={estilos.icono} />
            <Text style={estilos.etiqueta}>Departamento</Text>
          </View>
          <TouchableOpacity 
            style={[estilos.botonSelector, estilos.botonSelectorElevado]}
            onPress={() => abrirSelector('departamento')}
            activeOpacity={0.7}
          >
            <Text style={estilos.textoBotonSelector}>{datosFormulario.departamento}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Selector de Prioridad con indicador de color */}
        <View style={estilos.grupoFormulario}>
          <View style={estilos.contenedorEtiqueta}>
            <MaterialIcons name="priority-high" size={18} color="#555" style={estilos.icono} />
            <Text style={estilos.etiqueta}>Prioridad</Text>
          </View>
          <TouchableOpacity 
            style={[
              estilos.botonSelector, 
              estilos.botonSelectorElevado,
              { borderLeftColor: getPriorityColor(datosFormulario.prioridad), borderLeftWidth: 4 }
            ]}
            onPress={() => abrirSelector('prioridad')}
            activeOpacity={0.7}
          >
            <Text style={estilos.textoBotonSelector}>{datosFormulario.prioridad}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Campo de Asunto con icono */}
        <View style={estilos.grupoFormulario}>
          <View style={estilos.contenedorEtiqueta}>
            <MaterialIcons name="title" size={18} color="#555" style={estilos.icono} />
            <Text style={estilos.etiqueta}>Asunto *</Text>
          </View>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={estilos.input}
              value={datosFormulario.asunto}
              onChangeText={(texto) => manejarCambio('asunto', texto)}
              placeholder="Describa brevemente el problema"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Campo de Descripción con contador de caracteres */}
        <View style={estilos.grupoFormulario}>
          <View style={estilos.contenedorEtiqueta}>
            <MaterialIcons name="description" size={18} color="#555" style={estilos.icono} />
            <Text style={estilos.etiqueta}>Descripción detallada *</Text>
          </View>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={[estilos.input, estilos.inputMultilinea]}
              value={datosFormulario.descripcion}
              onChangeText={(texto) => manejarCambio('descripcion', texto)}
              placeholder="Proporcione todos los detalles necesarios"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <Text style={estilos.contadorCaracteres}>
              {datosFormulario.descripcion.length}/500
            </Text>
          </View>
        </View>

        {/* Botón de Enviar con animación de carga */}
        <TouchableOpacity 
          style={[
            estilos.botonEnviar, 
            isSubmitting && estilos.botonEnviarDesactivado
          ]} 
          onPress={enviarFormulario}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={estilos.contenedorBoton}>
              <Text style={estilos.textoBotonEnviar}>ENVIAR TICKET</Text>
              <MaterialIcons name="send" size={20} color="#fff" style={estilos.iconoBoton} />
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal mejorado */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={estilos.fondoModal} 
          onPress={() => setModalVisible(false)}
        >
          <Animated.View 
            style={[
              estilos.contenidoModal,
              {
                transform: [{
                  translateY: modalVisible ? 
                    new Animated.Value(0) : 
                    new Animated.Value(100)
                }]
              }
            ]}
          >
            <Text style={estilos.tituloModal}>
              Seleccionar {tipoSeleccion === 'departamento' ? 'Departamento' : 'Prioridad'}
            </Text>
            <ScrollView>
              {opcionesMostrar.map((opcion) => (
                <Pressable
                  key={opcion}
                  style={({ pressed }) => [
                    estilos.botonOpcion,
                    seleccionActual === opcion && estilos.botonOpcionSeleccionada,
                    pressed && estilos.botonOpcionPresionada
                  ]}
                  onPress={() => manejarSeleccion(opcion)}
                >
                  <Text style={[
                    estilos.textoOpcion,
                    tipoSeleccion === 'prioridad' && { 
                      color: getPriorityColor(opcion),
                      fontWeight: 'bold'
                    }
                  ]}>
                    {opcion}
                  </Text>
                  {seleccionActual === opcion && (
                    <MaterialIcons name="check" size={20} color="#3498db" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={estilos.botonCancelar}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={estilos.textoBotonCancelar}>CANCELAR</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  tarjetaEncabezado: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  encabezado: {
    marginBottom: 8,
  },
  tituloEncabezado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  fechaEncabezado: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  divisor: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  contenedorFormulario: {
    flex: 1,
  },
  grupoFormulario: {
    marginBottom: 20,
  },
  contenedorEtiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icono: {
    marginRight: 8,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  contenedorInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  inputMultilinea: {
    height: 120,
    textAlignVertical: 'top',
  },
  contadorCaracteres: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  botonSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  botonSelectorElevado: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textoBotonSelector: {
    fontSize: 15,
    color: '#333',
  },
  botonEnviar: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  botonEnviarDesactivado: {
    backgroundColor: '#85c1e9',
  },
  contenedorBoton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoBotonEnviar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  iconoBoton: {
    marginLeft: 4,
  },
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  contenidoModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    maxHeight: '60%',
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  botonOpcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  botonOpcionSeleccionada: {
    backgroundColor: '#f5f9ff',
  },
  botonOpcionPresionada: {
    backgroundColor: '#ebf5ff',
  },
  textoOpcion: {
    fontSize: 16,
    color: '#333',
  },
  botonCancelar: {
    marginTop: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  textoBotonCancelar: {
    color: '#555',
    fontWeight: 'bold',
  },
});

export default FormularioHelpdesk;