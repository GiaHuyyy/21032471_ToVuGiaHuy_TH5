import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const ChangePassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Password changed successfully.");
        navigation.navigate("SignIn");
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
          <Text style={{ fontSize: 32, fontWeight: "700", marginVertical: 15, color: "#5959b3" }}>Change Password</Text>
          <Text style={{ fontSize: 15, color: "gray", textAlign: "center" }}>Enter your new password</Text>
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
            <Icon name="lock" size={22} color="#5959b3" style={{ marginRight: 15 }} />
            <TextInput
              placeholder="Enter new password"
              secureTextEntry={!showNewPassword}
              style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon name={showNewPassword ? "eye-slash" : "eye"} size={22} color="#5959b3" />
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
            <Icon name="lock" size={22} color="#5959b3" style={{ marginRight: 15 }} />
            <TextInput
              placeholder="Confirm new password"
              secureTextEntry={!showConfirmPassword}
              style={{ flex: 1, outlineStyle: "none", fontSize: 16 }}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={22} color="#5959b3" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{ width: "100%", marginTop: 20, backgroundColor: "#5959b3", paddingVertical: 15, borderRadius: 25 }}
          onPress={handleChangePassword}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
