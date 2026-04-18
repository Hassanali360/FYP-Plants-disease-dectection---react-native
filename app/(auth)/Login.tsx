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
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/globalcss';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      await signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      {/* Background Leaf */}
      <Image
        source={require('../../assets/images/loginbg.png')}
        style={styles.bgImage}
      />

      <View style={styles.content}>
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.header}>Botanical Conservatory</Text>

        <Text style={styles.subtitle}>WELCOME BACK</Text>
        <Text style={styles.title}>Identify & Protect Your Garden</Text>
        <Text style={styles.description}>
          Sign in to access your digital conservatory and health reports.
        </Text>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="name@garden.com"
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* Password */}
        <View style={styles.passwordRow}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Signup */}
        <TouchableOpacity onPress={() => router.push('/(auth)/Signup')}>
          <Text style={styles.signup}>
            New to the conservatory?{' '}
            <Text style={{ color: COLORS.primary }}>Create an account</Text>
          </Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => openLink('https://policies.google.com/privacy')}>
            <Text style={styles.footerText}>PRIVACY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink('https://policies.google.com/terms')}>
            <Text style={styles.footerText}>TERMS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink('https://support.google.com/')}>
            <Text style={styles.footerText}>HELP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.copy}>
          © 2024 BOTANICAL CONSERVATORY. ALL RIGHTS RESERVED.
        </Text>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgImage: {
    position: 'absolute',
    right: -40,
    top: 150,
    width: 260,
    height: 260,
    opacity: 0.15,
  },

  header: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FONTS.plus[600],
  },

  subtitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.primary,
    marginBottom: 6,
    fontFamily: FONTS.plus[500],
  },

  title: {
    fontSize: 28,
    color: '#111',
    marginBottom: 8,
    fontFamily: FONTS.plus[700],
  },

  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    fontFamily: FONTS.plus[400],
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#444',
    fontFamily: FONTS.plus[500],
  },

  input: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F6F7F5',
    fontFamily: FONTS.plus[400],
  },

  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  forgot: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: FONTS.plus[500],
  },

  button: {
    height: 52,
    borderRadius: 16,
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

  signup: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    fontFamily: FONTS.plus[400],
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 30,
  },

  footerText: {
    fontSize: 12,
    color: '#777',
    fontFamily: FONTS.plus[500],
  },

  copy: {
    textAlign: 'center',
    fontSize: 10,
    color: '#aaa',
    marginTop: 10,
    fontFamily: FONTS.plus[400],
  },

  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: FONTS.plus[400],
  },
});