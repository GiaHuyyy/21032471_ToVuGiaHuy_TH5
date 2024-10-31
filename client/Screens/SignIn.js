import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState("tovugiahuy@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("Home", {
          screen: "Home",
          params: {
            username: data.username,
            avatar: data.avatar,
          },
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e0f7fa" }}>
      <View style={{ padding: 30 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 32, fontWeight: "700", marginVertical: 15, color: "#5959b3", textAlign: "center" }}>
            Welcome back!
          </Text>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/registration-flat-modern-design-illustration_566886-499.jpg",
            }}
            style={{ width: "100%", height: 200, borderRadius: 25 }}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              borderWidth: 2,
              borderRadius: 25,
              padding: 10,
              borderColor: "#5959b3",
              backgroundColor: "#ffffff",
            }}
          >
            <Icon name="user" size={22} color="#5959b3" style={{ marginRight: 15 }} />
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
              padding: 10,
              borderColor: "#5959b3",
              backgroundColor: "#ffffff",
            }}
          >
            <Icon name="lock" size={22} color="#5959b3" style={{ marginRight: 15 }} />
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
            style={{ marginBottom: 20 }}
          >
            <Text style={{ color: "#5959b3", textAlign: "right", fontSize: 16 }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ width: "100%", marginTop: 20, backgroundColor: "#5959b3", paddingVertical: 10, borderRadius: 25 }}
          onPress={handleLogin}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: "100%", marginTop: 20, backgroundColor: "#5959b3", paddingVertical: 10, borderRadius: 25 }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
