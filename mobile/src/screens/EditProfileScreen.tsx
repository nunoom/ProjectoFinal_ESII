import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { getCurrentUser, updateProfile, ApiError, SERVER_ERROR_MESSAGE } from '../services/api';

export default function EditProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const user = getCurrentUser();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }
    setLoading(true);
    try {
      await updateProfile(name.trim(), user?.bio ?? '');
      setLoading(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error instanceof ApiError ? error.message : SERVER_ERROR_MESSAGE);
    }
  };

  const renderInput = (
    field: string,
    label: string,
    icon: string,
    value: string,
    onChangeText: (t: string) => void,
    options?: { secure?: boolean; placeholder?: string; keyboardType?: any }
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        focusedField === field && styles.inputFocused,
      ]}>
        <View style={styles.inputIcon}>
          <Ionicons
            name={icon as any}
            size={20}
            color={focusedField === field ? Colors.primary : Colors.gray[400]}
          />
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={options?.placeholder}
          placeholderTextColor={Colors.gray[400]}
          secureTextEntry={options?.secure}
          keyboardType={options?.keyboardType}
          autoCapitalize={options?.keyboardType === 'email-address' ? 'none' : 'words'}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Editar Perfil"
        showBack
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Avatar uri={user?.photoUrl} name={user?.name ?? 'Estudante'} size={96} />
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={18} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>Alterar foto</Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            {renderInput('name', 'Nome completo', 'person-outline', name, setName, {
              placeholder: 'Seu nome',
            })}
            {renderInput('email', 'Email', 'mail-outline', email, setEmail, {
              placeholder: 'seu@email.com',
              keyboardType: 'email-address',
            })}
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Alterar Password</Text>
            <Text style={styles.sectionSubtitle}>Deixe em branco para manter a password atual</Text>
            {renderInput('currentPassword', 'Password atual', 'lock-closed-outline', currentPassword, setCurrentPassword, {
              secure: true,
              placeholder: '••••••••',
            })}
            {renderInput('newPassword', 'Nova password', 'lock-open-outline', newPassword, setNewPassword, {
              secure: true,
              placeholder: '••••••••',
            })}
          </View>

          {/* Save Button */}
          <Button
            title="Guardar Alterações"
            onPress={handleSave}
            loading={loading}
            variant="gradient"
            icon={<Ionicons name="checkmark" size={18} color={Colors.white} />}
          />

          <View style={{ height: insets.bottom + 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  content: { flex: 1 },
  contentContainer: { padding: 20 },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.gray[50],
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  formSection: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.gray[400],
    marginBottom: 16,
  },
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
    borderRadius: 14,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF5F5',
  },
  inputIcon: { paddingLeft: 16, paddingRight: 4 },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    fontSize: 16,
    color: Colors.gray[900],
  },
});
