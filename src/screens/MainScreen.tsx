import React, { useState, useEffect, useContext, useCallback } from "react";
import { FlatList, Image, StyleSheet, View, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContex";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoader } from "../components/ui/AppLoader";

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener("change", update);

    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  if (loading) {
    return <AppLoader />;
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item: any) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/no-items.png")}
        />
      </View>
    );
  }
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: "85%"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
