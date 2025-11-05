import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDatabase } from '../../services/DatabaseContext';
import { BottomSheet } from '../ui/ModernUI';

const ICONS = [
  'shopping-cart',
  'home',
  'restaurant',
  'directions-car',
  'local-hospital',
  'school',
  'account-balance',
  'work',
  'fitness-center',
  'local-cafe',
  'movie',
  'phone-android',
  'pets',
  'card-giftcard',
  'beach-access',
];

const COLORS = [
  '#FF3B30',
  '#FF9500',
  '#FFCC00',
  '#4CD964',
  '#5856D6',
  '#007AFF',
  '#5AC8FA',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
];

const CategoryEditor = ({ category, isVisible, onClose }) => {
  const { createCategory, updateCategory } = useDatabase();
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('GASTO');
  const [icono, setIcono] = useState('shopping-cart');
  const [color, setColor] = useState('#007AFF');
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setNombre(category.nombre);
      setTipo(category.tipo);
      setIcono(category.icono);
      setColor(category.color);
    } else {
      setNombre('');
      setTipo('GASTO');
      setIcono('shopping-cart');
      setColor('#007AFF');
    }
  }, [category]);

  const handleSubmit = async () => {
    try {
      if (!nombre.trim()) {
        setError('El nombre es obligatorio');
        return;
      }

      const categoryData = {
        nombre: nombre.trim(),
        tipo,
        icono,
        color,
        activo: true,
      };

      if (category) {
        await updateCategory(category.id, categoryData);
      } else {
        await createCategory(categoryData);
      }

      onClose();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      setError('Error al guardar la categoría');
    }
  };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <ScrollView>
        <Text style={styles.title}>
          {category ? 'Editar Categoría' : 'Nueva Categoría'}
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                setError('');
              }}
              placeholder="Nombre de la categoría"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  tipo === 'GASTO' && styles.typeButtonActive,
                ]}
                onPress={() => setTipo('GASTO')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    tipo === 'GASTO' && styles.typeButtonTextActive,
                  ]}
                >
                  Gasto
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  tipo === 'INGRESO' && styles.typeButtonActive,
                ]}
                onPress={() => setTipo('INGRESO')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    tipo === 'INGRESO' && styles.typeButtonTextActive,
                  ]}
                >
                  Ingreso
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Icono</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.iconGrid}>
                {ICONS.map((iconName) => (
                  <TouchableOpacity
                    key={iconName}
                    style={[
                      styles.iconButton,
                      iconName === icono && styles.iconButtonSelected,
                      { backgroundColor: iconName === icono ? color : '#f5f5f5' },
                    ]}
                    onPress={() => setIcono(iconName)}
                  >
                    <MaterialIcons
                      name={iconName}
                      size={24}
                      color={iconName === icono ? '#fff' : '#666'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Color</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.colorGrid}>
                {COLORS.map((colorHex) => (
                  <TouchableOpacity
                    key={colorHex}
                    style={[
                      styles.colorButton,
                      {
                        backgroundColor: colorHex,
                        borderWidth: colorHex === color ? 3 : 0,
                      },
                    ]}
                    onPress={() => setColor(colorHex)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  typeButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  typeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  iconButtonSelected: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  colorGrid: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderColor: '#fff',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
  },
});

export default CategoryEditor;
