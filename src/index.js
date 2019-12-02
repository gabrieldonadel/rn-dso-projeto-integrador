import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';

const App = () => {
  const [info, setInfo] = useState([{}]);

  console.disableYellowBox = true;

  const handleInfo = async () => {
    fetch('http://api-dso2.herokuapp.com/log', {
      method: 'GET',
    })
      .then(res => {
        res.json().then(r => setInfo(r));
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setTimeout(() => handleInfo(), 3000);
  });

  const renderItemList = ({item}) => {
    return (
      <View style={styles.list}>
        <Text>
          <Text style={styles.description}>UID:</Text> {item.card_uid}
        </Text>
        <Text>
          <Text style={styles.description}>ACESS DATE: </Text>
          {moment(item.access_date).format('HH:mm:ss - DD/MM/YYYY')}
        </Text>
        <Text style={styles.status}>
          <Text style={styles.description}>DOOR STATUS: </Text>
          {item.door_status}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DOOR ACESS LOG: </Text>
      {info.length > 0 ? (
        <FlatList style={styles.flat} data={info} renderItem={renderItemList} />
      ) : (
        <Text>Sem log</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7d7d7d7d',
  },
  list: {
    backgroundColor: '#eaeaea',
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  description: {
    fontWeight: 'bold',
  },
  status: {
    textTransform: 'uppercase',
  },
});

export default App;
