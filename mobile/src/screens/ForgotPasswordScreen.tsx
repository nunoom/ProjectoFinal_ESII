import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Button from '../components/Button';
import { forgotPassword, resetPassword, ApiError, SERVER_ERROR_MESSAGE } from '../services/api';

export default function ForgotPasswordScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestCode = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }
    setLoading(true);
    try {
      const message = await forgotPassword(email.trim());
      setStep('reset');
      Alert.alert('Código enviado', message);
    } catch (error) {
      Alert.alert('Erro', error instanceof ApiError ? error.message : SERVER_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!/^\d{6}$/.test(code)) {
      Alert.alert('Erro', 'O código tem 6 dígitos');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A nova password deve ter pelo menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email.trim(), code, newPassword);
      Alert.alert('Sucesso', 'Password redefinida. Inicie sessão com a nova password.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error instanceof ApiError ? error.message : SERVER_ERROR_MESSAGE);
    }
  };

  const handleResend = async () => {
    try {
      const message = await forgotPassword(email.trim());
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
              <Ionicons
                name={step === 'email' ? 'lock-closed-outline' : 'key-outline'}
                size={40}
                color={Colors.white}
              />
            </View>
            <Text style={styles.title}>
              {step === 'email' ? 'Esqueceu a password?' : 'Redefinir password'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'email'
                ? 'Introduza o seu email e enviaremos um código de recuperação'
                : `Enviámos um código de 6 dígitos para ${email}`}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            {step === 'email' ? (
              <>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={Colors.gray[400]}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="seu@email.com"
                    placeholderTextColor={Colors.gray[400]}
                  />
                </View>

                <Button
                  title={loading ? 'A enviar...' : 'Enviar Código'}
                  onPress={handleRequestCode}
                  loading={loading}
                  variant="gradient"
                  style={styles.actionButton}
                />
              </>
            ) : (
              <>
                <Text style={styles.label}>Código de recuperação</Text>
                <TextInput
                  style={styles.codeInput}
                  value={code}
                  onChangeText={(t) => setCode(t.replace(/\D/g, ''))}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="000000"
                  placeholderTextColor={Colors.gray[300]}
                />

                <Text style={styles.label}>Nova password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={Colors.gray[400]}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showPassword}
                    placeholder="••••••••"
                    placeholderTextColor={Colors.gray[400]}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={Colors.gray[400]}
                    />
                  </TouchableOpacity>
                </View>

                <Button
                  title={loading ? 'A redefinir...' : 'Redefinir Password'}
                  onPress={handleReset}
                  loading={loading}
                  variant="gradient"
                  style={styles.actionButton}
                />

                <TouchableOpacity style={styles.resend} onPress={handleResend}>
                  <Text style={styles.resendText}>Reenviar código</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Lembrou-se? </Text>
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
    textAlign: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
    borderRadius: 14,
    backgroundColor: Colors.gray[50],
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  inputIcon: { marginRight: 8 },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.gray[900],
  },
  eyeButton: { padding: 6 },
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
  actionButton: { marginBottom: 20 },
  resend: { alignItems: 'center', marginBottom: 20 },
  resendText: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 14, color: Colors.gray[500] },
  loginLink: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
});
