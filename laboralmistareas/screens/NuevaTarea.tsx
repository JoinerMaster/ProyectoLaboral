import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { TaskStatus } from '../enums/TaskStatus';

type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

type Props = {
  onSave: (task: Task) => void;
  onCancel: () => void;
};

export default function NewTask({ onSave, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const showAlert = (message: string) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  const saveTask = () => {
    if (title.trim() === '') {
      showAlert('Escribe el nombre de la tarea.');
      return;
    }

    if (description.trim() === '') {
      showAlert('Escribe la descripción de la tarea.');
      return;
    }

    if (priority.trim() === '') {
      showAlert('Seleccione el tipo de prioridad.');
      return;
    }

    onSave({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      status: TaskStatus.Pending,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Nueva Tarea</Text>

      <Text style={styles.label}>
        Nombre de la tarea
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. Compras viveres"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.subtitle}>Descripción</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Agrega una descripción..."
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.subtitle}>Prioridad</Text>

      <View style={styles.options}>
        {['Baja', 'Media', 'Alta'].map((option) => {
          const isSelected = priority === option;

          const priorityStyle =
            option === 'Baja'
              ? styles.lowPriority
              : option === 'Media'
                ? styles.mediumPriority
                : styles.highPriority;

          return (
            <Pressable
              key={option}
              style={[
                styles.priorityButton,
                isSelected && priorityStyle,
              ]}
              onPress={() => setPriority(option)}
            >
              <Text
                style={[
                  styles.priorityText,
                  isSelected && styles.selectedText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveTask}
      >
        <Text style={styles.saveButtonText}>
          Guardar tarea
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onCancel}
      >
        <Text style={styles.cancelButtonText}>
          Cancelar
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Campo obligatorio
            </Text>

            <Text style={styles.modalMessage}>
              {modalMessage}
            </Text>

            <Pressable
              style={styles.acceptButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.acceptButtonText}>
                Aceptar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },

  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 28,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    marginTop: 22,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#acabab',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  textArea: {
    height: 110,
  },

  options: {
    flexDirection: 'row',
    gap: 10,
  },

  priorityButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#acabab',
    borderRadius: 8,
    alignItems: 'center',
  },

  lowPriority: {
    backgroundColor: '#2878D0',
    borderColor: '#2878D0',
  },

  mediumPriority: {
    backgroundColor: '#F2C230',
    borderColor: '#F2C230',
  },

  highPriority: {
    backgroundColor: '#D93636',
    borderColor: '#D93636',
  },

  priorityText: {
    fontSize: 16,
    color: '#333',
  },

  selectedText: {
    color: '#fff',
  },

  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cancelButton: {
    backgroundColor: '#1b1b1c',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 8,
  },

  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 22,
  },

  acceptButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 11,
    paddingHorizontal: 28,
    borderRadius: 8,
  },

  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
