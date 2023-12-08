import React from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";

const Header = ({ isOnline, onButtonPress }) => {
  const headerTitle = isOnline ? "Spray Maps" : "Spray Maps Offline";
  const buttonLabel = isOnline ? "Go Offline" : "Select Map";

  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={buttonLabel}
          onPress={onButtonPress} // Change to the desired image name
          color="#A8DF8E"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // marginTop: "12%", //To keep only in dev mode
    marginBottom: "3%",
    marginLeft: 5,
    marginRight: 5,
    height: 60,
    backgroundColor: "#A8DF8E",
    flexDirection: "row", // Use a row layout
    alignItems: "center",
    justifyContent: "space-between", // Space between the text and button
    paddingHorizontal: 10, // Add some margin on the sides
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
  textContainer: {
    flex: 1, // Takes up available space
  },
  buttonContainer: {
    marginLeft: 10, // Add margin to separate button from text
    overflow: "hidden",
  },
});

export default Header;
