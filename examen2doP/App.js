/*Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TarjetaProductos } from './components/tarjetaProductos'; // con llaves porque es export nombrada

/*Zona 2: Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>
      <TarjetaProductos nombre="Producto 1" marca="Marca 1" precio={100} />
      <TarjetaProductos nombre="Producto 2" marca="Marca 2" precio={200} />
      <TarjetaProductos nombre="Producto 3" marca="Marca 3" precio={300} />
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
    flexDirection: 'column',
    paddingVertical: 20,
  },
});