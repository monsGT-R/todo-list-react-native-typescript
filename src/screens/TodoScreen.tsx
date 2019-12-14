import React from "react";
import {View, Text, Button} from "react-native";

export const TodoScreen = ({ goBack, todo }) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <Button title="Назад" onPress={goBack} />
    </View>
  )
}