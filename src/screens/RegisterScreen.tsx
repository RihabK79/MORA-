import React, { useState } from 'react';
import { Alert, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useAuth } from '../context/AuthContext';
import { BrandLogo, Field, PrimaryButton, Screen, styles } from '../components/UI';
import { colors } from '../theme';
type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;
export function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth(); const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState('');
  const submit = async () => { if (!name.trim() || !email.trim() || !password || !confirm) return Alert.alert('Missing information', 'Please complete every field.'); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return Alert.alert('Invalid email', 'Enter a valid email address.'); if (password.length < 8) return Alert.alert('Weak password', 'Use at least 8 characters.'); if (password !== confirm) return Alert.alert('Password mismatch', 'Your passwords do not match.'); try { await register(name.trim(), email.trim(), password); } catch (error) { Alert.alert('Unable to register', error instanceof Error ? error.message : 'Please try again.'); } };
  return <Screen style={{ justifyContent: 'center' }}><BrandLogo /><Text style={[styles.title, { textAlign: 'center' }]}>Create account</Text><Text style={[styles.subtitle, { textAlign: 'center' }]}>Join MORA and discover your beauty essentials.</Text><Field placeholder="Full name" autoCapitalize="words" value={name} onChangeText={setName} /><Field placeholder="Email address" keyboardType="email-address" value={email} onChangeText={setEmail} /><Field placeholder="Password (8+ characters)" secureTextEntry value={password} onChangeText={setPassword} /><Field placeholder="Confirm password" secureTextEntry value={confirm} onChangeText={setConfirm} /><PrimaryButton title="Create account" onPress={submit} /><Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.link}>Already have an account? Log in</Text></Pressable><Text style={{ textAlign: 'center', color: colors.muted, fontSize: 11, marginTop: 20 }}>DEMO MODE · Do not use real passwords</Text></Screen>;
}
