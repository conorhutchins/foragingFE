import {
	View,
	FlatList,
	Text
} from "react-native";

export default function ResourceCards({
	setIsScrolling,
	cardPress,
	resources,
}) {
	const renderItem = ({ item }) => {
		return (
			<View
				onTouchEnd={/*cardPress(item.location)*/ console.log("new ctouch end" ) }
				style={{
					width: 200,
					height: 200,
					backgroundColor: "lightgray",
					margin: 10,
				}}
				ont
			>
				<Text>{item.resource_name}</Text>
				<Text>{item.description}</Text>
				<Text>{item.created_at}</Text>
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
