import React, { useState, useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import {TodoContext} from "./context/todo/todoContex";
import {ScreenContext} from "./context/screen/screenContext";

export const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)

  // const removeTodo = id => {
  //   const todo = todos.find(todo => todo.id === id);
  //   Alert.alert(
  //     "Удаление элемента",
  //     `Вы уверены что хотите удалить "${todo.title}"?`,
  //     [
  //       {
  //         text: "Отмена",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Удалить",
  //         style: "destructive",
  //         onPress: () => {
  //           setTodoId(null);
  //           setTodos(prevState => prevState.filter(todo => todo.id !== id));
  //         }
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen}
    />
  );

  if (todoId) {
    const todo = todos.find(todo => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => changeScreen(null)}
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
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
});
