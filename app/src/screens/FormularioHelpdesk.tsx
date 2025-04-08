import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import { appfirebase } from '../../../firebaseconfig';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";

const db= getFirestore(appfirebase)

const FormularioHelpdesk = () => {
  // Función para formatear la fecha 
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

  const departamentos = ['TI', 'RRHH', 'Finanzas', 'Operaciones', 'Otros'];
  const prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

  const manejarCambio = (nombre: string, valor: string) => {
    setDatosFormulario({
      ...datosFormulario,
      [nombre]: valor,
    });
  };

  const abrirSelector = (tipo: React.SetStateAction<string>) => {
    setTipoSeleccion(tipo);
    setSeleccionActual(tipo === 'departamento' ? datosFormulario.departamento : datosFormulario.prioridad);
    setModalVisible(true);
  };

  const manejarSeleccion = (valor: string) => {
    if (tipoSeleccion === 'departamento') {
      manejarCambio('departamento', valor);
    } else {
      manejarCambio('prioridad', valor);
    }
    setModalVisible(false);
  };

  
  
  const guardarTicket = async () => {
    try {
      await addDoc(collection(db, 'tickets'), {
        ...datosFormulario,
        fecha: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error al guardar el ticket:", error);
      return false;
    }
  };
  
  const enviarFormulario = async () => {
    if (!datosFormulario.nombre || !datosFormulario.email || !datosFormulario.asunto || !datosFormulario.descripcion) {
      Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
      return;
    }
  
    const exito = await guardarTicket();
  
    if (exito) {
      Alert.alert('Éxito', 'Su ticket ha sido enviado correctamente');
      setDatosFormulario({
        nombre: '',
        email: '',
        departamento: 'TI',
        prioridad: 'Media',
        asunto: '',
        descripcion: '',
      });
    } else {
      Alert.alert('Error', 'Hubo un problema al enviar el ticket. Intente nuevamente.');
    }
  };
  
  const opcionesMostrar = tipoSeleccion === 'departamento' ? departamentos : prioridades;

  return (
    <View style={estilos.contenedor}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <Text style={estilos.tituloEncabezado}>NUEVO TICKET DE HELP DESK</Text>
        <Text style={estilos.fechaEncabezado}>{fechaActual}</Text>
      </View>

      <View style={estilos.divisor} />

      <ScrollView style={estilos.contenedorFormulario}>
        {/* Campo de Nombre */}
        <View style={estilos.grupoFormulario}>
          <Text style={estilos.etiqueta}>Nombre completo *</Text>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={estilos.input}
              value={datosFormulario.nombre}
              onChangeText={(texto) => manejarCambio('nombre', texto)}
              placeholder="Ingrese su nombre completo"
            />
          </View>
        </View>

        {/* Campo de Email */}
        <View style={estilos.grupoFormulario}>
          <Text style={estilos.etiqueta}>Correo electrónico *</Text>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={estilos.input}
              value={datosFormulario.email}
              onChangeText={(texto) => manejarCambio('email', texto)}
              placeholder="Ingrese su correo electrónico"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Selector de Departamento */}
        <View style={estilos.grupoFormulario}>
          <Text style={estilos.etiqueta}>Departamento</Text>
          <TouchableOpacity 
            style={estilos.botonSelector}
            onPress={() => abrirSelector('departamento')}
          >
            <Text style={estilos.textoBotonSelector}>{datosFormulario.departamento}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Selector de Prioridad */}
        <View style={estilos.grupoFormulario}>
          <Text style={estilos.etiqueta}>Prioridad</Text>
          <TouchableOpacity 
            style={estilos.botonSelector}
            onPress={() => abrirSelector('prioridad')}
          >
            <Text style={estilos.textoBotonSelector}>{datosFormulario.prioridad}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Campo de Asunto */}
        <View style={estilos.grupoFormulario}>
          <Text style={estilos.etiqueta}>Asunto *</Text>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={estilos.input}
              value={datosFormulario.asunto}
              onChangeText={(texto) => manejarCambio('asunto', texto)}
              placeholder="Describa brevemente el problema"
            />
          </View>
        </View>

        {/* Campo de Descripción */}
        <View style={estilos.grupoFormulario}>
          <Text style={estilos.etiqueta}>Descripción detallada *</Text>
          <View style={estilos.contenedorInput}>
            <TextInput
              style={[estilos.input, estilos.inputMultilinea]}
              value={datosFormulario.descripcion}
              onChangeText={(texto) => manejarCambio('descripcion', texto)}
              placeholder="Proporcione todos los detalles necesarios"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Botón de Enviar */}
        <TouchableOpacity style={estilos.botonEnviar} onPress={enviarFormulario}>
          <Text style={estilos.textoBotonEnviar}>ENVIAR TICKET</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para selección */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.contenedorModal}>
          <View style={estilos.contenidoModal}>
            <Text style={estilos.tituloModal}>
              Seleccionar {tipoSeleccion === 'departamento' ? 'Departamento' : 'Prioridad'}
            </Text>
            {opcionesMostrar.map((opcion) => (
              <Pressable
                key={opcion}
                style={[
                  estilos.botonOpcion,
                  seleccionActual === opcion && estilos.botonOpcionSeleccionada
                ]}
                onPress={() => manejarSeleccion(opcion)}
              >
                <Text style={estilos.textoOpcion}>{opcion}</Text>
                {seleccionActual === opcion && (
                  <MaterialIcons name="check" size={20} color="#3498db" />
                )}
              </Pressable>
            ))}
            <TouchableOpacity
              style={estilos.botonCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={estilos.textoBotonCancelar}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
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
    marginBottom: 16,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  contenedorInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
  },
  inputMultilinea: {
    height: 100,
    textAlignVertical: 'top',
  },
  botonSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  textoBotonSelector: {
    fontSize: 15,
    color: '#333',
  },
  botonEnviar: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  textoBotonEnviar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contenedorModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contenidoModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  botonOpcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  botonOpcionSeleccionada: {
    backgroundColor: '#f5f9ff',
  },
  textoOpcion: {
    fontSize: 16,
    color: '#333',
  },
  botonCancelar: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  textoBotonCancelar: {
    color: '#555',
    fontWeight: 'bold',
  },
});

export default FormularioHelpdesk;