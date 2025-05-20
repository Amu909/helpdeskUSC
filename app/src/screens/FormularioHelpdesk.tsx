import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../../../scripts/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  nombre: string;
  email: string;
  departamento: string;
  prioridad: string;
  asunto: string;
  descripcion: string;
}

const FormularioHelpdesk: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [seleccionActual, setSeleccionActual] = useState('');
  const [tipoSeleccion, setTipoSeleccion] = useState('');
  
  const [datosFormulario, setDatosFormulario] = useState<FormData>({
    nombre: '',
    email: '',
    departamento: 'TI',
    prioridad: 'Media',
    asunto: '',
    descripcion: '',
  });

  const departamentos = ['TI', 'RRHH', 'Finanzas', 'Operaciones', 'Otros'];
  const prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

  const formatearFecha = (fecha: Date) => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${dias[fecha.getDay()]}, ${fecha.getDate()} ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
  };

  const fechaActual = formatearFecha(new Date());

  const manejarCambio = (nombre: keyof FormData, valor: string) => {
    setDatosFormulario({
      ...datosFormulario,
      [nombre]: valor,
    });
  };

  const abrirSelector = (tipo: string) => {
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

  const validarEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const guardarTicket = async (): Promise<boolean> => {
    try {
      await addDoc(collection(db, 'tickets'), {
        ...datosFormulario,
        fecha: new Date().toISOString(),
        estado: 'Abierto',
        fechaCreacion: new Date().toISOString(),
        ultimaActualizacion: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error al guardar el ticket:", error);
      Alert.alert('Error', 'No se pudo guardar el ticket. Intente nuevamente.');
      return false;
    }
  };

  const enviarFormulario = async () => {
    const { nombre, email, asunto, descripcion } = datosFormulario;

    if (!nombre || !email || !asunto || !descripcion) {
      Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Error', 'Por favor ingrese un correo electrónico válido');
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
    }
  };

  const opcionesMostrar = tipoSeleccion === 'departamento' ? departamentos : prioridades;

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text style={styles.tituloEncabezado}>NUEVO TICKET DE HELP DESK</Text>
        <Text style={styles.fechaEncabezado}>{fechaActual}</Text>
      </View>

      <View style={styles.divisor} />

      <ScrollView style={styles.contenedorFormulario}>
        <View style={styles.grupoFormulario}>
          <Text style={styles.etiqueta}>Nombre completo *</Text>
          <View style={styles.contenedorInput}>
            <TextInput
              style={styles.input}
              value={datosFormulario.nombre}
              onChangeText={(texto) => manejarCambio('nombre', texto)}
              placeholder="Ingrese su nombre completo"
            />
          </View>
        </View>

        <View style={styles.grupoFormulario}>
          <Text style={styles.etiqueta}>Correo electrónico *</Text>
          <View style={styles.contenedorInput}>
            <TextInput
              style={styles.input}
              value={datosFormulario.email}
              onChangeText={(texto) => manejarCambio('email', texto)}
              placeholder="Ingrese su correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.grupoFormulario}>
          <Text style={styles.etiqueta}>Departamento</Text>
          <TouchableOpacity
            style={styles.botonSelector}
            onPress={() => abrirSelector('departamento')}
          >
            <Text style={styles.textoBotonSelector}>{datosFormulario.departamento}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.grupoFormulario}>
          <Text style={styles.etiqueta}>Prioridad</Text>
          <TouchableOpacity
            style={styles.botonSelector}
            onPress={() => abrirSelector('prioridad')}
          >
            <Text style={styles.textoBotonSelector}>{datosFormulario.prioridad}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.grupoFormulario}>
          <Text style={styles.etiqueta}>Asunto *</Text>
          <View style={styles.contenedorInput}>
            <TextInput
              style={styles.input}
              value={datosFormulario.asunto}
              onChangeText={(texto) => manejarCambio('asunto', texto)}
              placeholder="Describa brevemente el problema"
            />
          </View>
        </View>

        <View style={styles.grupoFormulario}>
          <Text style={styles.etiqueta}>Descripción detallada *</Text>
          <View style={styles.contenedorInput}>
            <TextInput
              style={[styles.input, styles.inputMultilinea]}
              value={datosFormulario.descripcion}
              onChangeText={(texto) => manejarCambio('descripcion', texto)}
              placeholder="Proporcione todos los detalles necesarios"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.botonEnviar} onPress={enviarFormulario}>
          <Text style={styles.textoBotonEnviar}>ENVIAR TICKET</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.contenedorModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>
              Seleccionar {tipoSeleccion === 'departamento' ? 'Departamento' : 'Prioridad'}
            </Text>
            {opcionesMostrar.map((opcion) => (
              <Pressable
                key={opcion}
                style={[
                  styles.botonOpcion,
                  seleccionActual === opcion && styles.botonOpcionSeleccionada
                ]}
                onPress={() => manejarSeleccion(opcion)}
              >
                <Text style={styles.textoOpcion}>{opcion}</Text>
                {seleccionActual === opcion && (
                  <MaterialIcons name="check" size={20} color="#3498db" />
                )}
              </Pressable>
            ))}
            <TouchableOpacity
              style={styles.botonCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoBotonCancelar}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#3498db',
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