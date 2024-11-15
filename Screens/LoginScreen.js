import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("../assets/AdventureAtlas-logo.png")}
      />
      <Text style={styles.text}>Velkommen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Hjem")}
      >
        <Text style={styles.buttonText}> Log ind</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Hvid baggrund
    alignItems: "center", // Elementer placeres i midten af skærm
    justifyContent: "flex-start",
    paddingTop: 30, // Aftstand fra top af skærm
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0080f0", //blå
    padding: 15,
    marginBottom: 80,
  },
  buttonText: {
    color: "#fff", // Hvid tekstfarve
    fontSize: 16,
    fontWeight: "bold",
  },
});
