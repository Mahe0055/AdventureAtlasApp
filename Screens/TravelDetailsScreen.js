import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { Alert } from "react-native";
import { arrayRemove } from "firebase/firestore";

export default function TravelDetailscreen({ navigation, route }) {
  const { travelPlans } = route.params;
  const [editableField, setEditableField] = useState(null);
  const [newValue, setNewValue] = useState("");

  async function handleEdit(field, value) {
    setEditableField(field);
    setNewValue(value);
  }

  async function SaveNewValue() {
    try {
      const travelDocRef = doc(
        database,
        "Y1jVeerB67YoPCBl9dnH2S3HdGw2",
        travelPlans.id
      );

      // Opdaterer specifikt felt i FB Firestore
      await updateDoc(travelDocRef, {
        [editableField]: newValue,
      });

      // Opdaterer state ændringer på skærmen
      const updatedTravelPlans = {
        ...travelPlans,
        [editableField]: newValue,
      };
      route.params = { travelPlans: updatedTravelPlans };

      setEditableField(null);
      Alert.alert("Succesfuld", "Dine ændringer er gemt.");
    } catch (error) {
      console.error("Fejl ved gem af data: ", error);
      Alert.alert("Fejl", "Noget gik galt. Prøv venligst igen.");
    }
  }

  async function handleDelete(field, value) {
    try {
      const travelDocRef = doc(
        database,
        "Y1jVeerB67YoPCBl9dnH2S3HdGw2",
        travelPlans.id
      );

      if (field === "Seværdigheder") {
        // Fjerner fra Seværdigheder array
        await updateDoc(travelDocRef, {
          Seværdigheder: arrayRemove(value),
        });
        // Opdaterer lokal state for øjeblikkelig UI opdatering
        setUpdatedTravelPlans({
          ...updatedTravelPlans,
          Seværdigheder: travelPlans.Seværdigheder.filter(
            (sight) => sight !== value
          ),
        });
      }

      if (field === "Spisesteder") {
        await updateDoc(travelDocRef, {
          Spisesteder: arrayRemove(value),
        });
        setUpdatedTravelPlans({
          ...updatedTravelPlans,
          Spisesteder: updatedTravelPlans.Spisesteder.filter(
            (place) => place !== value
          ),
        });
      }

      Alert.alert("Succesfuld", `${value} er blevet slettet.`);
    } catch (error) {
      console.error("Fejl ved sletning af data: ", error);
      Alert.alert("Fejl", "Noget gik galt. Prøv venligst igen.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>
        {travelPlans.By}, {travelPlans.Land}
      </Text>

      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <Text style={styles.text}>
          Ferietype:{" "}
          {editableField === "Ferietype" ? (
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
            />
          ) : (
            travelPlans.Ferietype
          )}
        </Text>
        <TouchableOpacity
          onPress={() => handleEdit("Ferietype", travelPlans.Ferietype)}
        >
          <AntDesign name="edit" size={20} color="#34c906" />
        </TouchableOpacity>
        {editableField === "Ferietype" && (
          <TouchableOpacity onPress={SaveNewValue}>
            <AntDesign name="checkcircle" size={20} color="#28a745" />
          </TouchableOpacity>
        )}

        <Text style={styles.text}>
          Startdato:{" "}
          {editableField === "Startdato" ? (
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
            />
          ) : (
            travelPlans.Startdato
          )}
        </Text>
        <TouchableOpacity
          onPress={() => handleEdit("Startdato", travelPlans.Startdato)}
        >
          <AntDesign name="edit" size={20} color="#34c906" />
        </TouchableOpacity>
        {editableField === "Startdato" && (
          <TouchableOpacity onPress={SaveNewValue}>
            <AntDesign name="checkcircle" size={20} color="#28a745" />
          </TouchableOpacity>
        )}

        <Text style={styles.text}>
          Slutdato:{" "}
          {editableField === "Slutdato" ? (
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
            />
          ) : (
            travelPlans.Slutdato
          )}
        </Text>
        <TouchableOpacity
          onPress={() => handleEdit("Slutdato", travelPlans.Slutdato)}
        >
          <AntDesign name="edit" size={20} color="#34c906" />
        </TouchableOpacity>
        {editableField === "Slutdato" && (
          <TouchableOpacity onPress={SaveNewValue}>
            <AntDesign name="checkcircle" size={20} color="#28a745" />
          </TouchableOpacity>
        )}

        <Text style={styles.text}>Seværdigheder:</Text>
        {travelPlans.Seværdigheder.map((sights, index) => (
          <View key={index} style={styles.listItemContainer}>
            <Text style={styles.listItem}>
              {editableField === `Seværdigheder-${index}` ? (
                <TextInput
                  style={styles.input}
                  value={newValue}
                  onChangeText={setNewValue}
                />
              ) : (
                `• ${sights}`
              )}
            </Text>
            <TouchableOpacity
              onPress={() => handleEdit(`Seværdigheder-${index}`, sights)}
            >
              <AntDesign name="edit" size={20} color="#34c906" />
            </TouchableOpacity>
            {editableField === `Seværdigheder-${index}` && (
              <TouchableOpacity onPress={SaveNewValue}>
                <AntDesign name="checkcircle" size={20} color="#28a745" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => handleDelete("Seværdigheder", sights)}
            >
              <AntDesign name="delete" size={20} color="#f51f07" />
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.text}>Spisesteder:</Text>
        {travelPlans.Spisesteder.map((eatingPlaces, index) => (
          <View key={index} style={styles.listItemContainer}>
            <Text style={styles.listItem}>
              {editableField === `Spisesteder-${index}` ? (
                <TextInput
                  style={styles.input}
                  value={newValue}
                  onChangeText={setNewValue}
                />
              ) : (
                `• ${eatingPlaces}`
              )}
            </Text>
            <TouchableOpacity
              onPress={() => handleEdit(`Spisesteder-${index}`, eatingPlaces)}
            >
              <AntDesign name="edit" size={20} color="#34c906" />
            </TouchableOpacity>
            {editableField === `Spisesteder-${index}` && (
              <TouchableOpacity onPress={SaveNewValue}>
                <AntDesign name="checkcircle" size={20} color="#28a745" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => handleDelete("Spisesteder", eatingPlaces)}
            >
              <AntDesign name="delete" size={20} color="#f51f07" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
          <Text style={styles.buttonText}> Rejser </Text>
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
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
  text: {
    fontSize: 20,
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
  listItem: {
    fontSize: 20,
  },
  detailsContainer: {
    marginRight: "25%",
    gap: 20,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc", // Grå
    padding: 5,
    marginTop: 5,
  },
});
