import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState('2');
  const [todos, setTodos] = useState([
    { id: "1", title: "Выучить React Native" },
    { id: "2", title: "Написать приложение" }
  ]);

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

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const todo = todos.find(todo => todo.id === todoId);
    content = <TodoScreen goBack={() => setTodoId(null)} todo={todo} />;
  }
  return (
    <View>
      <Navbar title="Todo app" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
