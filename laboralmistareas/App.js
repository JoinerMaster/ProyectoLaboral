import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import TaskList from './screens/ListaTareas';
import NewTask from './screens/NuevaTarea';
import DetalleTarea from './screens/DetalleTarea';
import { TaskStatus } from './enums/TaskStatus';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const saveTask = (task) => {
    setTasks((previousTasks) => [...previousTasks, task]);
    setCurrentScreen('list');
  };

  const markTaskAsCompleted = () => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === selectedTask.id
          ? { ...task, status: TaskStatus.Completed }
          : task
      )
    );

    setSelectedTask((previousTask) => ({
      ...previousTask,
      status: TaskStatus.Completed,
    }));

    setCurrentScreen('list');
  };

  const deleteTask = () => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== selectedTask.id
      )
    );

    setSelectedTask(null);
    setCurrentScreen('list');
  };

  return (
    <>
      {currentScreen === 'list' ? (
        <TaskList
          tasks={tasks}
          onNewTask={() => setCurrentScreen('new')}
          onViewDetails={(task) => {
            setSelectedTask(task);
            setCurrentScreen('detail');
          }}
        />
      ) : currentScreen === 'new' ? (
        <NewTask
          onSave={saveTask}
          onCancel={() => setCurrentScreen('list')}
        />
      ) : (
        <DetalleTarea
          tarea={selectedTask}
          onMarcarCompletada={markTaskAsCompleted}
          onEliminar={deleteTask}
        />
      )}

      <StatusBar style="auto" />
    </>
  );
}