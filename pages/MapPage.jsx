import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { fetchItems } from "../utils/utils";
import Map from "../components/Map";
import Nav from "../components/Nav";
import ResourceCards from "../components/ResourceCards";

export default function MapPage() {
	const [displayedResources, setDisplayedResources] = useState([]);
	const [isScrolling, setIsScrolling] = useState(false);
  const [targetLocation, setTargetlocation] =useState(null)

	useEffect(() => {
		StatusBar.setHidden(true);
		StatusBar.setBarStyle("light-content");

		const items = fetchItems();
		setDisplayedResources(items);
		return () => {
			StatusBar.setHidden(false);
			StatusBar.setBarStyle("default");
		};
	}, []);

	const cardPress = (location) => {
    setTargetlocation(location)
  };

	return (
		<View style={styles.container}>
			<Map targetLocation={targetLocation} displayedResources={displayedResources} />
			<Nav />
			<ResourceCards
				setIsScrolling={setIsScrolling}
				resources={displayedResources}
				cardPress={cardPress}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
