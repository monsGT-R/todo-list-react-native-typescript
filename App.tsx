import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState("2");
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
    const todo = todos.find(todo => todo.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            setTodoId(null);
            setTodos(prevState => prevState.filter(todo => todo.id !== id));
          }
        }
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (id, title) => {
    setTodos(old =>
      old.map(todo => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
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
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={todo}
        onSave={updateTodo}
      />
    );
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
