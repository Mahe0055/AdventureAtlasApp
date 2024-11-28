import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

async function sign_out({ navigation }) {
  try {
    await signOut(auth);
    navigation.navigate("Login");
  } catch (error) {
    console.error(error);
  }
}

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("../assets/AdventureAtlas-logo.png")}
      />
      <Text style={styles.text}>Klik på det, du gerne vil opnå.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NyRejse")}
      >
        <Text style={styles.buttonText}> Lav en ny rejseplan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Rejser")}
      >
        <Text style={styles.buttonText}> Se alle dine rejseplaner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Kort")}
      >
        <Text style={styles.buttonText}> Besøgte destinationer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSignOut}
        onPress={() => sign_out(navigation)}
      >
        <Text style={styles.buttonText}> Log ud</Text>
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
    fontSize: 25,
    marginVertical: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#05a4c8",
    padding: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  buttonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonSignOut: {
    alignItems: "center",
    backgroundColor: "#05a4c8",
    padding: 15,
    borderRadius: 5,
    marginVertical: 75,
  },
});
