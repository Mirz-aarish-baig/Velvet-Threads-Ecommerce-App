import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from "firebase/auth";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [addSuccess, setAddSuccess] = useState('');
  const navigation = useNavigation();
  const { logout } = useAuth();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Products Not Available..!');
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredProducts(products);
    } else {
      const filteredData = products.filter(product =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filteredData);
    }
  };

  const handleProductClick = (item) => {
    navigation.navigate('productDetails', { product: item });
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
       
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
     
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        logout(); 
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };
  

  const handleGoToCart = () => {
    navigation.navigate('Cart', { cart: cart });
  };

  const handleGoToProfile = () => {
    navigation.navigate('profile'); // Navigate to the Profile screen
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={() => handleProductClick(item)}>
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/150' }}
          style={styles.productImage}
        />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      {addSuccess && <Text style={styles.successMessage}>{addSuccess}</Text>}
    </View>
  );

  if (loading) {
    return <Text style={styles.centerText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.centerText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileIconContainer} onPress={handleGoToProfile}>
        <Image
          source={require('../../assets/profilepic.png')} // Replace with your profile icon path
          style={styles.profileIcon}
        />
      </TouchableOpacity>

      <Image
        source={require('../../assets/display.png')}
        style={styles.displayImage}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToCart} style={styles.cartButton}>
        <Text style={styles.cartButtonText}>My Cart</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 80,
  },
  profileIconContainer: {
    position: 'absolute',
    top: 40,
    right: 300,
    zIndex: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'green',
  },
  displayImage: {
    width: 190,
    height: 90,
    marginBottom: 25,
    marginLeft: 74,
  },
  searchInput: {
    height: 40,
    borderColor: '#5c311c',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f1f1f1',
    marginHorizontal: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 38,
    right: 6,
    backgroundColor: '#5c311c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: '#5c311c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productList: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    margin: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#5c311c',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});

export default HomeScreen;
