import React, { useState } from 'react';
import { Alert, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useAuth } from '../context/AuthContext';
import { BrandLogo, Field, PrimaryButton, Screen, styles } from '../components/UI';
import { colors } from '../theme';
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export function LoginScreen({ navigation }: Props) {
  const { login } = useAuth(); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const submit = async () => { if (!email.trim() || !password) return Alert.alert('Missing information', 'Enter your email and password.'); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return Alert.alert('Invalid email', 'Enter a valid email address.'); try { await login(email.trim(), password); } catch (error) { Alert.alert('Unable to log in', error instanceof Error ? error.message : 'Please try again.'); } };
  return <Screen style={{ justifyContent: 'center' }}><BrandLogo /><Text style={[styles.title, { textAlign: 'center' }]}>Welcome back</Text><Text style={[styles.subtitle, { textAlign: 'center' }]}>Your beauty routine, thoughtfully curated.</Text><Field placeholder="Email address" keyboardType="email-address" value={email} onChangeText={setEmail} /><Field placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} /><Pressable onPress={() => Alert.alert('Password recovery', 'In this frontend demo, password recovery is not connected yet. It will be implemented with the backend email service.')}><Text style={{ color: colors.primary, textAlign: 'right', marginBottom: 8 }}>Forgot password?</Text></Pressable><PrimaryButton title="Log in" onPress={submit} /><Pressable onPress={() => navigation.navigate('Register')}><Text style={styles.link}>New to MORA? Create an account</Text></Pressable><Text style={{ textAlign: 'center', color: colors.muted, fontSize: 11, marginTop: 24 }}>DEMO MODE · Authentication is local only</Text></Screen>;
}
