import { View, Text, SafeAreaView, ScrollView, StyleSheet, Button, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { HomeStackParamsList } from '../../../type'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import { Formik, FormikHelpers } from 'formik'

import { FormikTextInput } from '../../../../components/Form/TextInput'
import FormikSelect from '../../../../components/Form/FormikSelect'
import { ColorType, Estimate } from '../../../../store/types'
import { useAppDispatch } from '../../../../store'
import { addBoxToClientDetailsAsync } from '../../../../store/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colorOptions, estimateInitial, estimateSchema, ffOptions, gsmOptions, laminationOptions, plyOptions } from './constants'
import EstimateDetails from './components/EstimateDetails'
import ColorNotice from './components/ColorNotice'
import { useAllBoxeSelector } from '../../../../store/selectors'
import { useScrollToTop } from '@react-navigation/native'
import BoxForm from '../../../../components/BoxForm'










const BoxDetailsInput = ({ navigation, route }: NativeStackScreenProps<HomeStackParamsList, "BoxDetailsInput">) => {

    const client_name = route.params?.client_name
    const dispatch = useAppDispatch()
    const boxsesArr = useAllBoxeSelector()
    const scrollViewRef = useRef<ScrollView>(null);

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true, });
    };

    const initialValues : Estimate = {
        ...estimateInitial,
        client_name: client_name as string,
        profit: "15",
        tax: "18",
        wastage: "3",
        conversion_cost: "10",
        lamination_factor: "0.006",
        ply_number : 5,
        top_gsm : "100"

    
        
    }

    const handleSubmit = async (values: Estimate, { setErrors }: FormikHelpers<Estimate>) => {
        try {

            const boxExists = boxsesArr.some((box) => box.box_name === values.box_name);

            if (boxExists) {
              setErrors({ box_name: "Box Name Already used" });
              scrollToTop();
              return;
            }

            await dispatch(addBoxToClientDetailsAsync({ client_name: values.client_name, estimate: values }))
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

                <BoxForm isEdit={false} initialValues={initialValues} client_name={client_name as string}  handleSubmit={handleSubmit} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default BoxDetailsInput


export const styles = StyleSheet.create({
    inputHead: {
        fontSize: 16,
        fontWeight: '700',
    },
    saveBoxBtn: {
        color: "#ffff",
        fontSize: 20,
        fontWeight: '500',
        backgroundColor: "green",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
        textAlign: 'center'
    },
    deleteBoxBtn: {
        color: "#ffff",
        fontSize: 20,
        fontWeight: '500',
        backgroundColor: "red",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
        textAlign: 'center'
    },
    warningBoxBtn: {
        color: "#ffff",
        fontSize: 20,
        fontWeight: '500',
        backgroundColor: "orange",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
        textAlign: 'center'
    },
})