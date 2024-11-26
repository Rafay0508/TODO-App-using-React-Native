import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CheckBox from 'react-native-check-box';

const image = {
  uri: 'https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXJ8ZW58MHx8MHx8fDA%3D',
};

const Todo = () => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const loadData = async () => {
    setInitialLoading(true);
    try {
      const tasksSnapshot = await firestore()
        .collection('tasks')
        .orderBy('createdAt', 'desc')
        .get();
      const tasksList = tasksSnapshot.docs.map(doc => {
        const taskData = doc.data();
        return {
          id: doc.id,
          task: taskData?.task || '', // Ensure task field exists, or fallback to empty string
          isDone: taskData?.isDone || false, // Fallback for isDone if not defined
          createdAt: taskData?.createdAt?.toDate().toLocaleString() || 'N/A', // Convert Firestore timestamp to local date string
          updatedAt: taskData?.updatedAt?.toDate().toLocaleString() || 'N/A', // Convert Firestore timestamp to local date string
        };
      });
      setInitialLoading(false);
      setTasks(tasksList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // const handleSubmit = async () => {
  //   if (text.trim()) {
  //     let updatedTasks;

  //     if (updating) {
  //       // Update the task in Firestore
  //       try {
  //         const currentTask = tasks.find(task => task.id === currentTaskId); // Get the current task
  //         await firestore().collection('tasks').doc(currentTaskId).update({
  //           task: text.toString(),
  //           isDone: false,
  //           updatedAt: firestore.FieldValue.serverTimestamp(), // Update updatedAt to current timestamp
  //         });

  //         console.log('Task updated successfully');
  //         // Update the task in local state
  //         updatedTasks = tasks.map(task =>
  //           task.id === currentTaskId
  //             ? {
  //                 ...task,
  //                 task: text,
  //                 updatedAt: new Date().toLocaleString(), // Update updatedAt locally
  //               }
  //             : task,
  //         );

  //         setTasks(updatedTasks);
  //         setText('');
  //         setUpdating(false);
  //         setCurrentTaskId(null);
  //       } catch (error) {
  //         console.log('Error in updating task', error);
  //       }
  //     } else {
  //       // Add a new task to Firestore
  //       const taskExists = tasks.some(
  //         task => task.task.toLowerCase() === text.toLowerCase(),
  //       );
  //       if (taskExists) {
  //         Alert.alert('Duplicate Task', 'This task already exists.');
  //         setText('');
  //         return; // Prevent adding the task if it already exists
  //       } else {
  //         try {
  //           const docRef = await firestore().collection('tasks').add({
  //             task: text.toString(),
  //             isDone: false,
  //             createdAt: firestore.FieldValue.serverTimestamp(), // Set createdAt to current timestamp
  //             updatedAt: firestore.FieldValue.serverTimestamp(), // Set updatedAt to current timestamp
  //           });

  //           console.log('Task added successfully');
  //           // Update the state with the new task
  //           updatedTasks = [
  //             ...tasks,
  //             {
  //               id: docRef.id,
  //               task: text,
  //               isDone: false,
  //               createdAt: new Date().toLocaleString(),
  //               updatedAt: new Date().toLocaleString(),
  //             },
  //           ];

  //           setText('');
  //           loadData();
  //         } catch (error) {
  //           console.log('Error in adding task', error);
  //         }
  //       }
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    if (text.trim()) {
      let updatedTasks;

      // Disable the button during the process
      setLoading(true);

      if (updating) {
        // Update the task in Firestore
        try {
          const currentTask = tasks.find(task => task.id === currentTaskId); // Get the current task
          await firestore().collection('tasks').doc(currentTaskId).update({
            task: text.toString(),
            isDone: false,
            updatedAt: firestore.FieldValue.serverTimestamp(), // Update updatedAt to current timestamp
          });

          console.log('Task updated successfully');
          // Update the task in local state
          updatedTasks = tasks.map(task =>
            task.id === currentTaskId
              ? {
                  ...task,
                  task: text,
                  updatedAt: new Date().toLocaleString(), // Update updatedAt locally
                }
              : task,
          );

          setTasks(updatedTasks);
          setText('');
          setUpdating(false);
          setCurrentTaskId(null);
        } catch (error) {
          console.log('Error in updating task', error);
        }
      } else {
        // Check if task already exists
        const taskExists = tasks.some(
          task => task.task.toLowerCase() === text.toLowerCase(),
        );
        if (taskExists) {
          Alert.alert('Duplicate Task', 'This task already exists.');
          setText('');
          setLoading(false); // Enable the button again
          return; // Prevent adding the task if it already exists
        } else {
          setLoading(true);
          // Add a new task to Firestore
          try {
            const docRef = await firestore().collection('tasks').add({
              task: text.toString(),
              isDone: false,
              createdAt: firestore.FieldValue.serverTimestamp(), // Set createdAt to current timestamp
              updatedAt: firestore.FieldValue.serverTimestamp(), // Set updatedAt to current timestamp
            });

            console.log('Task added successfully');
            // Update the state with the new task
            updatedTasks = [
              ...tasks,
              {
                id: docRef.id,
                task: text,
                isDone: false,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
              },
            ];

            setText('');
            loadData();
          } catch (error) {
            console.log('Error in adding task', error);
          }
        }
      }
      setLoading(false); // Enable the button again after the task is added/updated
    }
  };

  const handleEdit = id => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setText(taskToEdit.task); // Set the task text to the current task's text
      setCurrentTaskId(id); // Set the current task id to update the right task
      setUpdating(true); // Indicate that the user is updating a task
    }
  };

  const handleDelete = id => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Deleting the task from Firestore
              await firestore()
                .collection('tasks')
                .doc(id) // Reference the document by its ID
                .delete();

              console.log('Task deleted successfully');

              // Filter out the deleted task from the state
              const updatedTasks = tasks.filter(task => task.id !== id);
              setTasks(updatedTasks); // Update the state with the remaining tasks
            } catch (error) {
              console.log('Error in deleting task', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleCheckBox = async (id, currentStatus) => {
    try {
      Alert.alert(
        'Update Status',
        'Are you sure you want to mark it Done or Pending?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const newStatus = !currentStatus; // Toggle the isDone status
              await firestore().collection('tasks').doc(id).update({
                isDone: newStatus,
                updatedAt: firestore.FieldValue.serverTimestamp(),
              }); // Update Firestore

              // Update the state with the new status
              const updatedTasks = tasks.map(task =>
                task.id === id ? {...task, isDone: newStatus} : task,
              );
              setTasks(updatedTasks); // Update the local state with new isDone value
            },
          },
        ],
      );
    } catch (error) {
      console.log('Error updating checkbox status', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.taskContainer}>
      <CheckBox
        isChecked={item.isDone}
        onClick={() => handleCheckBox(item.id, item.isDone)} // Handle checkbox click
      />
      <View style={styles.textContainer}>
        <Text style={styles.timestamp}>Created: {item.createdAt || 'N/A'}</Text>
        <Text style={styles.timestamp}>Updated: {item.updatedAt || 'N/A'}</Text>
        <Text style={styles.taskText}>{item.task}</Text>
        {/* Ensure item.task has fallback */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        style={styles.container}
        source={image}
        resizeMode="cover">
        <Text style={styles.header}>Todo APP</Text>

        <TextInput
          style={styles.input}
          placeholder={updating ? 'Enter Updated task' : 'Enter task here'}
          value={text}
          onChangeText={setText}
          placeholderTextColor="#999" // Adjust placeholder color
        />

        <View style={styles.buttonWrapper}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button
              title={updating ? 'Submit Changes' : 'Add Task'}
              onPress={handleSubmit}
            />
          )}
          {updating && (
            <Button
              title={'Cancel'}
              onPress={() => {
                setUpdating(false);
                setText('');
              }}
            />
          )}
        </View>

        <View style={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Pending Tasks</Text>
          {/* {initialLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={tasks.filter(item => item.isDone === false)}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{height: 290}}
            />
          )} */}
          {tasks.filter(item => item.isDone === false).length === 0 && (
            <Text>No pending tasks</Text>
          )}
          <FlatList
            data={tasks.filter(item => item.isDone === false)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{height: 290}}
          />
          <Text style={styles.sectionTitle}>Done Tasks</Text>
          {/* {initialLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={tasks.filter(item => item.isDone === true)}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{height: 180}}
            />
          )} */}
          {tasks.filter(item => item.isDone === true).length === 0 && (
            <Text>No pending tasks</Text>
          )}
          <FlatList
            data={tasks.filter(item => item.isDone === true)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{height: 180}}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#F1F0E8',
  },
  header: {
    fontSize: 32,
    marginVertical: 10,
    color: '#006A67',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  scrollContainer: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textContainer: {
    width: '60%',
  },
  taskText: {
    fontSize: 18,
  },
  timestamp: {
    fontSize: 12,
    color: '#006A67',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
  },
  editButton: {
    color: 'blue',
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
});

export default Todo;
