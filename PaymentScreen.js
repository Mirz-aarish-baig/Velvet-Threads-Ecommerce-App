import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleConfirmPayment = () => {
    if (selectedOption) {
      alert(`Payment method selected: ${selectedOption}`);
      navigation.navigate("Home"); 
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Credit & Debit Card</Text>
        <TouchableOpacity
          style={styles.cardOption}
          onPress={() => navigation.navigate('Credit')}
        >
          <Icon name="credit-card" size={24} color="#5c311c" />
          <Text style={styles.optionText}>Add Card</Text>
          <Icon name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>More Payment Options</Text>
        <TouchableOpacity
          style={[styles.paymentOption, selectedOption === "Paypal" && styles.selectedOption]}
          onPress={() => handleOptionSelect("Paypal")}
        >
          <Icon name="paypal" size={24} color="#3b7bbf" />
          <Text style={styles.optionText}>Paypal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, selectedOption === "Apple Pay" && styles.selectedOption]}
          onPress={() => handleOptionSelect("Apple Pay")}
        >
          <Icon name="apple" size={24} color="#000" />
          <Text style={styles.optionText}>Apple Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, selectedOption === "Google Pay" && styles.selectedOption]}
          onPress={() => handleOptionSelect("Google Pay")}
        >
          <Icon name="google" size={24} color='rgb(220, 190, 90)' />
          <Text style={styles.optionText}>Google Pay</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
 
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  cardOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#654321",
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#5c311c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PaymentScreen;
