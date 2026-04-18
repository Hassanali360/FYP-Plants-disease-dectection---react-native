import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '@/constants/globalcss';

export default function Welcome() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO IMAGE */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={styles.image}
        />

        {/* Scan Overlay */}
        <View style={styles.scanBox} />

        {/* Corner markers */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* BADGE */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>🌿 BOTANICAL CONSERVATORY</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>
        Your Personal{' '}
        <Text style={{ color: COLORS.primary }}>Plant Doctor</Text>
      </Text>

      {/* DESCRIPTION */}
      <Text style={styles.description}>
        Harness advanced botanical science to identify pests, diseases, and care needs in seconds.
      </Text>

      {/* FEATURES */}
      <View style={styles.features}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>📷 Instant Scan</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>🌱 Expert Care</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>📊 Growth Log</Text>
        </View>
      </View>

      {/* SIGN UP BUTTON */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => router.push('/(auth)/Signup')}
      >
        <Text style={styles.primaryText}>Sign Up →</Text>
      </TouchableOpacity>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => router.push('/(auth)/Login')}
      >
        <Text style={styles.secondaryText}>Log In</Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <Text style={styles.footer}>
        By continuing, you agree to our Terms of Service and Environmental Ethics Policy.
      </Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },

  content: {
    padding: 20,
    alignItems: 'center',
  },

  imageWrapper: {
    marginTop: 40,
    width: '80%',
    height: 370,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  scanBox: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: 220,
    height: 220,
    borderWidth: 1.5,
    borderColor: '#A5D6A7',
    borderRadius: 12,
  },

  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#A5D6A7',
  },

  topLeft: {
    top: '30%',
    left: '20%',
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },

  topRight: {
    top: '30%',
    right: '20%',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },

  bottomLeft: {
    bottom: '30%',
    left: '20%',
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },

  bottomRight: {
    bottom: '30%',
    right: '20%',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },

  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },

  badgeText: {
    fontSize: 11,
    color: COLORS.primary,
    fontFamily: FONTS.plus[600],
    letterSpacing: 1,
  },

  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: FONTS.plus[700],
    color: '#111',
  },

  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    fontFamily: FONTS.plus[400],
    lineHeight: 20,
  },

  features: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },

  chip: {
    backgroundColor: '#F1F3F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  chipText: {
    fontSize: 12,
    fontFamily: FONTS.plus[500],
    color: '#333',
  },

  primaryBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.plus[600],
  },

  secondaryBtn: {
    width: '100%',
    backgroundColor: '#E6B8A7',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  secondaryText: {
    color: '#333',
    fontSize: 16,
    fontFamily: FONTS.plus[600],
  },

  footer: {
    fontSize: 11,
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontFamily: FONTS.plus[400],
    lineHeight: 16,
  },
});