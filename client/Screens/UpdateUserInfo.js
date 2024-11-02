import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useGlobalContext } from "../context/GlobalProvider";

const UpdateUserInfo = ({ navigation }) => {
  const { user, setUser } = useGlobalContext();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [password, setPassword] = useState(user.password);
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = async () => {
    if (!username || !email || !avatar || !password) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, username, email, avatar, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ ...user, username, email, avatar, password });
        alert("User information updated successfully.");
        navigation.goBack();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating user information.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e0f7fa" }}>
      <ScrollView>
        <View style={{ padding: 30 }}>
          <View style={{ marginBottom: 10 }}>
            <Icon
              name="arrow-left"
              size={24}
              color="#000"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>

          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <Text style={{ fontSize: 32, fontWeight: "700", marginVertical: 15, color: "#5959b3" }}>
              Update Your Info
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                borderWidth: 2,
                borderRadius: 25,
                padding: 15,
                borderColor: "#5959b3",
                backgroundColor: "#ffffff",
              }}
            >
              <Icon name="user" size={22} color="#5959b3" style={{ marginRight: 15, marginLeft: 4 }} />
              <TextInput
                placeholder="Enter your username"
                style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                borderWidth: 2,
                borderRadius: 25,
                padding: 15,
                borderColor: "#5959b3",
                backgroundColor: "#ffffff",
              }}
            >
              <Icon name="envelope" size={22} color="#5959b3" style={{ marginRight: 14 }} />
              <TextInput
                placeholder="Enter your email"
                style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                borderWidth: 2,
                borderRadius: 25,
                padding: 15,
                borderColor: "#5959b3",
                backgroundColor: "#ffffff",
              }}
            >
              <Icon name="lock" size={22} color="#5959b3" style={{ marginRight: 14 }} />
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? "eye-slash" : "eye"} size={22} color="#5959b3" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                borderWidth: 2,
                borderRadius: 25,
                padding: 15,
                borderColor: "#5959b3",
                backgroundColor: "#ffffff",
              }}
            >
              <Icon name="image" size={22} color="#5959b3" style={{ marginRight: 14 }} />
              <TextInput
                placeholder="Enter your avatar link"
                style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
                value={avatar}
                onChangeText={setAvatar}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                marginTop: 20,
                backgroundColor: "#5959b3",
                paddingVertical: 15,
                borderRadius: 25,
              }}
              onPress={handleUpdate}
            >
              <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Update Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateUserInfo;
