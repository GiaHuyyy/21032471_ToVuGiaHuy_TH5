import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";

const footer = [
  {
    image: require("../assets/baiTH4/homeicon.png"),
    name: "Home",
  },
  {
    image: require("../assets/baiTH4/exploreicon.png"),
    name: "Explore",
  },
  {
    image: require("../assets/baiTH4/searchicon.png"),
    name: "Search",
  },
  {
    image: require("../assets/baiTH4/profileicon.png"),
    name: "Profile",
  },
];

const Home = ({ route }) => {
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);

  // const { username, avatar } = route.params;
  const { user, setUser } = useGlobalContext();
  const navigation = useNavigation();
  // useEffect(() => {
  //   setUser({ username: username });
  // }, []);

  const isValidJSON = (text) => {
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://6459bfa395624ceb21eebb61.mockapi.io/TH4/v1/category");
        const text = await response.text();
        console.log("Category response text:", text);
        if (isValidJSON(text)) {
          const data = JSON.parse(text);
          setCategory(data);
        } else {
          console.error("Invalid JSON response for category:", text);
        }

        const response1 = await fetch("https://6459bfa395624ceb21eebb61.mockapi.io/TH4/v1/location");
        const text1 = await response1.text();
        console.log("Location response text:", text1);
        if (isValidJSON(text1)) {
          const data1 = JSON.parse(text1);
          setLocation(data1);
        } else {
          console.error("Invalid JSON response for location:", text1);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* Header */}
        <View
          style={{
            backgroundColor: "#5959b3",
            height: 160,
            paddingHorizontal: 40,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Image source={require("../assets/baiTH4/logoicon.png")} style={{ width: 46 }} resizeMode="contain" />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                height: 36,
                borderRadius: 10,
                flex: 1,
              }}
            >
              <TextInput placeholder="Search here" style={{ flex: 1, height: "100%", outline: "none" }} />
              <Image source={require("../assets/baiTH4/findicon.png")} style={{ width: 24 }} resizeMode="contain" />
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={{ uri: user.avatar }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginLeft: 5,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Wellcome</Text>
              <Text style={{ color: "#fff", fontSize: 12 }}>{user.username}</Text>
            </View>

            <Image
              source={require("../assets/baiTH4/ringicon.png")}
              style={{ width: 40, marginLeft: "auto" }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
          {/* Category */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500 }}>Category</Text>
            <Image source={require("../assets/baiTH4/3gach.png")} style={{ width: 30 }} resizeMode="contain" />
          </View>

          {/* Category list*/}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 10,
              marginTop: 20,
            }}
          >
            {category.map((item, index) => (
              <View key={index} style={{ alignItems: "center", width: "25%" }}>
                <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} resizeMode="contain" />
                <Text style={{ fontSize: 12, marginTop: 5 }}>{item.name}</Text>
              </View>
            ))}
          </View>

          {/* Location */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500 }}>Popular Destination</Text>
            <Image source={require("../assets/baiTH4/3gach.png")} style={{ width: 30 }} resizeMode="contain" />
          </View>

          {/* Location list*/}
          <FlatList
            data={location}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 102,
                  height: 106,
                  borderRadius: 10,
                  marginRight: 10,
                }}
                resizeMode="cover"
              />
            )}
          />

          {/* Recommended */}
          <Text style={{ fontSize: 18, fontWeight: 500, marginTop: 10 }}>Recommended</Text>
          <View style={{ flexDirection: "row", marginTop: 10, columnGap: 10 }}>
            <Image source={require("../assets/baiTH4/photo4.png")} style={{ flex: 1, height: 120, borderRadius: 6 }} />
            <Image source={require("../assets/baiTH4/photo5.png")} style={{ flex: 1, height: 120, borderRadius: 6 }} />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          backgroundColor: "#5959b3",
          height: 90,
          paddingHorizontal: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {footer.map((item, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image source={item.image} style={{ width: 40, height: 40 }} resizeMode="cover" />
            <Text style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>{item.name}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Home;
