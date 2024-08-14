// users.js (renombrado para seguir una convención de nombres más clara)
// users.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Users = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(response => setUserList(response.data))
      .catch(error => console.log(error));
  }, []);

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:8000/api/user/${userId}`)
      .then(() => setUserList(prevUserList => prevUserList.filter(user => user._id !== userId)))
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de usuarios</Text>
      <FlatList
        data={userList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.userName}</Text>
            <Button
              title="Borrar"
              onPress={() => deleteUser(item._id)}
            />
          </View>
        )}
      />
      <Button
        title="Nuevo"
        onPress={() => navigation.navigate('UserNew')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Users;
