import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Navbar } from "./src/Navbar";
import { AddTodo } from "./src/AddTodo";
import { Todo } from "./src/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = title => {
    const newTodo = {
      id: Date.now().toString(),
      title
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const removeTodo = id => {
    setTodos(prevState => prevState.filter(todo => todo.id !== id));
  };

  return (
    <View>
      <Navbar title="Todo app" />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList
          keyExtractor={item => item.id}
          data={todos}
          renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
