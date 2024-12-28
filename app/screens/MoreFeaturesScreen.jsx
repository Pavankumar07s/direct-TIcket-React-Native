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
    title: "SearchTrainService",
    icon: "train-outline",
    screen: "SearchTrain",
    description: "Search for trains between stations",
  },
  {
    id: "live",
    title: "GetTrainLiveStatusService",
    icon: "location-outline",
    screen: "LiveStatus",
    description: "Check real-time train location",
  },
  {
    id: "schedule",
    title: "GetTrainScheduleService",
    icon: "time-outline",
    screen: "Schedule",
    description: "View complete train schedule",
  },
  {
    id: "pnr",
    title: "GetPNRStatusService",
    icon: "document-text-outline",
    screen: "PNRStatus",
    description: "Check PNR status and booking details",
  },
  {
    id: "seat",
    title: "CheckSeatAvailabilityService",
    icon: "people-outline",
    screen: "SeatAvailability",
    description: "Check seat availability status",
  },
  {
    id: "fare",
    title: "GetFareService",
    icon: "cash-outline",
    screen: "Fare",
    description: "Calculate fare for your journey",
  },
];

export default function MoreFeaturesScreen() {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/banner.png")}
          style={styles.trainImage}
          resizeMode="contain"
        />
      </View>
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
              <Ionicons name={service.icon} size={24} color="#2196F3" />
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
  imageContainer: {
    width: "100%",
    height: 250, // Adjust the height as needed
    overflow: "hidden", // Ensure the image doesn't overflow
  },
  trainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensures the image is scaled to fit
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    justifyContent: "center",
  },
  servicesContainer: {
    padding: 16,
    paddingBottom: 10,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
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
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(33, 150, 243, 0.1)",
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
