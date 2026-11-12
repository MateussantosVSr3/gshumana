import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initializeStorage } from '../lib/storage';

export default function Layout() {
  useEffect(() => { initializeStorage().catch(console.error); }, []);
  return <><StatusBar style="dark" /><Stack screenOptions={{ headerStyle: { backgroundColor: '#073B4C' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '700' } }}><Stack.Screen name="index" options={{ title: 'ClimaCidadão' }} /><Stack.Screen name="pontos" options={{ title: 'Pontos seguros' }} /><Stack.Screen name="relatar" options={{ title: 'Relatar problema' }} /></Stack></>;
}
