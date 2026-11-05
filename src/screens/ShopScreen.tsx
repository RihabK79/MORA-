import React, {useState} from 'react';
import {FlatList,Pressable,Text,View,TextInput,Keyboard} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {products} from '../data/products';
import {ProductImage,Screen,styles} from '../components/UI';
import {colors} from '../theme';
import {Category,Product} from '../types';

const subcategories: Record<Category,string[]> = {
  Skincare: ['Cleanser','Moisturizer','Serum','Sun Care'],
  Makeup: ['Mascara','Face Tint','Lipstick','Lip Gloss'],
  Perfumes: ['Floral','Amber','Vanilla'],
};

export function ShopScreen(){
  const [category,setCategory]=useState<Category|null>(null);
  const [subcategory,setSubcategory]=useState<string|null>(null);
  const [search,setSearch]=useState('');
  const nav=useNavigation<any>();

  const selectCategory=(next:Category)=>{
    setCategory(next);
    setSubcategory(null);
    setSearch('');
  };

  const query=search.trim().toLowerCase();
  const searching=query.length>0;
  const data=products.filter((product:Product)=>{
    if(searching){
      return `${product.name} ${product.category} ${product.subcategory ?? ''}`.toLowerCase().includes(query);
    }
    return category&&subcategory
      ? product.category===category&&product.subcategory===subcategory
      : false;
  });

  return (
    <Screen>
      <Text style={styles.title}>Search MORA</Text>
      <Text style={styles.subtitle}>Find the beauty essentials you love.</Text>
      <View style={{position:'relative',justifyContent:'center'}}>
        <Ionicons name="search-outline" size={20} color={colors.muted} style={{position:'absolute',left:14,zIndex:1}}/>
        <TextInput
          value={search}
          onChangeText={(value)=>{setSearch(value);if(value) setSubcategory(null);}}
          placeholder="Search products, categories..."
          placeholderTextColor={colors.muted}
          style={[styles.input,{paddingLeft:44}]}
          returnKeyType="search"
          blurOnSubmit={true}
          onSubmitEditing={()=>Keyboard.dismiss()}
        />
      </View>

      {!searching && (
        <>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <Text style={{fontSize:18,fontWeight:'700',color:colors.text}}>Categories</Text>
            {category&&<Pressable onPress={()=>{setCategory(null);setSubcategory(null);}}><Text style={{color:colors.primary,fontWeight:'600'}}>Clear</Text></Pressable>}
          </View>
          <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:20}}>
            {(Object.keys(subcategories) as Category[]).map((item)=>(
              <Pressable key={item} onPress={()=>selectCategory(item)} style={{paddingHorizontal:16,paddingVertical:10,borderRadius:20,backgroundColor:item===category?colors.primary:'#fff',borderWidth:1,borderColor:colors.border}}>
                <Text style={{color:item===category?'#fff':colors.text,fontWeight:'600'}}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {category&&!subcategory&&(
            <>
              <View style={{flexDirection:'row',alignItems:'center',marginBottom:12}}>
                <Pressable hitSlop={8} onPress={()=>setCategory(null)} style={{marginRight:10}}><Ionicons name="chevron-back" size={22} color={colors.primary}/></Pressable>
                <Text style={{fontSize:18,fontWeight:'700',color:colors.text}}>{category}</Text>
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
                {subcategories[category].map((item)=>(
                  <Pressable key={item} onPress={()=>setSubcategory(item)} style={{minWidth:'47%',flexGrow:1,padding:18,borderRadius:16,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <Text style={{fontSize:15,fontWeight:'700',color:colors.text}}>{item}</Text>
                      <Ionicons name="chevron-forward" size={18} color={colors.primary}/>
                    </View>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </>
      )}

      {(searching||subcategory)&&(
        <>
          {subcategory&&!searching&&(
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:12}}>
              <Pressable hitSlop={8} onPress={()=>setSubcategory(null)} style={{marginRight:10}}><Ionicons name="chevron-back" size={22} color={colors.primary}/></Pressable>
              <Text style={{fontSize:18,fontWeight:'700',color:colors.text}}>{subcategory}</Text>
            </View>
          )}
          {searching&&<Text style={{fontSize:18,fontWeight:'700',color:colors.text,marginBottom:12}}>{data.length} result{data.length===1?'':'s'}</Text>}
          <FlatList
            data={data}
            numColumns={2}
            columnWrapperStyle={{justifyContent:'space-between'}}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
              <Pressable onPress={()=>nav.navigate('ProductDetails',{productId:item.id})} style={[styles.card,{flex:0,width:'48%',maxWidth:'48%',marginBottom:12}]}>
                <ProductImage uri={item.image}/>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={{color:colors.muted}}>{item.category} · {item.subcategory} · {item.size}</Text>
                <Text style={styles.price}>{item.price} MAD</Text>
              </Pressable>
            )}
            ListEmptyComponent={<View style={{paddingVertical:40,alignItems:'center'}}><Ionicons name="search-outline" size={36} color={colors.muted}/><Text style={{color:colors.muted,marginTop:10}}>No products found</Text></View>}
            contentContainerStyle={{paddingBottom:76}}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Screen>
  );
}
