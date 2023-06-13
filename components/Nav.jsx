import { useState } from "react";
import { Button, View, StyleSheet, Switch } from "react-native";

export default function Nav({
  setShowSearch,
  showResourceNav = false,
  showSearchButton = true,
}) {
  const [toggleValue, setToggleValue] = useState(false);

  const searchPress = () => {
    setShowSearch(true);
  };
  return (
    <View>
      {showResourceNav && (
        <View style={styles.container}>
          <Button title="Previous resource" />
          <Button title="Next resource" />
        </View>
      )}
      <View style={styles.container}>
        {showSearchButton && (
          <Button
            onPress={searchPress}
            title="search"
            color="#841584"
            accessibilityLabel="search"
          />
        )}
        <Button title="Add" color="#841584" accessibilityLabel="Add" />
        <Button
          title="catalogue"
          color="#841584"
          accessibilityLabel="catalogue"
        />
        <Switch value={toggleValue} onValueChange={setToggleValue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10, // optional, adds horizontal padding to buttons
  },
});
