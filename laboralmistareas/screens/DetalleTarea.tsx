import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { TaskStatus } from '../enums/TaskStatus';

type Tarea = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

type Props = {
  tarea: Tarea;
  onMarcarCompletada: () => void;
  onEliminar: () => void;
};

export default function DetalleTarea({ tarea, onMarcarCompletada, onEliminar,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Detalle</Text>

      <Text style={styles.taskTitle}>
        {tarea.title}
      </Text>

      <Text style={styles.description}>
        {tarea.description}
      </Text>

      <Text style={styles.label}>Estado</Text>

      <View style={styles.status}>
        <Text style={styles.statusText}>
          {tarea.status}
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            tarea.status === TaskStatus.Completed &&
            styles.disabledButton,
          ]}
          onPress={onMarcarCompletada}
          disabled={tarea.status === TaskStatus.Completed}
        >
          <Text style={styles.buttonText}>
            {tarea.status === TaskStatus.Completed
              ? 'Tarea completada'
              : 'Marcar completada'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Eliminar tarea
            </Text>

            <Text style={styles.modalText}>
              ¿Estás seguro de que deseas eliminar
              esta tarea?
            </Text>

            <View style={styles.modalOptions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.confirmButton}
                onPress={onEliminar}
              >
                <Text style={styles.buttonText}>
                  Eliminar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
  },

  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 18,
  },

  taskTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 14,
  },

  description: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 34,
  },

  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },

  status: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignSelf: 'flex-start',
    minWidth: 170,
  },

  statusText: {
    fontSize: 16,
    color: '#166534',
  },

  buttons: {
    marginTop: 55,
    gap: 20,
  },

  completeButton: {
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.65,
  },

  deleteButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalContent: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },

  modalText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },

  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },

  cancelButton: {
    backgroundColor: '#1b1b1c',
    borderRadius: 11,
    padding: 16,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },

  cancelText: {
    color: '#eaedf2',
    fontWeight: 'bold',
    fontSize: 17,
  },
  
  confirmButton: {
    backgroundColor: '#e82c2c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});