/*Zona 1: Importaciones de componentes y archivos */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  Pressable,
} from 'react-native';


/*Zona 2: Main - Hogar de los componentes */
const FRUTAS = [
  { id: '1', nombre: 'Manzana' },
  { id: '2', nombre: 'Plátano' },
  { id: '3', nombre: 'Naranja' },
  { id: '4', nombre: 'Fresa' },
  { id: '5', nombre: 'Uva' },
];
const MENU = [
  { titulo: 'Bebidas', data: ['Café', 'Té', 'Agua'] },
  { titulo: 'Postres', data: ['Pastel', 'Helado'] },
  { titulo: 'Platillos', data: ['Tacos', 'Pizza', 'Ensalada'] },
];
export default function FlatListSectionListScreen() {
  const [vista, setVista] = useState('flat');
  const [favoritos, setFavoritos] = useState([]);
  const toggleFavorito = (item) => {
    setFavoritos((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlatList & SectionList</Text>
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, vista === 'flat' && styles.tabActiva]}
          onPress={() => setVista('flat')}
        >
          <Text style={styles.tabText}>FlatList</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, vista === 'section' && styles.tabActiva]}
          onPress={() => setVista('section')}
        >
          <Text style={styles.tabText}>SectionList</Text>
        </Pressable>
      </View>

      {vista === 'flat' && (
        <FlatList
          data={FRUTAS}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Text style={styles.header}>Lista de Frutas</Text>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<Text>No hay elementos</Text>}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => toggleFavorito(item.nombre)}
            >
              <Text style={styles.itemText}>{item.nombre}</Text>
              <Text>{favoritos.includes(item.nombre) ? '⭐' : '☆'}</Text>
            </Pressable>
          )}
        />
      )}

      {vista === 'section' && (
        <SectionList
          sections={MENU}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section }) => (
            <Text style={styles.header}>{section.titulo}</Text>
          )}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => toggleFavorito(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
              <Text>{favoritos.includes(item) ? '⭐' : '☆'}</Text>
            </Pressable>
          )}
        />
      )}
      <Text style={styles.footer}>Favoritos: {favoritos.length}</Text>
    </View>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  tabActiva: {
    backgroundColor: '#6846ff',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#6846ff',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  footer: {
    textAlign: 'center',
    paddingVertical: 12,
    fontWeight: 'bold',
  },
});