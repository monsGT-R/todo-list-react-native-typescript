import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

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

  return (
    <View>
      <Navbar title="Todo app" />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
});
