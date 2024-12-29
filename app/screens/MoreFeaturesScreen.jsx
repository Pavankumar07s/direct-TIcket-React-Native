// import React from "react";
// import {
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Image,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { Ionicons } from "@expo/vector-icons";

// const services = [
//   {
//     id: "search",
//     title: "Search Train",
//     icon: "train-outline",
//     screen: "SearchTrain",
//     description: "Search for trains between stations",
//   },
//   {
//     id: "live",
//     title: "Train Live Status",
//     icon: "location-outline",
//     screen: "LiveStatus",
//     description: "Check real-time train location",
//   },
//   {
//     id: "schedule",
//     title: "Train Schedule",
//     icon: "time-outline",
//     screen: "Schedule",
//     description: "View complete train schedule",
//   },
//   {
//     id: "pnr",
//     title: "PNR Status",
//     icon: "document-text-outline",
//     screen: "PNRStatus",
//     description: "Check PNR status and booking details",
//   },
//   {
//     id: "seat",
//     title: "Seat Availability",
//     icon: "people-outline",
//     screen: "SeatAvailability",
//     description: "Check seat availability status",
//   },
//   {
//     id: "fare",
//     title: "Get Fare",
//     icon: "cash-outline",
//     screen: "Fare",
//     description: "Calculate fare for your journey",
//   },
// ];

// export default function MoreFeaturesScreen() {
//   const navigation = useNavigation();

//   return (
//     <>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Train Services</ThemedText>
//       </ThemedView>
//       <ScrollView contentContainerStyle={styles.servicesContainer}>
//         {services.map((service) => (
//           <TouchableOpacity
//             key={service.id}
//             style={styles.serviceCard}
//             onPress={() => navigation.navigate(service.screen)}
//           >
//             <View style={styles.iconContainer}>
//               <Ionicons name={service.icon} size={24} color="white" />
//             </View>
//             <View style={styles.serviceInfo}>
//               <ThemedText style={styles.serviceTitle}>
//                 {service.title}
//               </ThemedText>
//               <ThemedText style={styles.serviceDescription}>
//                 {service.description}
//               </ThemedText>
//             </View>
//             <Ionicons name="chevron-forward" size={24} color="#999" />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 20,
//     justifyContent: "center",
//     backgroundColor: "black",
//   },
//   servicesContainer: {
//     padding: 16,
//     paddingBottom: 10,
//   },
//   serviceCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1A1A1A",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//     borderWidth: 1, 
//     borderColor: 'grey', 
//     borderStyle: 'solid', 
//   },
//   iconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#333333",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 16,

//   },
//   serviceInfo: {
//     flex: 1,
//   },
//   serviceTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   serviceDescription: {
//     fontSize: 14,
//     color: "#666",
//   },
// });
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const services = [
  {
    id: "search",
    title: "Search Train",
    icon: "train-outline",
    screen: "SearchTrain",
    description: "Search for trains between stations",
    gradient: ['#2C2C2C', '#1A1A1A']
  },
  {
    id: "live",
    title: "Train Live Status", 
    icon: "location-outline",
    screen: "LiveStatus",
    description: "Check real-time train location",
    gradient: ['#333333', '#1F1F1F']
  },
  {
    id: "schedule",
    title: "Train Schedule",
    icon: "time-outline", 
    screen: "Schedule",
    description: "View complete train schedule",
    gradient: ['#2C2C2C', '#1A1A1A']
  },
  {
    id: "pnr",
    title: "PNR Status",
    icon: "document-text-outline",
    screen: "PNRStatus", 
    description: "Check PNR status and booking details",
    gradient: ['#333333', '#1F1F1F']
  },
  {
    id: "seat",
    title: "Seat Availability",
    icon: "people-outline",
    screen: "SeatAvailability",
    description: "Check seat availability status",
    gradient: ['#2C2C2C', '#1A1A1A']
  },
  {
    id: "fare",
    title: "Get Fare",
    icon: "cash-outline",
    screen: "Fare",
    description: "Calculate fare for your journey",
    gradient: ['#333333', '#1F1F1F']
  }
];

const ServiceCard = ({ service, onPress }) => (
  <TouchableOpacity 
    style={styles.cardContainer}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <LinearGradient
      colors={service.gradient}
      style={styles.cardGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={service.icon} size={28} color="#FFFFFF" />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{service.title}</ThemedText>
          <ThemedText style={styles.description}>{service.description}</ThemedText>
        </View>
        
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={24} color="#666666" />
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default function MoreFeaturesScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Train Services</ThemedText>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onPress={() => navigation.navigate(service.screen)}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingBottom: 20,
    backgroundColor: '#000000',
  },
  headerTitle: {
    fontSize: 28,
    padding: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    padding: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  arrowContainer: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});