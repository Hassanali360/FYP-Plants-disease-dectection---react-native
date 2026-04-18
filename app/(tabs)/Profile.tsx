import React, { ReactNode, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '@/constants/globalcss';

const theme = {
  bg: '#F4F7F2',
  card: '#fff',
  green: '#1F7A35',
  green2: '#3FA95A',
  text: '#111827',
  muted: '#6B7280',
  line: '#EEF2EC',
};

const scans = [
  { id: 1, name: 'Monstera Deliciosa', issue: 'Healthy', date: '2 days ago' },
  { id: 2, name: 'Rose Plant', issue: 'Powdery Mildew', date: '5 days ago' },
  { id: 3, name: 'Snake Plant', issue: 'Low Water', date: '1 week ago' },
  { id: 4, name: 'Peace Lily', issue: 'Low Light', date: '2 weeks ago' },
];

type MenuRowProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  title: string;
  subtitle: string;
  onPress: () => void;
};

const MenuRow = ({ icon, color, title, subtitle, onPress }: MenuRowProps) => (
  <TouchableOpacity
    style={s.row}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={[s.icon, { backgroundColor: color }]}>
      <Ionicons name={icon} size={20} color={theme.text} />
    </View>

    <View style={{ flex: 1 }}>
      <Text style={s.rowTitle}>{title}</Text>
      <Text style={s.rowSub}>{subtitle}</Text>
    </View>

    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

type AppModalProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const AppModal = ({ visible, title, onClose, children }: AppModalProps) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onClose}
  >
    <View style={s.overlay}>
      <View style={s.sheet}>
        <View style={s.modalHeader}>
          <Text style={s.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {children}
      </View>
    </View>
  </Modal>
);

const NotificationsContent = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);

  const items = [
    { label: 'Care Alerts', value: a, setValue: setA },
    { label: 'Daily Tips', value: b, setValue: setB },
    { label: 'News & Offers', value: c, setValue: setC },
  ];

  return (
    <ScrollView>
      <View style={s.card}>
        {items.map((item, i) => (
          <View key={i} style={s.split}>
            <Text style={s.rowTitle}>{item.label}</Text>
            <Switch
              value={item.value}
              onValueChange={item.setValue}
              trackColor={{ true: theme.green }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const SavedScansContent = () => (
  <ScrollView>
    <View style={s.card}>
      {scans.map((it) => (
        <View key={it.id} style={s.split}>
          <View>
            <Text style={s.rowTitle}>{it.name}</Text>
            <Text style={s.rowSub}>{it.issue}</Text>
          </View>
          <Text style={s.rowSub}>{it.date}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const AboutContent = () => (
  <ScrollView>
    <View style={s.card}>
      <Text style={s.about}>
        Botanical Conservatory helps diagnose plant issues, manage care, and
        connect users with experts and sellers.
      </Text>
      <Text style={s.about}>Version 2.4.0</Text>
    </View>
  </ScrollView>
);

export default function ProfileScreen({ navigation }: { navigation: { navigate: (screen: string) => void } }) {
  const router = useRouter();
  const { user, recentScan, signOut } = useAuth();
  const [modal, setModal] = useState<string | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const open = (name: 'notifications' | 'saved' | 'about') => setModal(name);
  const close = () => setModal(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)/Login');
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>
        <View style={s.header}>
          <Text style={s.brand}>Botanical Conservatory</Text>

          <TouchableOpacity style={s.hBtn}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={theme.green}
            />
          </TouchableOpacity>
        </View>

        <View style={s.wrap}>
          <LinearGradient
            colors={['#F8FFF8', '#FFFFFF']}
            style={s.profile}
          >
            <View style={s.avatarWrap}>
              <Image
                source={{ uri: avatarUri ?? 'https://i.pravatar.cc/300?img=44' }}
                style={s.avatar}
              />
              <TouchableOpacity style={s.badge} onPress={handlePickImage}>
                <Ionicons name="pencil" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={s.name}>{user?.name ?? 'Elena Thorne'}</Text>
            <Text style={s.role}>
              Orchid Enthusiast • Level 4 Gardener
            </Text>

            <TouchableOpacity
              onPress={handlePickImage}
            >
              <LinearGradient
                colors={['#2E7D32', '#2E7D32']}
                style={s.edit}
              >
                <Text style={s.editText}>Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={s.latestCard}>
          <Text style={s.latestTitle}>Latest scan</Text>
          {recentScan ? (
            <>
              <Text style={s.latestLabel}>{recentScan.diseaseName}</Text>
              <Text style={s.latestInfo}>{recentScan.status} • {recentScan.confidence}%</Text>
              <Text style={s.latestDate}>{recentScan.date}</Text>
            </>
          ) : (
            <Text style={s.latestInfo}>No scan available yet. Run a scan to see the latest result here.</Text>
          )}
        </View>
        <View style={s.card}>
          <MenuRow
            icon="notifications-outline"
            color="#FFE4DA"
            title="Notification Settings"
            subtitle="Care alerts, health updates & tips"
            onPress={() => open('notifications')}
          />

          <MenuRow
            icon="folder-open-outline"
            color="#D8FFD5"
            title="Saved Scans"
            subtitle="12 plants diagnosed recently"
            onPress={() => open('saved')}
          />

          <MenuRow
            icon="card-outline"
            color="#F2FFAF"
            title="Payment Methods"
            subtitle="Manage your premium subscription"
            onPress={() => navigation?.navigate?.('Payments')}
          />

          <MenuRow
            icon="information-circle-outline"
            color="#E6ECE7"
            title="About Us"
            subtitle="Version 2.4.0 • Botanical Labs"
            onPress={() => open('about')}
          />

          <MenuRow
            icon="log-out-outline"
            color="#FECACA"
            title="Log Out"
            subtitle="Sign out of your account"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>

      <AppModal
        visible={modal === 'notifications'}
        title="Notifications"
        onClose={close}
      >
        <NotificationsContent />
      </AppModal>

      <AppModal
        visible={modal === 'saved'}
        title="Saved Scans"
        onClose={close}
      >
        <SavedScansContent />
      </AppModal>

      <AppModal
        visible={modal === 'about'}
        title="About Our App"
        onClose={close}
      >
        <AboutContent />
      </AppModal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1,  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  hBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.green,
    fontFamily: FONTS.plus[600],
  },
  wrap: {
    paddingTop: 8,
  },
  profile: {
    borderRadius: 28,
    alignItems: 'center',
    padding: 24,
    elevation: 3,
  },
  avatarWrap: { position: 'relative' },
  latestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    elevation: 3,
  },
  latestTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  latestLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D631B',
    marginBottom: 6,
  },
  latestInfo: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
  },
  latestDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#fff',
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 16,
    color: theme.text,
    fontFamily: FONTS.plus[600],
  },
  role: {
    fontSize: 14,
    color: theme.muted,
    marginTop: 4,
    fontFamily: FONTS.vietnam[400],
  },
  edit: {
    marginTop: 18,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
  },
  editText: {
    color: '#fff',
    fontWeight: '800',
    fontFamily: FONTS.plus[600],
    fontSize: 18,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 16,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.line,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.text,
  },
  rowSub: {
    fontSize: 12,
    color: theme.muted,
    marginTop: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    height: '75%',
    backgroundColor: theme.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  modalHeader: {
    padding: 18,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.text,
    fontFamily: FONTS.plus[600],
  },
  split: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.line,
  },
  about: {
    padding: 16,
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
});