import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getSafePoints, SafePoint } from '../lib/api';
import { loadSafePoints, saveSafePoints } from '../lib/storage';

const fallback: SafePoint[] = [{ id: 1, name: 'Parque Trianon', address: 'R. Peixoto Gomide, 949', kind: 'Sombra', isAccessible: true, isVerified: true }];
export default function Points() {
  const [items, setItems] = useState<SafePoint[]>([]); const [notice, setNotice] = useState('');
  useEffect(() => { getSafePoints().then(async points => { setItems(points); await saveSafePoints(points); }).catch(async () => { const cached = await loadSafePoints(); setItems(cached ?? fallback); setNotice(cached ? 'Sem conexão — exibindo a última lista salva.' : 'Exibindo exemplo local; confirme antes de se deslocar.'); }); }, []);
  return <View style={s.page}>{notice && <Text style={s.notice}>{notice}</Text>}<FlatList data={items} keyExtractor={x=>String(x.id)} renderItem={({item})=><View style={s.card} accessible><Text style={s.name}>{item.name}</Text><Text style={s.text}>{item.address}</Text><Text style={s.tag}>{item.kind} · {item.isAccessible?'Acessível':'Acessibilidade não informada'} · {item.isVerified?'Verificado':'Não verificado'}</Text></View>} /></View>;
}
const s=StyleSheet.create({page:{flex:1,padding:20,backgroundColor:'#F6FAFB'},notice:{padding:12,backgroundColor:'#FFF4CC',fontSize:16,marginBottom:12},card:{padding:18,marginBottom:12,backgroundColor:'#FFF',borderRadius:12},name:{fontSize:20,fontWeight:'700',color:'#073B4C'},text:{fontSize:17,marginTop:6},tag:{fontSize:15,color:'#46636D',marginTop:10}});
