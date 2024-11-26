import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Todo from './components/Todo';
import firestore from '@react-native-firebase/firestore';
const App = () => {
  return (
    <>
      <Todo />
      {/* <Text>hellowoe</Text> */}
    </>
  );
};

export default App;
