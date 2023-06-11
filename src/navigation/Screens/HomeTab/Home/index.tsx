import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

import tw from 'tailwind-react-native-classnames'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { HomeStackParamsList } from '../../../type'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from '../../../../store'
import { useAllBoxeSelector } from '../../../../store/selectors'

const Home = ({ navigation }: NativeStackScreenProps<HomeStackParamsList, keyof HomeStackParamsList>) => {
;
  const boxsesArr = useAllBoxeSelector()
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
        position: "relative"
      }}
    >

      <ScrollView style={{ paddingBottom: 20, }}  >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          gap: 10,
          padding: 10,

        }} >
          {
            boxsesArr && boxsesArr.length > 0 ? <>
              {
                boxsesArr.map((box)=><Pressable
                key={box.box_name}
                onPress={
                  () => navigation.navigate('PaperDetailsInput')
                } >
                <View style={[styles.card, styles.elevation, styles.shadowProp]} >
                  <View style={{flex : 1, flexDirection : 'row', gap : 20,  }} >
                  <View style={{ backgroundColor: "#cc8b00",  width: 50, aspectRatio : 1, borderRadius : 100,  justifyContent : 'center', alignItems : 'center' }} >
                          <Text style={{fontSize : 30, fontWeight : "900", color : '#ffff'}} >{box?.box_name?.charAt(0)}</Text>
                        </View>
                    <View style={{flex : 1, flexDirection : 'column', gap:4, justifyContent : 'center', alignItems :'flex-start' }} >
                      <Text style={styles.modalName} >{box.box_name}</Text>
                      <Text style={{ fontSize: 15, color: 'grey' }} >{box.client_name}</Text>
                      {/* <Text>Vigo TV</Text> */}
                     
                    </View>
                  </View>
                  <View >
                    <Text style={{fontSize : 16}} >20 Rs/box</Text>
                    <Text style={{ fontSize: 18, color: 'grey' }} >{`${box.outer_length}X${box.outer_width}X${box.outer_height}`}</Text>
                  </View>
                </View>
              </Pressable>)
              }
            </> : <View>
            <Text>No Boxes added yet, please add box to client</Text>
          </View>
          }
        </View>
      </ScrollView>

      <Pressable
        style={[{
          position: "absolute",
          bottom: 0,
          right: 0,
          backgroundColor: '#014DA4',
          padding: 15,
          borderRadius: 100,
          margin: 15,
        }, styles.elevation]}
        onPress={() => {
          navigation.navigate('SelectClient')
        }}
      >
        <Ionicons
          name={"cube"}
          color="#ffff"
          size={25}
        />
      </Pressable>

    </SafeAreaView>
  )
}

export default Home


export const styles = StyleSheet.create({

  card: {
    backgroundColor: '#dbe7ff',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems : 'center',
    flexDirection: 'row',
    gap: 20
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#000000',
  },
  modalName: {
    fontSize: 20,
    fontWeight: '700',
  }
});