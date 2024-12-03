import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { database } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "../Context";
import { Timestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const onChangeStartDate = (event, value) => {
    setStartDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChangeEndDate = (event, value) => {
    setEndDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  async function addDocument() {
    try {
      await addDoc(collection(database, userId), {
        Land: country,
        By: city,
        Ferietype: vacationType,
        Startdato: Timestamp.fromDate(new Date(startDate)),
        Slutdato: Timestamp.fromDate(new Date(endDate)),
        Seværdigheder: sights.split(",").map((sight) => sight.trim()), // Convert comma-separated string to array
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
      <DateTimePicker
        value={startDate}
        mode={"date"}
        onChange={onChangeStartDate}
        style={styles.inputBox}
      />
      <Text style={styles.text}>Slutdato</Text>
      <DateTimePicker
        value={endDate}
        mode={"date"}
        onChangeText={onChangeEndDate}
        style={styles.inputBox}
      />
      <Text style={styles.text}>Seværdigheder</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={(newSights) => setSights(newSights)}
        value={sights}
      />
      <Text style={styles.text}>Spisesteder</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={(newEatingPlaces) => setEatingPlaces(newEatingPlaces)}
        value={eatingPlaces}
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
    alignItems: "center", // Elementer placeres i midten af skærm
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
    backgroundColor: "#0d6fe5",
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
    backgroundColor: "#05a4c8",
    padding: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  buttonTextNewTravel: {
    color: "#000000",
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
    backgroundColor: "#f5f5f5",
    fontSize: 14,
  },
});
