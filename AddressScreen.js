import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Swipeable } from "react-native-gesture-handler";



const AddressScreen = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [mapRegion, setMapRegion] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {

        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const savedAddresses = await AsyncStorage.getItem("addresses");
            if (savedAddresses) {
                setAddresses(JSON.parse(savedAddresses));
            }
        } catch (error) {
            console.error("Failed to load addresses:", error);
        }
    };

    const saveAddresses = async (newAddresses) => {
        try {
            await AsyncStorage.setItem("addresses", JSON.stringify(newAddresses));
            setAddresses(newAddresses);
        } catch (error) {
            console.error("Failed to save addresses:", error);
        }
    };

    const handleAddAddress = async () => {
        setShowMap(true);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Please grant location access to continue.");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    const handleSaveLocation = () => {
        if (!mapRegion) {
            Alert.alert("Error", "No location selected.");
            return;
        }

        const newAddress = {
            id: Date.now().toString(),
            label: "New Address",
            address: `Lat: ${mapRegion.latitude.toFixed(4)}, Lng: ${mapRegion.longitude.toFixed(4)}`,
        };

        const updatedAddresses = [...addresses, newAddress];
        saveAddresses(updatedAddresses);
        setShowMap(false);
    };

    const handleDeleteAddress = (id) => {
        const updatedAddresses = addresses.filter((item) => item.id !== id);
        saveAddresses(updatedAddresses);
    };

    const renderRightActions = (id) => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteAddress(id)}
        >
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
            overshootRight={false}
        >
            <TouchableOpacity
                style={[
                    styles.addressContainer,
                    item.id === selectedId && styles.selectedAddress,
                ]}
                onPress={() => setSelectedId(item.id)}
            >
                <Ionicons
                    name={item.id === selectedId ? "radio-button-on" : "radio-button-off"}
                    size={24}
                    color="#5c311c"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.addressLabel}>{item.label}</Text>
                    <Text style={styles.addressText}>{item.address}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );

    return (
        <View style={styles.container}>


            {!showMap ? (
                <>
                    <FlatList
                        data={addresses}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.addressList}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
                        <Ionicons name="add-circle-outline" size={24} color="#5c311c" />
                        <Text style={styles.addButtonText}>Add New Shipping Address</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => {
                            if (!selectedId) {
                                Alert.alert("Select Address", "Please select an address before proceeding.");
                            } else {
                                navigation.navigate("shipping");
                            }
                        }}
                    >
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>

                </>
            ) : (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        region={mapRegion}
                        onRegionChangeComplete={(region) => setMapRegion(region)}
                    >
                        {mapRegion && (
                            <Marker
                                coordinate={{
                                    latitude: mapRegion.latitude,
                                    longitude: mapRegion.longitude,
                                }}
                            />
                        )}
                    </MapView>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
                        <Text style={styles.saveButtonText}>Save Location</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },

    addressList: {
        flex: 1,
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 9,
        marginTop: 9,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedAddress: {
        borderColor: "#5c311c",
    },
    textContainer: {
        marginLeft: 16,
    },
    addressLabel: {
        fontWeight: "bold",
        fontSize: 16,
    },
    addressText: {
        fontSize: 14,
        color: "#555",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    addButtonText: {
        marginLeft: 8,
        color: "#5c311c",
        fontSize: 16,
    },
    applyButton: {
        backgroundColor: "#5c311c",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    applyButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    mapContainer: {
        flex: 1,
        marginTop: 16,
    },
    map: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: "#5c311c",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 16,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "#5c311c",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        borderRadius: 8,
        marginVertical: 10,
    },
    deleteButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bolde'
    },
});

export default AddressScreen;
