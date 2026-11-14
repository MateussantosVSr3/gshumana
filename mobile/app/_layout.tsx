import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initializeStorage } from '../lib/storage';

export default function Layout() {
  useEffect(() => { initializeStorage().catch(console.error); }, []);
  return <><StatusBar style="light" /><Stack screenOptions={{ contentStyle:{backgroundColor:'#F3F7F6'},headerStyle:{backgroundColor:'#073B4C'},headerTintColor:'#fff',headerTitleStyle:{fontWeight:'900'},headerShadowVisible:false,headerBackTitle:'Voltar' }}><Stack.Screen name="index" options={{ title: 'ClimaCidadão' }} /><Stack.Screen name="pontos" options={{ title: 'Pontos seguros' }} /><Stack.Screen name="relatar" options={{ title: 'Novo relato' }} /></Stack></>;
}
