import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/globalcss';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  { id: '1', name: 'The Emerald Glasshouse', distance: '1.2 miles away • Portland, OR', rating: '4.9', tags: ['INDOOR PLANTS', 'RARE AROIDS', 'ORGANIC SOIL'], image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800' },
  { id: '2', name: 'Root & Stem Co.', distance: '2.8 miles away • Beaverton, OR', rating: '4.7', tags: ['SUCCULENTS', 'CACTI', 'HOME DECOR'], image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800' },
];

export default function Shop() {
  const [search, setSearch] = useState('');
  const [indoorOnly, setIndoorOnly] = useState(false);

  const filteredData = useMemo(() => {
    const query = search.toLowerCase().trim();
    return data.filter((item) => {
      const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.tags.some(tag => tag.toLowerCase().includes(query));
      const matchesIndoor = !indoorOnly || item.tags.includes('INDOOR PLANTS');
      return matchesSearch && matchesIndoor;
    });
  }, [search, indoorOnly]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.brand}>Botanical Conservatory</Text>
          <View style={styles.icons}>
          <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="notifications-outline" size={28} color={COLORS.primary} />
              </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.kicker}>LOCAL DISCOVERIES</Text>

        <View style={styles.heroRow}>
          <View>
            <Text style={styles.title}>Nearby</Text>
            <Text style={styles.title}>Sellers</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.mapBtn}>
            <Text style={styles.mapBtnText}>View on Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.search}>
          <Ionicons name="search-outline" size={18} color="#8d8d8d" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search for nurseries or plant types..."
            placeholderTextColor="#8d8d8d"
            style={styles.input}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsWrap}
        >
          <Text style={[styles.chip, styles.chipActive]}>All Shops</Text>
          <TouchableOpacity onPress={() => setIndoorOnly(!indoorOnly)}>
            <Text style={[styles.chip, indoorOnly && styles.chipActive]}>Indoor Specialty</Text>
          </TouchableOpacity>
          
        </ScrollView>

        {filteredData.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.rating}>
              <Ionicons name="star" size={12} color="#f59e0b" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.rowBetween}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Ionicons name="leaf-outline" size={18} color="#1f6b3b" />
              </View>

              <Text style={styles.meta}>{item.distance}</Text>

              <View style={styles.tags}>
                {item.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  logo: {
    fontSize: 24,
    marginRight: 8,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  brand: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: FONTS.plus[600],
    color: COLORS.primary,
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
  kicker: {
    marginTop: 18,
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#1f6b3b',
    fontWeight: '700',
  },
  heroRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    lineHeight: 40,
    fontWeight: '800',
    color: '#1d1d1d',
  },
  mapBtn: {
    backgroundColor: '#efc0ad',
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBtnText: {
    fontWeight: '600',
    color: '#51352d',
  },
  search: {
    marginTop: 18,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#e8e8e4',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  chipsWrap: {
    paddingTop: 14,
    paddingBottom: 8,
    paddingRight: 8,
  },
  chip: {
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: '#fff',
    fontSize: 12,
    color: '#444',
    overflow: 'hidden',
  },
  chipActive: {
    backgroundColor: '#1f6b3b',
    color: '#fff',
  },
  card: {
    marginTop: 16,
    borderRadius: 22,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  rating: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardBody: {
    padding: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    flex: 1,
    paddingRight: 8,
    fontSize: 24,
    fontWeight: '800',
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  tags: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    fontSize: 10,
    color: '#1f6b3b',
    backgroundColor: '#edf5ee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
});
