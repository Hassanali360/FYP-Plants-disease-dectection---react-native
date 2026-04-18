import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FONTS,COLORS } from "@/constants/globalcss";
const experts = [
  {
    id: "1",
    name: "Dr. Elena Thorne",
    role: "Pathology & Soil Science",
    price: "$25.00",
    desc: "Specializing in fungal infections and nutrient deficiency diagnosis for rare indoor varieties.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
  },
  {
    id: "2",
    name: "Silas The Whisperer",
    role: "Urban Gardening Specialist",
    price: "$18.00",
    desc: "Expert in balcony vegetable gardening and hydro-culture setups for apartment dwellers.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
  },
];

export default function Expertr() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
        {/* HEADER */}
        <View style={styles.header}>
          

          <Text style={styles.brand}>Botanical Conservatory</Text>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons
              name="notifications-outline"
              size={18}
              color="#1f6b3b"
            />
          </TouchableOpacity>
        </View>

        {/* HERO */}
        <Text style={styles.kicker}>EXPERT CONNECT</Text>

        <Text style={styles.title}>
          Professional Guidance{"\n"}for your{" "}
          <Text style={styles.italic}>Urban Jungle.</Text>
        </Text>

        {/* CONVERSATION */}
        

        {/* SPECIALISTS */}
        <Text style={[styles.section, { marginTop: 24 }]}>
          Available Specialists
        </Text>

        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.tabActive]}>All Experts</Text>
          
        </View>

        {experts.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.image} />

            <View style={styles.rating}>
              <Ionicons name="star" size={10} color="#f59e0b" />
              <Text style={styles.rateText}>4.9 (124 reviews)</Text>
            </View>

            <View style={styles.body}>
              <View style={styles.priceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.role}>{item.role}</Text>
                </View>

                <View>
                  <Text style={styles.consult}>CONSULTATION</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>

              <Text style={styles.desc}>{item.desc}</Text>

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Chat Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* BANNER */}
        <View style={styles.banner}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
            }}
            style={styles.bannerAvatar}
          />
          <Text style={styles.bannerTitle}>Prof. Sarah Linden</Text>
          <Text style={styles.bannerSub}>Rare Plant Therapist</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f3",
    paddingHorizontal:20,
  },

  

  header: {
    
        
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.neutral,
      
  },


  brand: {
    flex: 1,
    fontSize: 24,
    fontWeight:"bold",
    fontFamily: FONTS.plus[600],
    color: "#1f6b3b",
  },

  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  kicker: {
    marginTop: 24,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: "#1f6b3b",
  },

  title: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#111",
  },

  italic: {
    color: "#1f6b3b",
    fontStyle: "italic",
  },

  rowTitle: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  section: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111",
  },

  link: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1f6b3b",
  },

  chatRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },

  chatCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },

  chatName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },

  chatMsg: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },

  time: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "700",
    color: "#1f6b3b",
  },

  miniCard: {
    width: 42,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  tabs: {
    flexDirection: "row",
    marginTop: 14,
  },

  tab: {
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#e9ebe7",
    color: "#555",
    fontSize: 12,
    fontWeight: "600",
  },

  tabActive: {
    backgroundColor: "#1f6b3b",
    color: "#fff",
  },

  card: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 170,
  },

  rating: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  rateText: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: "700",
  },

  body: {
    padding: 14,
  },

  priceRow: {
    flexDirection: "row",
  },

  name: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111",
  },

  role: {
    marginTop: 4,
    fontSize: 12,
    color: "#1f6b3b",
    fontWeight: "600",
  },

  consult: {
    fontSize: 9,
    color: "#888",
    textAlign: "right",
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f6b3b",
    textAlign: "right",
  },

  desc: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    color: "#666",
  },

  btn: {
    marginTop: 16,
    backgroundColor: "#1f7a28",
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  banner: {
    marginTop: 20,
    paddingVertical: 24,
    borderRadius: 22,
    backgroundColor: "#efc7b6",
    alignItems: "center",
  },

  bannerAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },

  bannerTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
    color: "#6a4338",
  },

  bannerSub: {
    marginTop: 4,
    fontSize: 12,
    color: "#6a4338",
  },
});