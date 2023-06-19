import { View, Text, SafeAreaView, ScrollView, StyleSheet, Button, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { HomeStackParamsList } from '../../../type'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Formik, FormikHelpers } from 'formik'

import { ColorType, Estimate } from '../../../../store/types'
import { useAppDispatch } from '../../../../store'
import { addBoxToClientDetailsAsync, editBoxOfClient } from '../../../../store/client'


import { useAllBoxeSelector } from '../../../../store/selectors'
import BoxForm from '../../../../components/BoxForm'










const BoxEdit = ({ navigation, route }: NativeStackScreenProps<HomeStackParamsList, "BoxEdit">) => {

  const { box } = route.params
    const dispatch = useAppDispatch()
    const boxsesArr = useAllBoxeSelector()
    const scrollViewRef = useRef<ScrollView>(null);





    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true, });
    };

    const initialValues = {
      ...box
    }

    const handleSubmit = async (values: Estimate, { setErrors }: FormikHelpers<Estimate>) => {
        try {

            await dispatch(editBoxOfClient({ client_name: box.client_name, edited_box: values, box_name : box.box_name }))
            navigation.navigate('Home')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 10,
                position: "relative"
            }}
        >
            <ScrollView
                style={{ padding: 10, }}
                ref={scrollViewRef}
            >

                <BoxForm isEdit initialValues={initialValues} client_name={box.client_name as string}  handleSubmit={handleSubmit} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default BoxEdit


