import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

const services = [
  {
    id: "search",
    title: "Search Train",
    icon: "train-outline",
    screen: "SearchTrain",
    description: "Search for trains between stations",
  },
  {
    id: "live",
    title: "Train Live Status",
    icon: "location-outline",
    screen: "LiveStatus",
    description: "Check real-time train location",
  },
  {
    id: "schedule",
    title: "Train Schedule",
    icon: "time-outline",
    screen: "Schedule",
    description: "View complete train schedule",
  },
  {
    id: "pnr",
    title: "PNR Status",
    icon: "document-text-outline",
    screen: "PNRStatus",
    description: "Check PNR status and booking details",
  },
  {
    id: "seat",
    title: "Seat Availability",
    icon: "people-outline",
    screen: "SeatAvailability",
    description: "Check seat availability status",
  },
  {
    id: "fare",
    title: "Get Fare",
    icon: "cash-outline",
    screen: "Fare",
    description: "Calculate fare for your journey",
  },
];

export default function MoreFeaturesScreen() {
  const navigation = useNavigation();

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Train Services</ThemedText>
      </ThemedView>
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => navigation.navigate(service.screen)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={service.icon} size={24} color="white" />
            </View>
            <View style={styles.serviceInfo}>
              <ThemedText style={styles.serviceTitle}>
                {service.title}
              </ThemedText>
              <ThemedText style={styles.serviceDescription}>
                {service.description}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: "black",
  },
  servicesContainer: {
    padding: 16,
    paddingBottom: 10,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1, 
    borderColor: 'grey', 
    borderStyle: 'solid', 
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,

  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
  },
});
