import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // For editing mode

  // Load profile data from AsyncStorage
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem("name");
        const savedPhone = await AsyncStorage.getItem("phone");
        const savedGender = await AsyncStorage.getItem("gender");
        const savedProfileImage = await AsyncStorage.getItem("profileImage");

        if (savedName && savedPhone && savedGender && savedProfileImage) {
          setName(savedName);
          setPhone(savedPhone);
          setGender(savedGender);
          setProfileImage(savedProfileImage);
          setIsProfileComplete(true);
        }
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    };

    loadProfile();
  }, []);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera roll permissions are required to upload an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleProfileCompletion = async () => {
    if (!name || !phone || !gender || !profileImage) {
      Alert.alert("Error", "Please fill all fields and select an image.");
      return;
    }

    try {
      // Save profile data to AsyncStorage
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("phone", phone);
      await AsyncStorage.setItem("gender", gender);
      await AsyncStorage.setItem("profileImage", profileImage);

      setIsProfileComplete(true);
      setIsEditing(false); // Exit editing mode if saving
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save profile data:", error);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true); // Enable editing mode
  };

  return (
    <View style={styles.container}>
      {isProfileComplete && !isEditing ? (
        <>
          <Text style={styles.title}>Your Profile</Text>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.profileImageContainer}
          >
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.info}>{name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.info}>{phone}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.info}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</Text>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            {isEditing ? "Edit Your Profile" : "Complete Your Profile"}
          </Text>
          <Text style={styles.subtitle}>
            Don’t worry, only you can see your personal data.
          </Text>

          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.profileImageContainer}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="+1 Enter Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={handleProfileCompletion}
          >
            <Text style={styles.buttonText}>
              {isEditing ? "Save Changes" : "Complete Profile"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#5c311c",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileScreen;
