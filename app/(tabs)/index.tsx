import { StyleSheet, Text, View,
  ScrollView,
  Dimensions, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/globalcss'
import { Image } from 'react-native';
import { cards } from '@/constants/tips';
const { width } = Dimensions.get("window");
import { scanCard } from '@/constants/scanhistory';
import { router } from 'expo-router';
export default function Index() {

const getStatusStyle = (statusType: string) => {
  if (statusType === "success") {
    return {
      bg: "#E6F4EA",
      color: "#2E7D32",
      icon: "",
    };
  }
  return {
    bg: "#FDECEA",
    color: "#C62828",
    icon: "",
  };
};


  return (
    <SafeAreaView style={styles.safeArea}>
<ScrollView
contentContainerStyle={{ paddingBottom: 100 }} 
>
  {/* HEADER */}
  <View style={styles.screen}>
    
    {/* Left - Title */}
    <Text style={styles.title1}>Botanical Conservatory</Text>

    {/* Right - Notification */}
    <TouchableOpacity style={styles.iconBtn}>
      <Ionicons name="notifications-outline" size={28} color={COLORS.primary} />
    </TouchableOpacity>

  </View>

  {/* BOX (OUTSIDE HEADER - CORRECT) */}
  <View style={styles.box}>

    <Text style={styles.boxTitle}>Instant Diagnosis</Text>
    <Text style={styles.mainheader}>Identify Plant Issues in Seconds</Text>

    <TouchableOpacity 
      style={styles.button}
      onPress={() => router.push('/(tabs)/Scan')}
    >
      <View style={styles.content}>
        
        <Image
          source={require("../../assets/images/scan.png")} // adjust path
          style={styles.icon}
        />

        <Text style={styles.text}>Scan New Plant</Text>
      </View>

    </TouchableOpacity>

    

  </View>

  <View style={styles.advice}>
    <View>
        <Text style={styles.seasonalAdvice}>SEASIONAL ADVICE</Text>
        <Text style={styles.seasonalAdvice1}>QUICK TIPS</Text>
        </View>
        <View><Text style={styles.viewAll}>View All</Text></View>
    </View>

    <View style={styles.container}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
  >
    {cards && cards.length > 0 ? (
      cards.map((item) => (
        <View
          key={item.id}
          style={[styles.card, { backgroundColor: item.color }]}
        >
          

          {/* TITLE */}
          <Text style={[styles.title, { color: item.textColor }]}>
            {item.title}
          </Text>

          {/* DESCRIPTION */}
          <Text style={[styles.description, { color: item.textColor }]}>
            {item.description}
          </Text>
          {/* TAG */}
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        </View>
      ))
    ) : (
      <Text>No cards available</Text>
    )}
  </ScrollView>
</View>

<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.scanHistoryScroll}
  style={{ marginTop: 30 }}
>
    <Text style={styles.scanHistory1}>History</Text>
    <Text style={styles.scanHistoryHeading}>Recent Scans</Text>
  {scanCard.map((item) => (
    <View key={item.id} style={styles.scanCard}>

      <Image source={item.image} style={styles.scanCard_image} />

      <View style={styles.scanCard_content}>
        <View>
          <Text style={styles.scanTitle}>{item.title}</Text>
          <Text style={styles.scanHistory1}>{item.subtitle}</Text>
        </View>

        <View>
          <Text style={[styles.status, { backgroundColor: getStatusStyle(item.statusType).bg, color: getStatusStyle(item.statusType).color }]}>{item.status} {getStatusStyle(item.statusType).icon}</Text>
        </View>
      </View>

    </View>
  ))}
</ScrollView>
{/* contact expert */}
<View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 , paddingHorizontal: 50}}>
<View style={styles.banner}>
        <View >
        <Image
          source={require("../../assets/images/expertIcon.png")} // adjust path
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
      </View>
      <View style={{ flex: 1, width: 150 }}>
        <Text style={{ fontWeight: "bold", fontFamily: FONTS.plus[300], marginBottom: 8, fontSize: 16 }} >Struggling with a diagnosis?</Text>
        <Text style={{ fontFamily: FONTS.vietnam[300], color: "#707A6C", marginBottom: 12, fontSize: 14 }} >
          Talk to certified plant experts for a manual review.
        </Text> 

        <TouchableOpacity
        onPress={()=>router.push('/(tabs)/Expert')}
        >
          <Text style={{ color: "#0D631B", fontFamily: FONTS.vietnam[700], fontSize: 17 }} >
            Consult an Expert →
          </Text>
        </TouchableOpacity>
      </View>

    

    </View>
    </View>
</ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral,
    
  },

  screen: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.neutral,
    
  },

  title1: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: FONTS.plus[600],
    color: COLORS.primary,
    flex: 1,
  },

  iconBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
  },

  box: {
    
     justifyContent: "center",
    marginLeft: 38,

    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#0D631B",
    width: 342,
    height: 242,
   
  },
  boxTitle:{
    fontSize: 20,
    fontWeight: "100",
    fontFamily: FONTS.vietnam[300],
    color: "#fff",
     marginBottom: 8,
  },
  mainheader: {
   fontSize: 36,
  fontFamily: FONTS.plus[700],
  color: "#fff",
  marginBottom: 26,
  textAlign: "center",
  paddingHorizontal: 20,
  
  },
    button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: "#0D631B",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },
  text: {
     color: "#0D631B",
  fontFamily: FONTS.vietnam[600],
  fontSize: 16,
  
  },
  advice:{
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginTop: 24,

  },
  seasonalAdvice:{
    color: "#707A6C",
    marginBottom: 4,
    fontFamily: FONTS.vietnam[600],
  },
    viewAll:{
        color: "#0D631B",
        fontFamily: FONTS.vietnam[400],
        fontSize: 17,
    },
  seasonalAdvice1:{
  fontSize: 22,
  fontWeight: "500",
  fontFamily: FONTS.plus[700],
  
  },
     container: {
    marginTop: 10,
    paddingHorizontal: 25,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: 280,
    
    borderRadius: 16,
    marginRight: 12,
    height: 176,
     justifyContent: "center",
     paddingVertical:20,
     paddingHorizontal: 20,
    
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
    marginTop: 13,
  },
  tagText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 5,
    fontFamily: FONTS.plus[700],
  },
  description: {
    fontSize: 16,
    opacity: 0.9,
    fontFamily: FONTS.vietnam[400],
  },

  scanHistorySection: {
    marginTop: 24,
    paddingHorizontal: 32,
   
  },

  scanHistory1:{
color: "#707A6C",
fontFamily: FONTS.vietnam[500],

  },

  scanHistoryHeading: {
    fontSize: 20,
    marginBottom: 12,
    color: "#191C1B",
    fontFamily: FONTS.plus[600],
  },

  scanHistoryScroll: {
    paddingHorizontal: 25,
  },
  
  scanCard: {
  backgroundColor: "#fff",
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: 15,
  width: "100%",
},

  scanCard_content: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
  
 
  borderRadius: 12,
  marginBottom: 12,
},
scanCard_image: {
  width: "100%",
  height: 180,
  resizeMode: "cover",
},
scanTitle: {
fontFamily: FONTS.vietnam[600],
},
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: FONTS.vietnam[600],
  },
  banner: {
    backgroundColor: "#D6D7D6",
    borderRadius: 20,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
     alignSelf: "center",
     gap: 20,
     width: "100%",
     padding: 30
     
  }


});