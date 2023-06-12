import { useState } from "react";
import { Button, View, StyleSheet, Switch } from "react-native";


export default function Nav() {
    const [toggleValue, setToggleValue] = useState(false)
    
    const searchPress = () => {

    }
    return (
        <View style={styles.container}>
            <Button
            onPress={searchPress}
         title="search"
            color="#841584"
            accessibilityLabel="search"
            />
            <Button
         title="Add"
            color="#841584"
            accessibilityLabel="Add"
            />
            <Button
         title="catalogue"
            color="#841584"
            accessibilityLabel="catalogue"
            />
            <Switch value={toggleValue} 
            onValueChange={setToggleValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 10, // optional, adds horizontal padding to buttons
    },
  });