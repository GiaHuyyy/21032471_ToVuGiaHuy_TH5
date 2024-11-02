import { Text, View, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useGlobalContext } from "../context/GlobalProvider";

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState("@giahuy");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useGlobalContext();
  const handleLogIn = async () => {
    if (!username || !password) {
      alert("Pls fill all fields!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sử dụng route.params để truyền dữ liệu
        // navigation.navigate("Home", {
        //   screen: "Home",
        //   params: {
        //     username: data.username,
        //     avatar: data.avatar,
        //   },
        // });

        // Sử dụng context để truyền dữ liệu
        setUser(data);
        navigation.navigate("Home");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Wrong!");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e0f7fa" }}>
      <ScrollView>
        <View style={{ padding: 30 }}>
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 32, fontWeight: 700, marginVertical: 15, color: "#5959b3", textAlign: "center" }}>
              Wellcome back!
            </Text>
            <Image
              style={{ width: "100%", height: 200, borderRadius: 25 }}
              source={{
                uri: "https://img.freepik.com/premium-vector/registration-flat-modern-design-illustration_566886-499.jpg",
              }}
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
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderColor: "#5959b3",
                backgroundColor: "#fff",
                paddingLeft: 15,
              }}
            >
              <Icon name="user" size={22} color="#5959b3" />
              <TextInput
                style={{ flex: 1, height: "100%", outline: "none", fontSize: 16, paddingLeft: 10 }}
                placeholder="Enter your username"
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
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderColor: "#5959b3",
                backgroundColor: "#fff",
              }}
            >
              <Icon name="lock" size={22} color="#5959b3" />
              <TextInput
                style={{ flex: 1, height: "100%", outline: "none", fontSize: 16, paddingLeft: 10 }}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? "eye-slash" : "eye"} size={22} color="#5959b3" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={{ color: "#5959b3", textAlign: "right", fontSize: 16 }}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginBottom: 20, backgroundColor: "#5959b3", paddingVertical: 10, borderRadius: 25 }}
              onPress={() => handleLogIn()}
            >
              <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginBottom: 20, backgroundColor: "#5959b3", paddingVertical: 10, borderRadius: 25 }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
