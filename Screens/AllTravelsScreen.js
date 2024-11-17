import { StyleSheet, Text, View } from "react-native";

export default function AllTravelsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hej med dig</Text>
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
