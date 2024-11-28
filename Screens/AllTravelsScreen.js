import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import { useUser } from "../Context";

export default function AllTravelsScreen({ navigation }) {
  const { userId } = useUser();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchTravelPlans() {
      if (!userId) return; // Ensure userId is available
      try {
        const travelPlansRef = collection(database, userId); // Reference to the user's collection
        const snapshot = await getDocs(travelPlansRef);
        const fetchedPlans = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDestinations(fetchedPlans); // Store the fetched plans in state
      } catch (error) {
        console.error("Error fetching travel plans:", error);
      }
    }

    fetchTravelPlans();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Alle rejseplaner</Text>

      <View style={styles.destinationsContainer}>
        {destinations.map((destination, index) => (
          <TouchableOpacity
            key={index}
            style={styles.destinationBox}
            onPress={() =>
              navigation.navigate("RejseDetaljer", { travelPlans: destination })
            }
          >
            <Text style={styles.destinationText}>
              {destination.By}, {destination.Land}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  destinationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  destinationBox: {
    width: "45%",
    marginBottom: 15,
    marginTop: 40,
    backgroundColor: "#00e194",
    padding: 10,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
  },
  destinationText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
