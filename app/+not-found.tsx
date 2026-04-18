import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={80} color="#0D631B" />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.message}>The page you're looking for doesn't exist.</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.replace('/Welcome')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F7F9F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
    color: '#111827',
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#0D631B',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
