import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Pls fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/forgot-pasword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset link has been sent to your email!");
        navigation.navigate("ChangePassword", { email });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to sent email. Please try again.");
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
                navigation.navigate("SignIn");
              }}
            />
          </View>
  
          <View style={{ alignItems: "center", marginBottom: 30, rowGap: 20 }}>
            <Text style={{ fontSize: 32, fontWeight: "700", color: "#5959b3" }}>Reset Password</Text>
            <Text style={{ fontSize: 15, color: "gray", textAlign: "center" }}>
              Enter your email to reset your password
            </Text>
            <Image
              style={{ width: "100%", height: 200, borderRadius: 25 }}
              source={{
                uri: "https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg",
              }}
              resizeMode="cover"
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
            onPress={handleForgotPassword}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Send Reset Link</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
