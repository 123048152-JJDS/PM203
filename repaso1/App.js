/*Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import RegistroScreen from './screens/registroScreen';

/*Zona 2: Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>

      <RegistroScreen></RegistroScreen>

      <StatusBar style="auto" />

    </View>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
