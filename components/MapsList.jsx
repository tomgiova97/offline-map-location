import React from "react";
import { View, Button, FlatList, StyleSheet } from "react-native";

const MapsList = ({
  isOnline,
  onEuropePress,
  onBarcelonaPress,
  onSpainPress,
  onItalyPress,
  onGermanyPress,
  onTurinPress,
  onMunsterPress,
  onRietiPress,
  onMetapontoPress,
  // onSantHilaryPress,
  onOnlineMode,
}) => {
  const data = [
    { id: 0, title: "Online Map", message: "Back to online mode" },
    { id: 1, title: "Europe", message: "Data for Map 1" },
    { id: 2, title: "Barcelona", message: "Data for Map 2" },
    { id: 3, title: "Spain", message: "Data for Map 3" },
    { id: 4, title: "Italy", message: "Data for Map 4" },
    { id: 5, title: "Rieti", message: "Data for Map 5" },
    { id: 6, title: "Metaponto", message: "Data for Map 6" },
    { id: 7, title: "Germany", message: "Data for Map 7" },
    { id: 8, title: "Munster", message: "Data for Map 8" },
    { id: 9, title: "Turin", message: "Data for Map 9" },
    // { id: 10, title: "Sant Hilary", message: "Data for Map 10" },
  ];

  const handleButtonPress = (item) => {
    switch (item.id) {
      case 0:
        onOnlineMode();
        break;
      case 1:
        onEuropePress();
        break;
      case 2:
        onBarcelonaPress();
        break;
      case 3:
        onSpainPress();
        break;
      case 4:
        onItalyPress();
        break;
      case 5:
        onRietiPress();
        break;
      case 6:
        onMetapontoPress();
        break;
      case 7:
        onGermanyPress();
        break;
      case 8:
        onMunsterPress();
        break;
      case 9:
        onTurinPress();
        break;
      // case 10:
      //   onSantHilaryPress();
      //   break;  
      default:
        onEuropePress();
        break;
    }
  };

  return (
    <View style={{ flex: 1, marginTop: "10%" }}>
      <FlatList
        data={data.slice(1).sort((a, b) => a.title.localeCompare(b.title))}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              key={item.id}
              title={item.title}
              onPress={() => handleButtonPress(item)}
              color="#A8DF8E"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      {isOnline ? (
        <View style={styles.buttonContainer}>
          <Button
            key={data[0].id}
            title={data[0].title}
            onPress={() => handleButtonPress(data[0])}
            color="#005B41"
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
});

export default MapsList;
