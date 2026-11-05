import React,{useState} from 'react';
import {Alert,ScrollView,Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import {Field,PrimaryButton,Screen,styles} from '../components/UI';

export function EditProfileScreen(){
  const {user,updateProfile}=useAuth() as any;
  const navigation=useNavigation<any>();
  const [name,setName]=useState(user?.name||'');
  const [email,setEmail]=useState(user?.email||'');
  const [phone,setPhone]=useState(user?.phone||'');
  const [country,setCountry]=useState(user?.country||'');

  const save=async()=>{
    if(!name.trim())return Alert.alert('Name required','Please enter your name.');
    if(!email.trim())return Alert.alert('Email required','Please enter your email address.');
    await updateProfile(name.trim(),email.trim(),phone.trim(),country.trim());
    Alert.alert('Profile updated','Your profile has been updated.');
    navigation.goBack();
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:24}}>
        <Text style={styles.title}>Edit profile</Text>
        <Text style={styles.subtitle}>Update your personal information.</Text>
        <Field placeholder="Full name" value={name} onChangeText={setName}/>
        <Field placeholder="Email address" keyboardType="email-address" value={email} onChangeText={setEmail}/>
        <Field placeholder="Phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone}/>
        <Field placeholder="Country" value={country} onChangeText={setCountry}/>
        <PrimaryButton title="Save profile" onPress={save}/>
      </ScrollView>
    </Screen>
  );
}
