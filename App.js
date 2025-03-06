import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), description: "Buy groceries", completed: false, end: "Tues, Mar 18" },
    { id: uuidv4(), description: "Call the doctor", completed: false, end: "Thurs, Mar 20" },
    { id: uuidv4(), description: "Finish project report", completed: false, end: "Wed, Mar 26" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [endDate, setEndDate] = useState("");

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, {
        id: uuidv4(),
        description: newTask,
        completed: false,
        end: endDate || "No Deadline",
      }]);
      setNewTask("");
      setEndDate("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = showCompleted ? tasks : tasks.filter((task) => !task.completed);

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        onPress={() => toggleTask(item.id)}
        style={[
          styles.checkbox,
          item.completed && styles.checkedCheckbox,
        ]}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.description}
      </Text>
      <Text style={styles.dateText}>Deadline: {item.end}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your TODO List</Text>

      <TouchableOpacity onPress={() => setShowCompleted(!showCompleted)}>
        <Text style={styles.showCompletedText}>
          {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          placeholder="Deadline"
          value={endDate}
          onChangeText={setEndDate}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "gray",
  },
  inputContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "teal",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center'
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  showCompletedText: {
    textAlign: "center",
    color: "teal",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 13,
    color: "gray",
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#045D5D",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  checkedCheckbox: {
    borderColor: "green",
  },
  checkmark: {
    color: "green",
    fontSize: 20, 
    fontWeight: "bold", 
  },
});