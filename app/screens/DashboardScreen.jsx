import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen({ navigation }) {
  const services = [
    {
      id: "search",
      title: "Search Trains",
      icon: "search",
      screen: "SearchTrain",
      color: "#2196F3",
    },
    {
      id: "live",
      title: "Live Status",
      icon: "locate",
      screen: "LiveStatus",
      color: "#4CAF50",
    },
    {
      id: "schedule",
      title: "Train Schedule",
      icon: "time",
      screen: "Schedule",
      color: "#FF9800",
    },
    {
      id: "pnr",
      title: "PNR Status",
      icon: "document-text",
      screen: "PNRStatus",
      color: "#9C27B0",
    },
    {
      id: "seat",
      title: "Seat Availability",
      icon: "people",
      screen: "SeatAvailability",
      color: "#F44336",
    },
    {
      id: "fare",
      title: "Check Fare",
      icon: "cash",
      screen: "Fare",
      color: "#795548",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.card, { backgroundColor: service.color }]}
            onPress={() => navigation.navigate(service.screen)}
          >
            <Ionicons name={service.icon} size={32} color="#FFF" />
            <Text style={styles.cardTitle}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    paddingBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    color: "black",
  },
  cardTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
