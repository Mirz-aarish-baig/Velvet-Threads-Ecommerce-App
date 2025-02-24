import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddCardScreen = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const scaleAnimation = new Animated.Value(1);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      alert('Card Saved!');
    });
  };

  return (
    <View style={styles.container}>
     
    

      {/* Card Preview */}
      <View style={styles.cardContainer}>
        <Image source={require('../../assets/credit.png')} style={styles.cardImage} />
        <Text style={styles.cardNumber}>{cardNumber || '4716 9627 1635 8047'}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardDetailText}>{cardHolderName || 'Card Holder Name'}</Text>
          <Text style={styles.cardDetailText}>{expiryDate || 'MM/YY'}</Text>
        </View>
      </View>

  
      <TextInput
        style={styles.input}
        placeholder="Card Holder Name"
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        keyboardType="number-pad"
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        keyboardType="number-pad"
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        keyboardType="number-pad"
        secureTextEntry
        onChangeText={setCvv}
      />

      
      <View style={styles.saveCardContainer}>
        <TouchableOpacity onPress={() => setSaveCard(!saveCard)} style={styles.checkbox}>
          {saveCard && <View style={styles.checkedBox} />}
        </TouchableOpacity>
        <Text style={styles.saveCardText}>Save Card</Text>
      </View>

      
      <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
        <TouchableOpacity style={styles.addButton} onPress={handlePress}>
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
 
  
  cardContainer: {
    
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardDetailText: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    width: 14,
    height: 14,
    backgroundColor: '#5c311c',
  },
  saveCardText: {
    color: '#5c311c',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#5c311c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCardScreen;
