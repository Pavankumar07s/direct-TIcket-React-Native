import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { trainServices } from "../services/api";

export default function PNRStatusScreen() {
  const [pnrNumber, setPNRNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const validatePNR = () => {
    if (!pnrNumber || pnrNumber.length !== 10) {
      Alert.alert("Invalid Input", "Please enter a valid 10-digit PNR number");
      return false;
    }
    return true;
  };

  const handleCheck = async () => {
    if (!validatePNR()) return;

    try {
      setLoading(true);
      const data = await trainServices.getPNRStatus(pnrNumber);
      setStatus(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch PNR status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check PNR Status</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter 10-digit PNR Number"
          value={pnrNumber}
          onChangeText={setPNRNumber}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#B0B0B0"
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.checkButton, loading && styles.disabledButton]}
          onPress={handleCheck}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Check Status</Text>
          )}
        </TouchableOpacity>
      </View>

      {status && (
        <View style={styles.statusContainer}>
          <View style={styles.journeyInfo}>
            <Text style={styles.trainName}>{status.trainName}</Text>
            <Text style={styles.trainNumber}>#{status.trainNumber}</Text>
            <Text style={styles.date}>{status.dateOfJourney}</Text>
          </View>

          <View style={styles.passengerList}>
            <Text style={styles.sectionTitle}>Passenger Details</Text>
            {status.passengers.map((passenger, index) => (
              <View key={index} style={styles.passengerCard}>
                <Text style={styles.passengerNumber}>
                  Passenger {index + 1}
                </Text>
                <View style={styles.statusRow}>
                  <Text style={styles.label}>Booking Status:</Text>
                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          passenger.status === "Confirmed"
                            ? "#4CAF50"
                            : "#F44336",
                      },
                    ]}
                  >
                    {passenger.status}
                  </Text>
                </View>
                <View style={styles.detailsRow}>
                  <Text>Coach: {passenger.coach}</Text>
                  <Text>Berth: {passenger.berth}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white", 
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "black",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "gray",
    borderRadius: 8,
    paddingLeft: 16,
    backgroundColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
  },
  checkButton: {
    marginLeft: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "gray",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  statusContainer: {
    marginTop: 20,
  },
  journeyInfo: {
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  trainName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  trainNumber: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  passengerList: {
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  passengerCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  passengerNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  detailsRow: {
    marginTop: 8,
  },
});
