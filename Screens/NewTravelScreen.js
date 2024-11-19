import { StyleSheet, Text, View } from "react-native";
import { database } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export default function NewTravelScreen() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [vacationType, setVacationType] = useState("");
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [sights, setSights] = useState([]);
  const [eatingPlaces, setEatingPlaces] = useState([]);

  async function addDocument() {
    try {
      await addDoc(collection(database, userId), {
        Land: country,
        By: city,
        Ferietype: vacationType,
        Startdato: startDate,
        Slutdato: endDate,
        Seværdigheder: sights,
        Spisesteder: eatingPlaces,
      });
    } catch (error) {
      console.log("error addDocument " + error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Planlæg en ny rejse</Text>
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
        onChangeText={(newStartDate) => setStartDate(newStartDate)}
        value={startDate}
      />
      <Text style={styles.text}>Slutdato</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={(newEndDate) => setEndDate(newEndDate)}
        value={endDate}
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

      <TouchableOpacity style={styles.button} onPress={addDocument}>
        <Text style={styles.buttonText}> Opret ny rejseplan</Text>
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
