import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import HomeScreen from "./HomeScreen";

export default function LoginScreen({ navigation }) {
  const [enteredEmail, setEnteredEmail] = useState("test@gmail.com");
  const [enteredPassword, setEnteredPassword] = useState("123456");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth_ = getAuth();
    const unsubcribe = onAuthStateChanged(auth_, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubcribe();
  }, []);

  async function login() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log("Du er logget ind " + userCredential.user.id);
      navigation.navigate("Hjem");
    } catch (error) {}
  }

  async function sign_up() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log("Du har oprettet en ny bruger " + userCredential.user.uid);
      navigation.navigate("Hjem");
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      {!userId && (
        <>
          <Image
            style={styles.img}
            source={require("../assets/AdventureAtlas-logo.png")}
          />
          <Text style={styles.headline}>Velkommen</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={(newText) => setEnteredEmail(newText)}
            value={enteredEmail}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(newText) => setEnteredPassword(newText)}
            value={enteredPassword}
          />
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}> Log ind</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.inputBox}
            onChangeText={(newText) => setEnteredEmail(newText)}
            value={enteredEmail}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(newText) => setEnteredPassword(newText)}
            value={enteredPassword}
          />

          <TouchableOpacity style={styles.button} onPress={sign_up}>
            <Text style={styles.buttonText}> Sign up</Text>
          </TouchableOpacity>
        </>
      )}
      {userId && (
        <>
          <HomeScreen />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Hvid baggrund
    alignItems: "center", // Elementer placeres i midten af skærm
    justifyContent: "flex-start",
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  headline: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0d6fe5", //blå
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff", // Hvid tekstfarve
    fontSize: 15,
    fontWeight: "bold",
  },
  inputBox: {
    width: "65%",
    height: 45,
    borderColor: "black", //sort kant
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    fontSize: 14,
  },
});
