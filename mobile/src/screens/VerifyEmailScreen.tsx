import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Button from '../components/Button';
import { verifyEmail, resendCode, ApiError, SERVER_ERROR_MESSAGE } from '../services/api';

export default function VerifyEmailScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
  const email = route.params?.email ?? '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(code)) {
      Alert.alert('Erro', 'O código tem 6 dígitos');
      return;
    }
    setLoading(true);
    try {
      await verifyEmail(email, code);
      Alert.alert('Sucesso', 'Email verificado. Pode iniciar sessão.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error instanceof ApiError ? error.message : SERVER_ERROR_MESSAGE);
    }
  };

  const handleResend = async () => {
    try {
      const message = await resendCode(email);
      Alert.alert('Código reenviado', message);
    } catch (error) {
      Alert.alert('Erro', error instanceof ApiError ? error.message : SERVER_ERROR_MESSAGE);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark, '#450000']}
          style={[styles.header, { paddingTop: insets.top + 20 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.logoSection}>
            <View style={styles.logo}>
              <Ionicons name="mail-open-outline" size={40} color={Colors.white} />
            </View>
            <Text style={styles.title}>Verifique o seu email</Text>
            <Text style={styles.subtitle}>
              Enviámos um código de 6 dígitos para {email || 'o seu email'}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>Código de verificação</Text>
            <TextInput
              style={styles.codeInput}
              value={code}
              onChangeText={(t) => setCode(t.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="000000"
              placeholderTextColor={Colors.gray[300]}
            />

            <Button
              title={loading ? 'A verificar...' : 'Verificar Email'}
              onPress={handleVerify}
              loading={loading}
              variant="gradient"
              style={styles.verifyButton}
            />

            <TouchableOpacity style={styles.resend} onPress={handleResend}>
              <Text style={styles.resendText}>Reenviar código</Text>
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Já verificou? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Iniciar sessão</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flexGrow: 1 },
  header: {
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoSection: { alignItems: 'center' },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: 8,
  },
  codeInput: {
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
    borderRadius: 14,
    backgroundColor: Colors.gray[50],
    paddingVertical: 16,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 12,
    color: Colors.gray[900],
    marginBottom: 24,
  },
  verifyButton: { marginBottom: 20 },
  resend: { alignItems: 'center', marginBottom: 24 },
  resendText: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 14, color: Colors.gray[500] },
  loginLink: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
});
