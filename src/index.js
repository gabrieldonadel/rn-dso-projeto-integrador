import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import axios from 'axios';

const App = () => {
  const [info, setInfo] = useState([]);

  const handleinfo = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/')
      .then(function(response) {
        setInfo(response.data);
      });
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleinfo} title="GET" />
      {info.length > 0 ? info.map(i => <Text>{i.id}</Text>) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7d7d7d7d',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
