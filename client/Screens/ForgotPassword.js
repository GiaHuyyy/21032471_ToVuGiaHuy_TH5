import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Password reset link has been sent to your email.");
        navigation.navigate("ChangePassword", { email });
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
          <Text style={{ fontSize: 32, fontWeight: "700", marginVertical: 15, color: "#5959b3" }}>Reset Password</Text>
          <Text style={{ fontSize: 15, color: "gray", textAlign: "center" }}>
            Enter your email to reset your password
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
            <Icon name="envelope" size={22} color="#5959b3" style={{ marginRight: 15 }} />
            <TextInput
              placeholder="Enter your email"
              style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{ width: "100%", marginTop: 20, backgroundColor: "#5959b3", paddingVertical: 15, borderRadius: 25 }}
          onPress={handleResetPassword}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
