import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Task = {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  status: string;
};

type Props = {
  tasks: Task[];
  onNewTask: () => void;
  onViewDetails: (task: Task) => void;
};

export default function TaskList({ tasks, onNewTask, onViewDetails }: Props) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>

      <Text style={styles.taskCount}>Cantidad de tareas: {tasks.length}</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.task}
            onPress={() => onViewDetails(item)}
          >
            <Text style={styles.taskName}>{item.title}</Text>
            <Text>Estado: {item.status}</Text>
          </TouchableOpacity>
        )}
        style={{ flex: 1 }}
      />

      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={onNewTask}
      >
        <Text style={styles.addTaskButtonText}>+ Nueva Tarea</Text>
      </TouchableOpacity>
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

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  task: {
    padding: 15,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#acabab',
    borderRadius: 8,
  },

  taskCount: {
    fontSize: 18,
    marginBottom: 10,
  },

  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  addTaskButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  addTaskButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

});