import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUp = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleRegister = async () => {
    if (user && email && password && avatar && isChecked) {
      try {
        const response = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user, email, password, avatar }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          navigation.navigate("SignIn");
          alert("User registered successfully");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to register. Please try again.");
      }
    } else {
      alert("Please fill all fields and agree to the terms.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e0f7fa", padding: 30 }}>
      <View style={{ marginBottom: 20 }}>
        <Icon
          name="arrow-left"
          size={24}
          color="#000"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        />
      </View>

      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <Text style={{ fontSize: 32, fontWeight: "700", marginVertical: 15, color: "#5959b3" }}>Nice to see you</Text>
        <Text style={{ fontSize: 15, color: "gray", textAlign: "center" }}>Create your account</Text>
      </View>

      {/* Form */}
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
          <Icon name="user" size={22} color="#5959b3" style={{ marginRight: 15 }} />
          <TextInput
            placeholder="Enter your username"
            style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
            value={user}
            onChangeText={setUser}
          />
        </View>

        {/* Input cho email */}
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
          <Icon name="envelope" size={22} color="#5959b3" style={{ marginRight: 15 }} />
          <TextInput
            placeholder="Enter your email"
            style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Input cho password */}
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
          <Icon name="lock" size={22} color="#5959b3" style={{ marginRight: 15 }} />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Input cho link ảnh */}
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
          <Icon name="image" size={22} color="#5959b3" style={{ marginRight: 15 }} />
          <TextInput
            placeholder="Enter your avatar link"
            style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
            value={avatar}
            onChangeText={setAvatar}
          />
        </View>
      </View>

      {/* Checkbox và điều khoản */}
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
        <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? "#4630EB" : undefined} />
        <Text style={{ marginLeft: 10 }}>
          I agree with <Text style={{ color: "#ED6263", textDecorationLine: "underline" }}>Terms & Conditions</Text>
        </Text>
      </View>

      {/* Nút Continue */}
      <View>
        <TouchableOpacity
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: "#5959b3",
            paddingVertical: 15,
            borderRadius: 25,
          }}
          onPress={handleRegister}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Quản Lý Thông Tin */}
      <View>
        <TouchableOpacity
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: "#5959b3",
            paddingVertical: 15,
            borderRadius: 25,
          }}
          onPress={() => {
            navigation.navigate("QuanLy");
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Quản Lý Thông Tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
