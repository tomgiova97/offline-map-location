import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import NetInfo from "@react-native-community/netinfo";
import Header from "./Header";
import OfflinePage from "./OfflinePage";

const MainPage = () => {
  const D_T = 2; //Number of seconds between each coordinates evaluation
  const [speed, setSpeed] = useState(0.0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineMode, setOnlineMode] = useState(true);
  const [showMapsList, setShowMapsList] = useState(false);
  const timeInterval = D_T * 1000; // Update every D_T seconds

  const [rotationAngle, setRotationAngle] = useState(-45); // Initial rotation angle is 0 degrees

  // Define your location options
  const locationOptions = {
    // accuracy: Location.Accuracy.Highest,
    accuracy: Location.Accuracy.High,
    timeInterval: timeInterval, // Update every D_T seconds
    distanceInterval: 0.1,
  };

  const convertSpeedToKmH = (speedMS) => {
    return (speedMS * 3.6).toFixed(1);
  };

  const getMagnetometerData = async () => {
    try {
      const { granted } = await Magnetometer.requestPermissionsAsync();

      if (granted) {
        // Permission granted, subscribe to the compass sensor
        const subscription = Magnetometer.addListener((result) => {
          // Calculate the compass heading
          const { x, y } = result;
          const heading = Math.atan2(-x, y) * (180 / Math.PI);
          const heading360 = heading >= 0 ? heading : 360 + heading;
          setRotationAngle(heading360 - 90);
        });

        // Return a cleanup function to unsubscribe when the component unmounts
        return () => {
          subscription.remove();
        };
      } else {
        // Handle permission denied
        console.log("Compass permission denied.");
      }
    } catch (error) {
      // Handle any errors that occur during permission request
      console.error("Error requesting compass permission:", error);
    }
  };

  const getLocationData = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      await Location.watchPositionAsync(
        locationOptions,
        (location) => {
          setLocation(location);
          setSpeed(convertSpeedToKmH(location.coords.speed));
        }
      );
    }
    return () => locationSubscription.remove();
  };

  const getConnectionState = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getConnectionState();
    getLocationData();
    getMagnetometerData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={{ position: "absolute", top: 50, right: 50, zIndex: 1 }}>
        {isConnected && onlineMode ? (
          // <></>
          <Header isOnline={true} onButtonPress={() => {setOnlineMode(false)}} /> 
        ) : (
          // <Feather name="wifi-off" size={90} color="black" />
          <Header isOnline={false} onButtonPress={() => {setOnlineMode(true)}} />  //TODO: fix func
        )}
      </View> */}
      {isConnected && onlineMode ? (
        // <></>
        <Header
          isOnline={true}
          onButtonPress={() => {
            setOnlineMode(false);
          }}
        />
      ) : (
        // <Feather name="wifi-off" size={90} color="black" />
        <Header
          isOnline={false}
          onButtonPress={() => {
            setShowMapsList(true);
          }}
        /> 
      )}

      {/* Big Container on Top */}
      {isConnected && onlineMode ? (
        <View style={styles.bigContainer}>
          {errorMsg ? (
            <Text>{errorMsg}</Text>
          ) : location ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                width: "100%",
                height: "100%",
              }}
              initialRegion={{
                latitude: location.coords.latitude, // Example latitude
                longitude: location.coords.longitude, // Example longitude
                latitudeDelta: 0.1, // Adjust this value as needed
                longitudeDelta: 0.1, // Adjust this value as needed
              }}
            >
              {/* Add a marker for the example location */}
              <Marker
                coordinate={{
                  latitude: location.coords.latitude, // Example latitude
                  longitude: location.coords.longitude, // Example longitude
                }}
                title="Example Location"
                description="This is an example location"
              />
            </MapView>
          ) : (
            <Text>Loading location...</Text>
          )}
        </View>
      ) : (
        <OfflinePage
          coords={location ? location.coords : null}
          isOnline={isConnected}
          onChangeMode={() => {
            setOnlineMode(true);
          }}
          showMapsList={showMapsList}
          onDismissMapsList={() => {
            setShowMapsList(false);
          }}
        />
      )}

      {/* Row with Two Columns */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.columnText}>Speed</Text>
          <Text style={{ marginTop: 10 }}>{speed} km/h</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>Direction</Text>
          <Image
            source={require("../assets/arrow.png")} // Replace with the actual path to your image
            style={{
              ...styles.image,
              transform: [{ rotate: `${rotationAngle}deg` }],
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 0,
  },
  bigContainer: {
    flex: 5,
    backgroundColor: "white",
    // height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  bigContainerText: {
    color: "white",
    fontSize: 24,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  column: {
    flex: 1,
    backgroundColor: "lightgray",
    margin: 5,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  columnText: {
    fontSize: 18,
  },
  image: {
    width: 28, // Set the width of your image
    height: 28, // Set the height of your image
    marginTop: 10,
  },
});

export default MainPage;
