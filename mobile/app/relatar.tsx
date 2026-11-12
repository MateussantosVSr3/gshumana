import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { sendReport } from '../lib/api';

export default function Report() {
  const [description,setDescription]=useState(''); const [sending,setSending]=useState(false);
  async function submit(){ if(description.trim().length<10){Alert.alert('Descreva um pouco mais','Use pelo menos 10 caracteres.');return;} setSending(true); try{await sendReport({category:'sem-sombra',neighborhood:'Bela Vista',description:description.trim()});setDescription('');Alert.alert('Relato enviado','Obrigado. Nenhum dado pessoal foi solicitado.');}catch{Alert.alert('Não foi possível enviar','Tente novamente quando houver conexão.');}finally{setSending(false);} }
  return <View style={s.page}><Text style={s.label}>O que encontrou?</Text><TextInput value={description} onChangeText={setDescription} multiline maxLength={280} style={s.input} placeholder="Ex.: ponto de apoio fechado às 14h" accessibilityLabel="Descrição do problema"/><Text style={s.counter}>{description.length}/280</Text><Text style={s.privacy}>Não informe nome, telefone, condição médica ou endereço residencial.</Text><Pressable onPress={submit} disabled={sending} style={s.button} accessibilityRole="button"><Text style={s.buttonText}>{sending?'Enviando…':'Enviar relato anônimo'}</Text></Pressable></View>;
}
const s=StyleSheet.create({page:{flex:1,padding:24,gap:12,backgroundColor:'#F6FAFB'},label:{fontSize:20,fontWeight:'700'},input:{backgroundColor:'#FFF',borderWidth:1,borderColor:'#6B858D',borderRadius:10,padding:14,fontSize:18,minHeight:140,textAlignVertical:'top'},counter:{textAlign:'right',fontSize:15},privacy:{fontSize:16,lineHeight:23,color:'#425E67'},button:{backgroundColor:'#006D77',padding:17,borderRadius:10,marginTop:8},buttonText:{color:'#FFF',fontSize:18,fontWeight:'700',textAlign:'center'}});
