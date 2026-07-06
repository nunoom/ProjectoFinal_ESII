import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Button from '../components/Button';
import { apiRegister, ApiError, SERVER_ERROR_MESSAGE } from '../services/api';

export default function RegisterScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As passwords não coincidem');
      return;
    }
    if (!acceptTerms) {
      Alert.alert('Erro', 'Aceite os termos e condições');
      return;
    }
    setLoading(true);
    try {
      await apiRegister(name.trim(), email.trim(), password);
      // Conta criada: falta verificar o email com o código enviado
      navigation.navigate('VerifyEmail', { email: email.trim() });
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
    options?: {
      placeholder?: string;
      secure?: boolean;
      keyboardType?: any;
      autoCapitalize?: any;
    }
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        focusedField === field && styles.inputFocused,
      ]}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon as any}
            size={20}
            color={focusedField === field ? Colors.primary : Colors.gray[400]}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder={options?.placeholder}
          placeholderTextColor={Colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={options?.secure && !showPassword}
          keyboardType={options?.keyboardType}
          autoCapitalize={options?.autoCapitalize}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
        />
        {options?.secure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.gray[400]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
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
              <Text style={styles.logoText}>E</Text>
            </View>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Junte-se à comunidade EHA</Text>
          </View>

          <View style={[styles.decorCircle, { top: -30, right: -50 }]} />
          <View style={[styles.decorCircle, { bottom: 20, left: -40, width: 120, height: 120 }]} />
        </LinearGradient>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            {renderInput('name', 'Nome completo', 'person-outline', name, setName, {
              placeholder: 'João Silva',
              autoCapitalize: 'words',
            })}
            {renderInput('email', 'Email', 'mail-outline', email, setEmail, {
              placeholder: 'seu@email.com',
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            })}
            {renderInput('password', 'Password', 'lock-closed-outline', password, setPassword, {
              placeholder: '••••••••',
              secure: true,
            })}
            {renderInput('confirmPassword', 'Confirmar password', 'lock-closed-outline', confirmPassword, setConfirmPassword, {
              placeholder: '••••••••',
              secure: true,
            })}

            <TouchableOpacity style={styles.terms} onPress={() => setAcceptTerms(!acceptTerms)}>
              <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                {acceptTerms && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
              <Text style={styles.termsText}>
                Aceito os <Text style={styles.termsLink}>Termos e Condições</Text>
              </Text>
            </TouchableOpacity>

            <Button
              title="Criar conta"
              onPress={handleRegister}
              loading={loading}
              variant="gradient"
              style={styles.registerButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.login}>
              <Text style={styles.loginText}>Já tem conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Entrar</Text>
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
  scrollView: { flex: 1 },
  content: { flexGrow: 1 },
  header: {
    paddingBottom: 50,
    paddingHorizontal: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoSection: { alignItems: 'center' },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  logoText: { fontSize: 40, fontWeight: 'bold', color: Colors.white },
  title: { fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  decorCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  form: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 20 },
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
    borderRadius: 14,
    backgroundColor: Colors.gray[50],
    overflow: 'hidden',
  },
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF5F5',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: { paddingLeft: 16, paddingRight: 4 },
  input: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 8,
    fontSize: 16,
    color: Colors.gray[900],
  },
  eyeButton: { padding: 12 },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  termsText: { fontSize: 14, color: Colors.gray[600], flex: 1 },
  termsLink: { color: Colors.primary, fontWeight: '600' },
  registerButton: { marginBottom: 20 },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.gray[200] },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.gray[400],
    fontSize: 13,
    fontWeight: '500',
  },
  socialButtons: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
    backgroundColor: Colors.white,
  },
  socialIcon: { fontSize: 18, fontWeight: 'bold', color: '#EA4335' },
  socialText: { fontSize: 14, fontWeight: '600', color: Colors.gray[700] },
  login: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 14, color: Colors.gray[500] },
  loginLink: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
});
