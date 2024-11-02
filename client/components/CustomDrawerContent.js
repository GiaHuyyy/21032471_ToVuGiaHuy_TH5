import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useGlobalContext } from "../context/GlobalProvider";

const CustomDrawerContent = () => {
  const { user } = useGlobalContext();
  console.log("Id User in CustomDrawerContent:", user.id);
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleteModalVisible(false);
    try {
      const response = await fetch("http://localhost:5000/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account deleted successfully.");
        navigation.navigate("SignIn");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting account.");
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate("SignIn");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate("UpdateUserInfo")}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <Icon name="edit" size={20} color="green" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, color: "green" }}>Cập nhật thông tin</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <Icon name="trash" size={20} color="red" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, color: "red" }}>Xóa tài khoản</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="sign-out" size={20} color="blue" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, color: "blue" }}>Logout</Text>
        </View>
      </TouchableOpacity>

      {/* Delete Account Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "#fff", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 20, textAlign: "center" }}>
              Are you sure you want to delete your account?
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  height: 40,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "red",
                }}
              >
                <Text style={{ color: "red", fontSize: 14, fontWeight: 500 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteAccount}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  height: 40,
                  backgroundColor: "#5959b3",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "#fff", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 20, textAlign: "center" }}>
              Are you sure you want to logout?
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
              <TouchableOpacity
                onPress={() => setLogoutModalVisible(false)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  height: 40,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "red",
                }}
              >
                <Text style={{ color: "red", fontSize: 14, fontWeight: 500 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  height: 40,
                  backgroundColor: "#5959b3",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDrawerContent;
