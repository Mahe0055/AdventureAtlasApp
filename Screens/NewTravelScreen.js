import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { database } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "../Context";

export default function NewTravelScreen({ navigation }) {
  const {
    userId,
    country,
    setCountry,
    city,
    setCity,
    vacationType,
    setVacationType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sights,
    setSights,
    eatingPlaces,
    setEatingPlaces,
  } = useUser();

  async function addDocument() {
    try {
      await addDoc(collection(database, userId), {
        Land: country,
        By: city,
        Ferietype: vacationType,
        Startdato: startDate,
        Slutdato: endDate,
        Seværdigheder: sights.split(",").map((sight) => sight.trim()), // Konverter komma-separateret string til array
        Spisesteder: eatingPlaces.split(",").map((place) => place.trim()),
      });
      alert("Din rejse er oprettet og gemt");
    } catch (error) {
      console.log("error addDocument " + error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Planlæg en ny rejse</Text>
      <Text style={styles.text}>Land</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={(newCountry) => setCountry(newCountry)}
        value={country}
      />
      <Text style={styles.text}>By</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={(newCity) => setCity(newCity)}
        value={city}
      />
      <Text style={styles.text}>Ferietype</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={(newVacationType) => setVacationType(newVacationType)}
        value={vacationType}
      />
      <Text style={styles.text}>Startdato</Text>
      <TextInput
        style={styles.inputBox}
        value={startDate}
        placeholder="dd-mm-åååå"
        onChangeText={(newStartDate) => setStartDate(newStartDate)}
      />
      <Text style={styles.text}>Slutdato</Text>
      <TextInput
        style={styles.inputBox}
        value={endDate}
        placeholder="dd-mm-åååå"
        onChangeText={(newEndDate) => setEndDate(newEndDate)}
      />
      <Text style={styles.text}>Seværdigheder</Text>
      <TextInput
        style={styles.inputBox}
        value={sights}
        onChangeText={(newSights) => setSights(newSights)}
      />
      <Text style={styles.text}>Spisesteder</Text>
      <TextInput
        style={styles.inputBox}
        value={eatingPlaces}
        onChangeText={(newEatingPlaces) => setEatingPlaces(newEatingPlaces)}
      />

      <TouchableOpacity style={styles.buttonNewTravel} onPress={addDocument}>
        <Text style={styles.buttonTextNewTravel}> Opret ny rejseplan</Text>
      </TouchableOpacity>

      <View style={styles.menuBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Hjem")}
        >
          <Text style={styles.buttonText}> Hjem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Rejser")}
        >
          <Text style={styles.buttonText}> Rejser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Kort")}
        >
          <Text style={styles.buttonText}> Kort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Hvid baggrund
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30, // Aftstand fra top af skærm
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
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
  buttonNewTravel: {
    alignItems: "center",
    backgroundColor: "#05a4c8", // Aqua blå
    padding: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  buttonTextNewTravel: {
    color: "#000000", // Sort
    fontSize: 15,
    fontWeight: "bold",
  },
  inputBox: {
    width: "70%",
    height: 30,
    borderColor: "black", //sort kant
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5", // Grå
    fontSize: 14,
  },
});
