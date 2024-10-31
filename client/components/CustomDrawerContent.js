import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    setDeleteModalVisible(false);
    alert("Account deleted successfully.");
  };

  const handleLogout = () => {
    // Handle logout logic here
    setLogoutModalVisible(false);
    navigation.navigate("SignIn");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Update User Information Button */}
      <TouchableOpacity onPress={() => navigation.navigate("UpdateUserInfo")}>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>Cập nhật thông tin người dùng</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
        <Text style={{ fontSize: 16, color: "red", marginBottom: 20 }}>Xóa tài khoản</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
        <Text style={{ fontSize: 16, color: "blue" }}>Logout</Text>
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
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Are you sure you want to delete your account?</Text>
            <Button title="Yes, Delete" onPress={handleDeleteAccount} />
            <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
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
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Are you sure you want to logout?</Text>
            <Button title="Yes, Logout" onPress={handleLogout} />
            <Button title="Cancel" onPress={() => setLogoutModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDrawerContent;
