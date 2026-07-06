import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';
import { Notification } from '../types';

export default function NotificationsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  // Sem endpoint de notificações no backend — lista vazia até existir
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'badge': return Colors.warning;
      case 'quiz': return Colors.info;
      case 'ranking': return Colors.success;
      case 'content': return Colors.primary;
      default: return Colors.gray[500];
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'badge': return Colors.warningLight;
      case 'quiz': return Colors.infoLight;
      case 'ranking': return Colors.successLight;
      case 'content': return '#FFF5F5';
      default: return Colors.gray[100];
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Agora';
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d atrás`;
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notificações"
        subtitle={unreadCount > 0 ? `${unreadCount} não lidas` : 'Tudo em dia'}
        showBack
        onBack={() => navigation.goBack()}
        rightAction={
          unreadCount > 0 ? (
            <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
              <Text style={styles.markAllText}>Ler tudo</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBg}>
              <Ionicons name="notifications-off-outline" size={48} color={Colors.gray[300]} />
            </View>
            <Text style={styles.emptyTitle}>Sem notificações</Text>
            <Text style={styles.emptyText}>Quando houver novidades, aparecerão aqui</Text>
          </View>
        ) : (
          notifications.map(notif => (
            <TouchableOpacity
              key={notif.id}
              style={[
                styles.notifItem,
                !notif.read && styles.notifItemUnread,
              ]}
              onPress={() => markAsRead(notif.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.notifIconBg, { backgroundColor: getIconBg(notif.type) }]}>
                <Text style={styles.notifEmoji}>{notif.icon}</Text>
              </View>
              <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                  <Text style={[styles.notifTitle, !notif.read && styles.notifTitleUnread]}>
                    {notif.title}
                  </Text>
                  {!notif.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notifMessage}>{notif.message}</Text>
                <Text style={styles.notifTime}>{formatDate(notif.createdAt)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  markAllText: { fontSize: 12, fontWeight: '700', color: Colors.white },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  notifItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 8,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  notifItemUnread: {
    backgroundColor: '#FFFBF5',
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  notifIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifEmoji: { fontSize: 22 },
  notifContent: { flex: 1 },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[700],
    flex: 1,
  },
  notifTitleUnread: {
    fontWeight: '700',
    color: Colors.gray[900],
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  notifMessage: {
    fontSize: 13,
    color: Colors.gray[500],
    lineHeight: 19,
    marginBottom: 6,
  },
  notifTime: {
    fontSize: 11,
    color: Colors.gray[400],
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconBg: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray[500],
  },
});
