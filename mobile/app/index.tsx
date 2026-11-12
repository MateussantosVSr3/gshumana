import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { getRisk, Risk } from '../lib/api';
import { loadRisk, saveRisk } from '../lib/storage';

const demo: Risk = { level: 'Moderate', heatIndexC: 34.2, guidance: 'Leve água e programe pausas em locais frescos.', calculatedAt: new Date().toISOString() };
const labels = { Low: 'Baixo', Moderate: 'Moderado', High: 'Alto', Extreme: 'Extremo' };
const colors = { Low: '#1B7F5C', Moderate: '#9A6700', High: '#B54708', Extreme: '#B42318' };

export default function Home() {
  const [risk, setRisk] = useState<Risk>(); const [loading, setLoading] = useState(true); const [offline, setOffline] = useState(false);
  async function load() { setLoading(true); try { const value = await getRisk(); setRisk(value); setOffline(false); await saveRisk(value); } catch { const cached = await loadRisk(); setRisk(cached ?? demo); setOffline(true); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  if (loading) return <View style={s.center}><ActivityIndicator size="large" accessibilityLabel="Carregando nível de risco" /></View>;
  return <View style={s.page}>
    {offline && <Text style={s.offline} accessibilityRole="alert">Sem conexão — exibindo {risk === demo ? 'demonstração' : 'última leitura salva'}.</Text>}
    <Text style={s.eyebrow}>BELA VISTA · AGORA</Text>
    <View style={[s.card, { borderLeftColor: colors[risk!.level] }]} accessible accessibilityLabel={`Risco ${labels[risk!.level]}. Sensação térmica ${risk!.heatIndexC} graus.`}>
      <Text style={s.label}>Risco térmico</Text><Text style={[s.level, { color: colors[risk!.level] }]}>{labels[risk!.level]}</Text>
      <Text style={s.temp}>{risk!.heatIndexC.toFixed(1)} °C</Text><Text style={s.guidance}>{risk!.guidance}</Text>
    </View>
    <Link href="/pontos" asChild><Pressable style={s.primary} accessibilityRole="button"><Text style={s.primaryText}>Encontrar água e sombra</Text></Pressable></Link>
    <Link href="/relatar" asChild><Pressable style={s.secondary} accessibilityRole="button"><Text style={s.secondaryText}>Relatar problema no local</Text></Pressable></Link>
    <Pressable onPress={load} accessibilityRole="button"><Text style={s.refresh}>Atualizar informação</Text></Pressable>
    <Text style={s.note}>Protótipo preventivo. Em mal-estar, procure atendimento. Alertas oficiais prevalecem.</Text>
  </View>;
}
const s = StyleSheet.create({ page:{flex:1,padding:24,gap:16,backgroundColor:'#F6FAFB'},center:{flex:1,alignItems:'center',justifyContent:'center'},offline:{backgroundColor:'#FFF4CC',color:'#513B00',padding:12,fontSize:16},eyebrow:{fontSize:14,fontWeight:'700',color:'#46636D'},card:{backgroundColor:'#FFF',padding:22,borderRadius:14,borderLeftWidth:8,gap:8},label:{fontSize:18,color:'#334E57'},level:{fontSize:38,fontWeight:'800'},temp:{fontSize:26,fontWeight:'700'},guidance:{fontSize:18,lineHeight:27,color:'#243B42'},primary:{backgroundColor:'#006D77',padding:17,borderRadius:10},primaryText:{color:'#FFF',fontSize:18,fontWeight:'700',textAlign:'center'},secondary:{borderWidth:2,borderColor:'#006D77',padding:15,borderRadius:10},secondaryText:{color:'#005963',fontSize:18,fontWeight:'700',textAlign:'center'},refresh:{fontSize:17,color:'#005963',textDecorationLine:'underline',textAlign:'center',padding:8},note:{fontSize:14,lineHeight:20,color:'#526B73'}});
