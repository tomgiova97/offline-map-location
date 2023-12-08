import React, { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import MapsList from "./MapsList";
import {
  europe,
  barcelona,
  spain,
  italy,
  rieti,
  metaponto,
  germany,
  munster,
  turin,
  sant_hilary
} from "../maps-data";

const calculateMapLocationPercentages = (coords, mapData) => {
  //Constants in percentage to take imperfections of map into account
  //Theoretical should be 0-100 / 0-100
  h_0 = 0.2;
  h_1 = 96;
  v_0 = -1.2;
  v_1 = 98.5;

  // cexport const europe ={h_0: -11.95281023144303 , h_1: 29.860802206678905, v_0 : 35.44298557241733, v_1 : 69.32870072371662}
  // export const barcelona = {h_0: 2.120677088183002, h_1: 2.222939778810586, v_0 : 41.33653034890389, v_1 : 41.44562619496057}

  if (coords) {
    horLocPerc =
      h_0 +
      ((coords.longitude - mapData.h_0) / (mapData.h_1 - mapData.h_0)) *
        (h_1 - h_0);
    verLocPerc =
      v_0 +
      ((coords.latitude - mapData.v_0) / (mapData.v_1 - mapData.v_0)) *
        (v_1 - v_0);

    if (horLocPerc < h_0) {
      horLocPerc = h_0;
    }
    if (horLocPerc > h_1) {
      horLocPerc = h_1;
    }
    if (verLocPerc < v_0) {
      verLocPerc = v_0;
    }
    if (verLocPerc > v_1) {
      verLocPerc = v_1;
    }

    return { horLocPerc: horLocPerc, verLocPerc: verLocPerc };
  }

  return { horLocPerc: h_0, verLocPerc: v_0 };
};

const OfflinePage = ({
  coords,
  isOnline,
  onChangeMode,
  showMapsList,
  onDismissMapsList,
}) => {
  const [imageName, setImageName] = useState(
    require("../assets/maps/europe.png")
  ); // Default image name
  const [mapData, setMapData] = useState(europe);

  const mapLocPerc = calculateMapLocationPercentages(coords, mapData);

  const changeToEuropeImage = () => {
    setMapData(europe);
    setImageName(require("../assets/maps/europe.png"));
    onDismissMapsList();
  };

  const changeToBarcelonaImage = () => {
    setMapData(barcelona);
    setImageName(require("../assets/maps/barcelona.png"));
    onDismissMapsList();
  };

  const changeToSpainImage = () => {
    setMapData(spain);
    setImageName(require("../assets/maps/spain.png"));
    onDismissMapsList();
  };

  const changeToItalyImage = () => {
    setMapData(italy);
    setImageName(require("../assets/maps/italy.png"));
    onDismissMapsList();
  };

  const changeToRietiImage = () => {
    setMapData(rieti);
    setImageName(require("../assets/maps/rieti.png"));
    onDismissMapsList();
  };

  const changeToMetapontoImage = () => {
    setMapData(metaponto);
    setImageName(require("../assets/maps/metaponto.png"));
    onDismissMapsList();
  };

  const changeToGermanyImage = () => {
    setMapData(germany);
    setImageName(require("../assets/maps/germany.png"));
    onDismissMapsList();
  };

  const changeToMunsterImage = () => {
    setMapData(munster);
    setImageName(require("../assets/maps/munster.png"));
    onDismissMapsList();
  };

  const changeToTurinImage = () => {
    setMapData(turin);
    setImageName(require("../assets/maps/turin.png"));
    onDismissMapsList();
  };

  const changeToSantHilaryImage = () => {
    setMapData(sant_hilary);
    setImageName(require("../assets/maps/sant_hilary.png"));
    onDismissMapsList();
  };

  const changeToOnlineMode = () => {
    onDismissMapsList();
    onChangeMode();
  };

  return (
    <View style={styles.container}>
      {showMapsList ? (
        <MapsList
          isOnline={isOnline}
          onEuropePress={changeToEuropeImage}
          onBarcelonaPress={changeToBarcelonaImage}
          onSpainPress={changeToSpainImage}
          onItalyPress={changeToItalyImage}
          onRietiPress={changeToRietiImage}
          onMetapontoPress={changeToMetapontoImage}
          onGermanyPress={changeToGermanyImage}
          onMunsterPress={changeToMunsterImage}
          onTurinPress={changeToTurinImage}
          // onSantHilaryPress={changeToSantHilaryImage}
          onOnlineMode={changeToOnlineMode}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {/* <View style={{ flex: 1 }}>
            <Text>{JSON.stringify(coords)}</Text>
          </View> */}
          <View style={styles.imageContainer}>
            <Image
              source={imageName}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View
            style={[
              styles.overlayImageContainer,
              ,
              {
                left: `${mapLocPerc.horLocPerc}%`,
                bottom: `${mapLocPerc.verLocPerc}%`,
              },
            ]}
          >
            <Image
              source={require("../assets/circle-24.png")}
              style={styles.overlayImage}
              resizeMode="contain"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  imageContainer: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1, // This will make the image take all available space
    width: "100%",
  },
  overlayImageContainer: {
    position: "absolute",
  },
  overlayImage: {
    width: 15,
    height: 15,
  },
});

export default OfflinePage;
