import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getRisk, Risk } from '../lib/api';
import { loadRisk, saveRisk } from '../lib/storage';

const demo: Risk = { level: 'Moderate', heatIndexC: 34.2, guidance: 'Leve água e programe pausas em locais frescos.', calculatedAt: new Date().toISOString() };
const labels = { Low: 'Baixo', Moderate: 'Moderado', High: 'Alto', Extreme: 'Extremo' };
const colors = { Low: '#1B7F5C', Moderate: '#9A6700', High: '#B54708', Extreme: '#B42318' };

export default function Home() {
  const [risk, setRisk] = useState<Risk>(); const [loading, setLoading] = useState(true); const [offline, setOffline] = useState(false);
  async function load() { setLoading(true); try { const value = await getRisk(); setRisk(value); setOffline(false); void saveRisk(value).catch(console.error); } catch { const cached = await loadRisk(); setRisk(cached ?? demo); setOffline(true); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  if (loading) return <View style={s.center}><View style={s.loadingMark}><Text style={s.loadingMarkText}>C</Text></View><ActivityIndicator size="large" color="#0B7A75" accessibilityLabel="Carregando nível de risco" /><Text style={s.loadingText}>Atualizando o clima da região…</Text></View>;
  const updatedAt = new Date(risk!.calculatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return <ScrollView style={s.screen} contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
    <View style={s.locationRow}>
      <View style={s.locationMark}><Text style={s.locationMarkText}>JM</Text></View>
      <View style={s.locationCopy}><Text style={s.miniLabel}>SUA REGIÃO</Text><Text style={s.location}>Jardim Marquesa</Text></View>
      <View style={s.liveBadge}><View style={s.liveDot}/><Text style={s.liveText}>{offline ? 'OFFLINE' : 'AO VIVO'}</Text></View>
    </View>
    {offline && <View style={s.offline} accessibilityRole="alert"><Text style={s.offlineTitle}>Conexão instável</Text><Text style={s.offlineText}>Exibindo {risk === demo ? 'dados de demonstração' : 'a última leitura salva'}.</Text></View>}
    <View><Text style={s.title}>Como está o calor agora?</Text><Text style={s.subtitle}>Orientação rápida para você planejar o próximo deslocamento.</Text></View>
    <View style={s.riskCard} accessible accessibilityLabel={`Risco ${labels[risk!.level]}. Sensação térmica ${risk!.heatIndexC} graus.`}>
      <View style={s.riskHeader}><Text style={s.riskKicker}>RISCO TÉRMICO</Text><Text style={s.time}>Atualizado às {updatedAt}</Text></View>
      <View style={s.riskMain}>
        <View><Text style={[s.level, { color: colors[risk!.level] }]}>{labels[risk!.level]}</Text><Text style={s.levelCaption}>Nível atual</Text></View>
        <View style={s.temperatureBlock}><Text style={s.temp}>{risk!.heatIndexC.toFixed(1)}°</Text><Text style={s.tempCaption}>sensação térmica</Text></View>
      </View>
      <View style={s.divider}/>
      <View style={s.guidanceRow}><View style={[s.guidanceIcon, { backgroundColor: `${colors[risk!.level]}18` }]}><Text style={[s.guidanceIconText, { color: colors[risk!.level] }]}>!</Text></View><Text style={s.guidance}>{risk!.guidance}</Text></View>
    </View>
    <Text style={s.sectionTitle}>O que você precisa?</Text>
    <Link href="/pontos" asChild><Pressable style={s.primary} accessibilityRole="button"><View style={s.actionIcon}><Text style={s.actionIconText}>⌖</Text></View><View style={s.actionCopy}><Text style={s.primaryText}>Encontrar água e sombra</Text><Text style={s.primaryHint}>Veja pontos de apoio próximos</Text></View><Text style={s.primaryArrow}>›</Text></Pressable></Link>
    <Link href="/relatar" asChild><Pressable style={s.secondary} accessibilityRole="button"><View style={s.secondaryIcon}><Text style={s.secondaryIconText}>+</Text></View><View style={s.actionCopy}><Text style={s.secondaryText}>Relatar problema no local</Text><Text style={s.secondaryHint}>Envio anônimo, sem cadastro</Text></View><Text style={s.secondaryArrow}>›</Text></Pressable></Link>
    <Pressable onPress={load} accessibilityRole="button" style={s.refreshButton}><Text style={s.refresh}>↻  Atualizar informação</Text></Pressable>
    <View style={s.noteCard}><Text style={s.noteTitle}>Cuide-se</Text><Text style={s.note}>Em caso de mal-estar, procure atendimento. Alertas oficiais sempre prevalecem.</Text></View>
  </ScrollView>;
}
const s = StyleSheet.create({
  screen:{flex:1,backgroundColor:'#F3F7F6',overflow:'hidden'},page:{width:'100%',maxWidth:480,boxSizing:'border-box',alignSelf:'center',padding:22,paddingBottom:36,gap:18},center:{flex:1,alignItems:'center',justifyContent:'center',gap:16,backgroundColor:'#F3F7F6'},loadingMark:{width:56,height:56,borderRadius:18,backgroundColor:'#073B4C',alignItems:'center',justifyContent:'center'},loadingMarkText:{color:'#FFF',fontSize:28,fontWeight:'900'},loadingText:{color:'#587078',fontSize:15},
  locationRow:{width:'100%',flexDirection:'row',alignItems:'center'},locationMark:{width:44,height:44,borderRadius:15,backgroundColor:'#D9EFEB',alignItems:'center',justifyContent:'center'},locationMarkText:{color:'#0A6A66',fontSize:14,fontWeight:'900'},locationCopy:{marginLeft:12,flex:1,minWidth:0},miniLabel:{fontSize:10,fontWeight:'800',letterSpacing:1.2,color:'#7A8F94'},location:{fontSize:17,fontWeight:'800',color:'#123B43'},liveBadge:{flexDirection:'row',alignItems:'center',gap:6,backgroundColor:'#E2F3EC',paddingHorizontal:10,paddingVertical:7,borderRadius:99,flexShrink:0},liveDot:{width:7,height:7,borderRadius:4,backgroundColor:'#16865B'},liveText:{fontSize:10,fontWeight:'900',letterSpacing:.7,color:'#166847'},
  offline:{width:'100%',boxSizing:'border-box',backgroundColor:'#FFF7DD',borderWidth:1,borderColor:'#F1D98B',padding:13,borderRadius:14},offlineTitle:{fontSize:14,fontWeight:'800',color:'#654D0B'},offlineText:{fontSize:13,color:'#735D21',marginTop:2},title:{fontSize:29,lineHeight:35,fontWeight:'900',letterSpacing:-.7,color:'#123B43',flexShrink:1},subtitle:{fontSize:15,lineHeight:22,color:'#667C82',marginTop:6,flexShrink:1},
  riskCard:{width:'100%',boxSizing:'border-box',overflow:'hidden',backgroundColor:'#FFF',padding:20,borderRadius:24,shadowColor:'#123B43',shadowOpacity:.1,shadowRadius:18,shadowOffset:{width:0,height:7},elevation:4},riskHeader:{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8},riskKicker:{fontSize:11,fontWeight:'900',letterSpacing:1.4,color:'#71868B'},time:{fontSize:12,color:'#839498',flexShrink:1,textAlign:'right'},riskMain:{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginTop:18,gap:12},level:{fontSize:44,lineHeight:49,fontWeight:'900',letterSpacing:-1.2},levelCaption:{fontSize:13,color:'#71868B',marginTop:2},temperatureBlock:{alignItems:'flex-end',flexShrink:0},temp:{fontSize:35,lineHeight:39,fontWeight:'900',letterSpacing:-1,color:'#153E45'},tempCaption:{fontSize:12,color:'#71868B',marginTop:3},divider:{height:1,backgroundColor:'#E7EFED',marginVertical:18},guidanceRow:{flexDirection:'row',alignItems:'center',gap:12},guidanceIcon:{width:36,height:36,borderRadius:12,alignItems:'center',justifyContent:'center',flexShrink:0},guidanceIconText:{fontSize:20,fontWeight:'900'},guidance:{flex:1,flexShrink:1,fontSize:15,lineHeight:22,color:'#34545A',fontWeight:'600'},
  sectionTitle:{fontSize:18,fontWeight:'900',color:'#153E45',marginTop:2},primary:{width:'100%',boxSizing:'border-box',overflow:'hidden',minHeight:78,backgroundColor:'#087F7A',padding:14,borderRadius:20,flexDirection:'row',alignItems:'center',shadowColor:'#087F7A',shadowOpacity:.2,shadowRadius:12,shadowOffset:{width:0,height:5},elevation:3},actionIcon:{width:46,height:46,borderRadius:15,backgroundColor:'rgba(255,255,255,.16)',alignItems:'center',justifyContent:'center',flexShrink:0},actionIconText:{color:'#FFF',fontSize:26,fontWeight:'700'},actionCopy:{flex:1,minWidth:0,marginLeft:13},primaryText:{color:'#FFF',fontSize:16,fontWeight:'900',flexShrink:1},primaryHint:{color:'#D7F2EF',fontSize:12,marginTop:4,flexShrink:1},primaryArrow:{color:'#FFF',fontSize:30,fontWeight:'300',paddingHorizontal:5},secondary:{width:'100%',boxSizing:'border-box',overflow:'hidden',minHeight:78,backgroundColor:'#FFF',borderWidth:1,borderColor:'#DCE8E5',padding:14,borderRadius:20,flexDirection:'row',alignItems:'center'},secondaryIcon:{width:46,height:46,borderRadius:15,backgroundColor:'#E8F3F1',alignItems:'center',justifyContent:'center',flexShrink:0},secondaryIconText:{color:'#087F7A',fontSize:25,fontWeight:'500'},secondaryText:{color:'#153E45',fontSize:16,fontWeight:'900',flexShrink:1},secondaryHint:{color:'#71868B',fontSize:12,marginTop:4,flexShrink:1},secondaryArrow:{color:'#7B9195',fontSize:30,fontWeight:'300',paddingHorizontal:5},
  refreshButton:{alignSelf:'center',paddingVertical:8,paddingHorizontal:16},refresh:{fontSize:14,color:'#08736F',fontWeight:'800'},noteCard:{backgroundColor:'#E8F2F0',padding:16,borderRadius:18,borderLeftWidth:4,borderLeftColor:'#7EB9AE'},noteTitle:{fontSize:14,fontWeight:'900',color:'#214B51'},note:{fontSize:13,lineHeight:19,color:'#597278',marginTop:3}
});
