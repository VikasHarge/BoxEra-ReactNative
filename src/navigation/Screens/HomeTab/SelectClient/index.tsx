import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View, SafeAreaView, ScrollView, TextInput
} from 'react-native'

import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamsList } from '../../../type'
import { styles } from '../Home'
import { Ionicons } from '@expo/vector-icons'
import ModalBox from '../../../../components/Modal'
import { Formik, FormikHelpers } from 'formik'
import { FormikTextInput } from '../../../../components/Form/TextInput'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { addClient, addClientDetailsAsync } from '../../../../store/client'
import * as Yup from 'yup'
import { Estimate } from '../../../../store/types'

export type InitialClientValues = {
  client_name: string,
  client_phone: string,
  client_email: string,
  estimates : Estimate[]
}



const ClientDetailValidation = Yup.object().shape({
  client_name: Yup.string().required('Name is required'),
  client_email: Yup.string().email('Invalid email address').required('Email is required'),
  client_phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

const SelectClient
  = ({ navigation }: NativeStackScreenProps<HomeStackParamsList, keyof HomeStackParamsList>) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { clients } = useAppSelector((state) => state.clients)

    const dispatch = useAppDispatch()

    // console.log(clients);
    


    const handleSubmit = async (values: InitialClientValues, { setErrors }: FormikHelpers<InitialClientValues>) => {



      for(const client of clients){
        if(client.client_name === values.client_name ){
          setErrors({client_name : "Name already present"})
          return
        } 
        if(client.client_phone === values.client_phone ){
          setErrors({client_phone : "phone already used"})
          return
        } 
        if(client.client_email === values.client_email ){
          setErrors({client_email : "email already used"})
          return
        } 
      }

     await dispatch(addClientDetailsAsync(values))
      setIsOpen(false)
      navigation.navigate('BoxDetailsInput', {
        client_name : values.client_name
      })


    }
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
              clients && clients.length > 0 ? <>
                {clients.map((client) => (
                  <Pressable
                  key={client.client_name}
                    onPress={
                      () =>   navigation.navigate('BoxDetailsInput', {
                        client_name : client.client_name as string
                      })
                    } >
                    <View style={[styles.card, styles.elevation, styles.shadowProp]} >
                      <View style={{ flex: 1, flexDirection: 'row', gap: 20, }} >
                        <View style={{ backgroundColor: "#cc8b00",  width: 50, aspectRatio : 1, borderRadius : 100,  justifyContent : 'center', alignItems : 'center' }} >
                          <Text style={{fontSize : 30, fontWeight : "900", color : '#ffff'}} >{client?.client_name?.charAt(0)}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', gap: 4, justifyContent: 'center', alignItems: 'flex-start' }} >
                          <Text style={styles.modalName} >{client?.client_name}</Text>
                          {/* <Text>Vigo TV</Text> */}
                          <Text>{client?.client_email}</Text>
                        </View>
                      </View>
                      <View >
                        {
                          client?.estimates  && client?.estimates?.length > 0 ? <Text style={{ fontSize: 16 }} >{`${client?.estimates.length} Models`}</Text> : <Text style={{ fontSize: 12, color : 'grey' , paddingVertical : 2, paddingHorizontal : 8, borderRadius : 5, borderWidth : 1, borderColor : "grey"  }} >{`0 Models`}</Text>
                        }
                      </View>
                    </View>
                  </Pressable>
                ))}
              </> : <View>
                <Text>No client found. Add Client to start.</Text>
              </View>
            }
          </View>
        </ScrollView>

        <Modal
          visible={isOpen}
          transparent={true}
          animationType='fade'
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={style.modalContainer}
            onPress={() => setIsOpen(false)}
          >
            <TouchableWithoutFeedback>
              <View style={style.modalContent}>
                <Text style={style.head}>Add New Client</Text>

                <View>
                  <Formik<InitialClientValues>
                    initialValues={{
                      client_name: "",
                      client_phone: "",
                      client_email: "",
                      estimates:[]
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={ClientDetailValidation}
                  >
                    {({ submitForm }) => (
                      <View>

                        <FormikTextInput name='client_name' label='Enter Name' />
                        <FormikTextInput name='client_phone' label='Enter Phone' type='phone' />
                        <FormikTextInput name='client_email' label='Enter Email' type='email' />


                        {/* Action */}
                        <View style={style.controls}>


                          <Pressable

                            onPress={() => setIsOpen(false)}
                          >
                            <Text style={style.buttonCancle}>Cancle</Text>
                          </Pressable>
                          <Pressable

                            onPress={submitForm}
                          >
                            <Text style={style.buttonOk}>{"Add"}</Text>
                          </Pressable>
                        </View>

                      </View>
                    )}

                  </Formik>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>


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
          onPress={() => setIsOpen(true)}
        >
          <Ionicons
            name={"person-add"}
            color="#ffff"
            size={25}
          />
        </Pressable>



      </SafeAreaView>
    )
  }

export default SelectClient

const selectClientStyles = StyleSheet.create({
  popupContainer: {
    backgroundColor: "#00000031",
    flex: 1,
  }
})

const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    backgroundColor: '#fff',
    width: '75%',
    padding: 18,
    paddingBottom: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 8,
  },
  head: {
    fontSize: 25,
    fontWeight: 'bold',
    borderLeftWidth: 4,
    borderLeftColor: "orange",
    paddingLeft: 15,

  },
  message: {
    // fontSize: SIZES.h6,
    // color: colors.darkgrey,
  },
  controls: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    alignItems: 'flex-end',
    marginTop: 15,
  },
  buttonOk: {
    color: "#ffff",
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: "green",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10
  },
  buttonCancle: {
    color: "#ffff",
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10
  },
});
