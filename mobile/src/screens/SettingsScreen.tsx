import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';

export default function SettingsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const sections = [
    {
      title: 'Geral',
      items: [
        {
          icon: 'notifications-outline',
          label: 'Notificações',
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: 'moon-outline',
          label: 'Modo Escuro',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
          subtitle: 'Em breve',
          disabled: true,
        },
        {
          icon: 'cloud-offline-outline',
          label: 'Modo Offline',
          type: 'toggle',
          value: offlineMode,
          onToggle: setOfflineMode,
        },
        {
          icon: 'volume-high-outline',
          label: 'Efeitos Sonoros',
          type: 'toggle',
          value: soundEffects,
          onToggle: setSoundEffects,
        },
      ],
    },
    {
      title: 'Idioma',
      items: [
        {
          icon: 'language-outline',
          label: 'Idioma',
          type: 'value',
          currentValue: 'Português',
        },
      ],
    },
    {
      title: 'Sobre',
      items: [
        {
          icon: 'information-circle-outline',
          label: 'Sobre a App',
          type: 'link',
        },
        {
          icon: 'document-text-outline',
          label: 'Termos e Condições',
          type: 'link',
        },
        {
          icon: 'shield-checkmark-outline',
          label: 'Política de Privacidade',
          type: 'link',
        },
        {
          icon: 'star-outline',
          label: 'Avaliar a App',
          type: 'link',
        },
      ],
    },
    {
      title: 'Conta',
      items: [
        {
          icon: 'trash-outline',
          label: 'Apagar Conta',
          type: 'danger',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Configurações"
        subtitle="Personalize a sua experiência"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, si) => (
          <View key={si} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, ii) => (
                <View
                  key={ii}
                  style={[
                    styles.settingItem,
                    ii < section.items.length - 1 && styles.settingItemBorder,
                  ]}
                >
                  <View style={[
                    styles.settingIconBg,
                    item.type === 'danger' && { backgroundColor: Colors.errorLight },
                  ]}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={item.type === 'danger' ? Colors.error : Colors.primary}
                    />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={[
                      styles.settingLabel,
                      item.type === 'danger' && { color: Colors.error },
                    ]}>
                      {item.label}
                    </Text>
                    {(item as any).subtitle && (
                      <Text style={styles.settingSubtitle}>{(item as any).subtitle}</Text>
                    )}
                  </View>

                  {item.type === 'toggle' && (
                    <Switch
                      value={(item as any).value}
                      onValueChange={(item as any).onToggle}
                      trackColor={{ false: Colors.gray[300], true: Colors.primary }}
                      thumbColor={Colors.white}
                      disabled={(item as any).disabled}
                    />
                  )}
                  {item.type === 'value' && (
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText}>{(item as any).currentValue}</Text>
                      <Ionicons name="chevron-forward" size={16} color={Colors.gray[400]} />
                    </View>
                  )}
                  {(item.type === 'link' || item.type === 'danger') && (
                    <Ionicons name="chevron-forward" size={18} color={Colors.gray[300]} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>EHA - Economia com História: Angola</Text>
          <Text style={styles.versionNumber}>Versão 1.0.0 (Build 1)</Text>
          <Text style={styles.versionCopy}>© 2026 ISPTEC</Text>
        </View>

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  settingIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTextContainer: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: Colors.gray[800] },
  settingSubtitle: { fontSize: 12, color: Colors.gray[400], marginTop: 2 },
  valueContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  valueText: { fontSize: 14, color: Colors.gray[500], fontWeight: '500' },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: { fontSize: 14, fontWeight: '600', color: Colors.gray[500], marginBottom: 4 },
  versionNumber: { fontSize: 12, color: Colors.gray[400], marginBottom: 2 },
  versionCopy: { fontSize: 11, color: Colors.gray[300] },
});
