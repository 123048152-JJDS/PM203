import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  SectionList,
  Alert,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function HomeScreen() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [usarSecciones, setUsarSecciones] = useState(false);

  const handleAddBook = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      const newBook = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((prev) => [newBook, ...prev]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setIsSaving(false);
      Alert.alert('Exito', 'Libro agregado correctamente.');
    }, 4000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemTitle}>{item.titulo}</Text>
      <Text style={styles.itemDetail}>Autor: {item.autor}</Text>
      <Text style={styles.itemDetail}>Genero: {item.genero}</Text>
    </View>
  );

  const getSectionData = () => {
    const generos = {};
    libros.forEach((libro) => {
      if (!generos[libro.genero]) {
        generos[libro.genero] = [];
      }
      generos[libro.genero].push(libro);
    });
    return Object.keys(generos).map((genero) => ({
      title: genero,
      data: generos[genero],
    }));
  };

  const sectionData = getSectionData();

  return (
    <ImageBackground
      source={require('../assets/Biblioteca.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Text style={styles.mainTitle}>Registro de Libros</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            style={styles.keyboardAvoid}
          >
            <View style={styles.formCard}>
              <TextInput
                style={styles.input}
                placeholder="Titulo del libro"
                placeholderTextColor="#999"
                value={titulo}
                onChangeText={setTitulo}
              />
              <TextInput
                style={styles.input}
                placeholder="Autor"
                placeholderTextColor="#999"
                value={autor}
                onChangeText={setAutor}
              />
              <TextInput
                style={styles.input}
                placeholder="Genero"
                placeholderTextColor="#999"
                value={genero}
                onChangeText={setGenero}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  { opacity: pressed || isSaving ? 0.7 : 1 },
                ]}
                onPress={handleAddBook}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <ActivityIndicator color="#ffffff" size="small" />
                    <Text style={styles.buttonText}> Guardando...</Text>
                  </>
                ) : (
                  <Text style={styles.buttonText}>Agregar Libro</Text>
                )}
              </Pressable>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {usarSecciones ? 'Vista por generos' : 'Vista plana'}
            </Text>
            <Switch
              value={usarSecciones}
              onValueChange={setUsarSecciones}
              trackColor={{ false: '#767577', true: '#6200EE' }}
              thumbColor={usarSecciones ? '#f5f5f5' : '#f4f3f4'}
            />
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>
              {usarSecciones ? 'Libros agrupados por genero' : 'Libros leidos'}
            </Text>

            {libros.length === 0 ? (
              <Text style={styles.emptyText}>
                Aun no has agregado ningun libro.
              </Text>
            ) : usarSecciones ? (
              <SectionList
                sections={sectionData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContent}
              />
            ) : (
              <FlatList
                data={libros}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContent}
              />
            )}
          </View>

          <View style={styles.extraSpace} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  keyboardAvoid: {
    width: '100%',
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    flexDirection: 'row',
    minHeight: 52,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 200,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 30,
    fontStyle: 'italic',
  },
  extraSpace: {
    height: 150,
  },
});