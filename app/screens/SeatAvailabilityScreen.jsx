import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { trainServices } from "../services/api";

export default function SeatAvailabilityScreen() {
  const [trainNumber, setTrainNumber] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState("");
  const [quota, setQuota] = useState("");
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState(null);

  const validateInputs = () => {
    if (!trainNumber || trainNumber.length < 5) {
      Alert.alert("Invalid Input", "Please enter a valid train number");
      return false;
    }
    if (!fromStation || !toStation) {
      Alert.alert("Invalid Input", "Please enter both stations");
      return false;
    }
    if (!date) {
      Alert.alert("Invalid Input", "Please enter a valid date");
      return false;
    }
    return true;
  };

  const handleCheck = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const data = await trainServices.checkSeatAvailability({
        trainNumber,
        fromStation,
        toStation,
        date,
        quota,
      });
      setAvailability(data);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to check seat availability. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Check Seat Availability</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Train Number"
          value={trainNumber}
          onChangeText={setTrainNumber}
          keyboardType="numeric"
          placeholderTextColor="#B0B0B0"
          maxLength={5}
        />
        <TextInput
          style={styles.input}
          placeholder="From Station"
          value={fromStation}
          placeholderTextColor="#B0B0B0"
          onChangeText={setFromStation}
        />
        <TextInput
          style={styles.input}
          placeholder="To Station"
          value={toStation}
          placeholderTextColor="#B0B0B0"
          onChangeText={setToStation}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (DD/MM/YYYY)"
          value={date}
          placeholderTextColor="#B0B0B0"
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Quota (GEN/TATKAL/LADIES)"
          value={quota}
          placeholderTextColor="#B0B0B0"
          onChangeText={setQuota}
        />
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleCheck}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Check Availability</Text>
          )}
        </TouchableOpacity>
      </View>

      {availability && (
        <View style={styles.availabilityContainer}>
          {availability.classes.map((classType) => (
            <View key={classType.name} style={styles.classCard}>
              <Text style={styles.className}>{classType.name}</Text>
              <View style={styles.availabilityRow}>
                <Text
                  style={[
                    styles.availabilityStatus,
                    { color: classType.available ? "#4CAF50" : "#F44336" },
                  ]}
                >
                  {classType.status}
                </Text>
                <Text style={styles.fare}>₹{classType.fare}</Text>
              </View>
              {classType.warning && (
                <Text style={styles.warning}>{classType.warning}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  formContainer: {
    marginBottom: 20,
    backgroundColor: "black",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: "white",
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 12,
    backgroundColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
  },
  checkButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "grey",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  availabilityContainer: {
    marginTop: 20,
  },
  classCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  className: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  availabilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  availabilityStatus: {
    fontSize: 16,
    fontWeight: "600",
  },
  fare: {
    fontSize: 16,
    color: "#888",
  },
  warning: {
    marginTop: 8,
    fontSize: 14,
    color: "#F44336",
    fontStyle: "italic",
  },
});
