import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { COLORS, FONTS } from '../../constants/globalcss';
import Ionicons from '@expo/vector-icons/build/Ionicons';

export default function Signup() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await signUp(name.trim(), email.trim(), password);
      Alert.alert(
        'Account Created',
        'Your account has been created successfully. Please log in with your credentials.',
        [
          {
            text: 'Log In',
            onPress: () => router.replace('/(auth)/Login'),
          },
        ]
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.brand}>Botanical Conservatory</Text>
        </View>
        {/* Top Image */}
        <Image
          source={require('../../assets/images/Login.png')}
          style={styles.image}
        />

        <View style={styles.card}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.subtitle}>CULTIVATE KNOWLEDGE</Text>
          <Text style={styles.title}>Start Your Journey</Text>
          <Text style={styles.description}>
            Join a community of enthusiasts and experts dedicated to the health of every leaf and petal.
          </Text>

          {/* Inputs */}
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            style={styles.input}
            placeholderTextColor="#888"
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#888"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#888"
          />

          {/* Confirm Password */}
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#888"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create Account →</Text>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
            <Text style={styles.switchText}>
              Already have an account?{' '}
              <Text style={{ color: COLORS.primary }}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
    padding: 20,
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
    paddingVertical: 24,
    textAlign: 'center',
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  subtitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.primary,
    marginBottom: 6,
    marginTop: 40,
    fontFamily: FONTS.vietnam[700],
  },

  title: {
    fontSize: 26,
    color: '#111',
    marginBottom: 6,
    fontFamily: FONTS.plus[700],
  },

  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: FONTS.vietnam[400],
  },

  input: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 14,
    backgroundColor: '#F6F7F5',
    fontFamily: FONTS.plus[400],
  },

  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.plus[600],
  },

  switchText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: '#666',
    fontFamily: FONTS.plus[400],
  },

  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: FONTS.plus[400],
  },
});