import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { useState } from "react";

export default function MapScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 55,
    longitude: 12,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}></MapView>

      <View style={styles.menuBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Hjem")}
        >
          <Text style={styles.buttonText}> Hjem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NyRejse")}
        >
          <Text style={styles.buttonText}> Ny rejse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Rejser")}
        >
          <Text style={styles.buttonText}> Rejser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff", // Hvid baggrund
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30, // Aftstand fra top af skærm
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#0d6fe5", // Blå
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  button: {
    alignItems: "center",
    padding: 15,
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
