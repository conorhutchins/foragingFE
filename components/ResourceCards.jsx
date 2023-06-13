import { View, FlatList, Text, Button } from "react-native";

export default function ResourceCards({
  setIsScrolling,
  cardPress,
  resources,
}) {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "lightgray",
          margin: 10,
        }}
      >
        <Text>{item.resource_name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.created_at}</Text>
        <Button
          onPress={() => {
            cardPress(item.location);
          }}
          title="Button"
        />
      </View>
    );
  };

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  return (
    <FlatList
      onScrollBeginDrag={handleScrollBegin}
      onScrollEndDrag={handleScrollEnd}
      scrollEventThrottle={16}
      data={resources}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
    />
  );
}
