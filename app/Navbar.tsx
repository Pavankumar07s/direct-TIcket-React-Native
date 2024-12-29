import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Navbar = ({ onMenuPress, onProfilePress }) => {
  return (
    <View style={styles.container}>
      {/* Left: Hamburger Menu */}
      <TouchableOpacity onPress={onMenuPress} style={styles.iconContainer}>
        <Image
          source={require('../assets/images/menu-fill.png')} // Replace with your hamburger icon
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Center: Organization Name */}
      <Text style={styles.title}>DirectTickets</Text>

      {/* Right: Profile Button */}
      <TouchableOpacity onPress={onProfilePress} style={styles.iconContainer}>
        <Image
          source={require('../assets/images/account.png')} // Replace with your profile icon
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#000', // Adjust to your theme
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#fff', 
  },
});

export default Navbar;
