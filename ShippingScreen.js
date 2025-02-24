import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const calculateFutureDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ShippingOptionsScreen = () => {
  const [selectedOption, setSelectedOption] = useState("Economy");
  const navigation = useNavigation();


  const shippingOptions = [
    { id: "Economy", label: "Economy", date: calculateFutureDate(18) },
    { id: "Regular", label: "Regular", date: calculateFutureDate(13) }, 
    { id: "Cargo", label: "Cargo", date: calculateFutureDate(6) },   
    
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {shippingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionContainer,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(option.id)}
          >
            <MaterialIcons
              name="local-shipping"
              size={24}
              color={selectedOption === option.id ? "#5c311c" : "#999"}
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.optionLabel}>{option.label}</Text>
              {option.date && (
                <Text style={styles.optionDate}>Estimated Arrival: {option.date}</Text>
              )}
              {option.address && <Text style={styles.optionAddress}>{option.address}</Text>}
            </View>
            <MaterialIcons
              name={
                selectedOption === option.id ? "radio-button-checked" : "radio-button-unchecked"
              }
              size={24}
              color={selectedOption === option.id ? "#5c311c" : "#999"}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedOption: {
    borderColor: "#5c311c",
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  optionDate: {
    fontSize: 14,
    color: "#666",
  },
  optionAddress: {
    fontSize: 14,
    color: "#666",
  },
  applyButton: {
    backgroundColor: "#5c311c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShippingOptionsScreen;
