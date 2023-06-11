import { View, Text, SafeAreaView, ScrollView, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
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










const BoxDetailsInput = ({ navigation, route }: NativeStackScreenProps<HomeStackParamsList, keyof HomeStackParamsList>) => {

    const client_name = route.params?.client_name
    const dispatch = useAppDispatch()

    const handleSubmit = async (valuses: Estimate, { setErrors }: FormikHelpers<Estimate>) => {
        try {
            await dispatch(addBoxToClientDetailsAsync({ client_name: valuses.client_name, estimate: valuses }))
            // AsyncStorage.setItem("clients", JSON.stringify([]))
            // AsyncStorage.setItem("Boxes", JSON.stringify([]))
            console.log('added');
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
            >

                <Formik<Estimate>
                    initialValues={{
                        ...estimateInitial,
                        client_name: client_name as string,
                        profit : "15",
                        tax : "18",
                        wastage : "3",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={estimateSchema}

                >
                    {({ values, submitForm }) => (

                        <View style={{}}  >
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }} >
                                <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', borderLeftWidth: 3, borderLeftColor: 'orange', paddingLeft: 10, }} >
                                    <Ionicons name='people' size={25} color="#116fdb" />
                                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#0C315A" }} >{client_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 3, backgroundColor: '#ffff', borderRadius: 6, padding: 5, paddingHorizontal: 10 }} >
                                    <Text style={[styles.inputHead]} >{values.box_name}</Text>
                                    {
                                        values.outer_height && values.outer_length && values.outer_width && <Text style={{ fontSize: 13, color: 'grey' }} >{`${values.outer_length}X${values.outer_width}X${values.outer_height}`}</Text>
                                    }
                                </View>
                            </View>


                            <FormikTextInput name='box_name' label='Enter Box Name' />

                            <View style={{ width: '100%', marginVertical: 10 }} >
                                <Text style={styles.inputHead} >Enter Box Outer Dimentions</Text>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 20 }} >
                                    <View style={{ flex: 1 }} >
                                        <FormikTextInput name='outer_length' label='Length (inch)' type='phone' />
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <FormikTextInput name='outer_width' label='Width (inch)' type='phone' />
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <FormikTextInput name='outer_height' label='Height (inch)' type='phone' />
                                    </View>
                                </View>

                                {/* Ply select */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginVertical: 10 }} >
                                    <Text style={[styles.inputHead, { flex: 1 }]} >Number of ply</Text>
                                    <FormikSelect name='ply_number' label='Select Number of Ply' options={plyOptions} />
                                </View>
                            </View>



                            {/* Paper Specification */}
                            <View style={{ width: '100%', marginVertical: 10 }} >
                                <Text style={[styles.inputHead, { marginBottom: 8 }]} >Paper Specifications</Text>
                                {/* Top */}
                                <Text style={[styles.inputHead, { fontSize: 13 }]} >Top Paper</Text>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 20 }} >
                                    <View style={{ flex: 0.5 }} >
                                        <FormikTextInput name='top_bf' label='BF' type='phone' />
                                    </View>

                                    {/* GSM */}
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginVertical: 10 }} >
                                        <Text>GSM</Text>
                                        <FormikSelect name='top_gsm' label='GSM' options={gsmOptions} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 20, marginBottom: 8 }} >
                                    <View style={{ flex: 0.32 }} >
                                        <FormikTextInput name='top_paper_rate' label='Paper Rate/kg' type='phone' />
                                    </View>
                                </View>

                                {/* Middle */}


                                <Text style={[styles.inputHead, { fontSize: 13 }]} >Middle Paper</Text>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 20 }} >
                                    <View style={{ flex: 0.5 }} >
                                        <FormikTextInput name='mid_bf' label='BF' type='phone' />
                                    </View>

                                    {/* GSM */}
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginVertical: 10 }} >
                                        <Text>GSM</Text>
                                        <FormikSelect name='mid_gsm' label='GSM' options={gsmOptions} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 20, marginBottom: 8 }} >
                                    <View style={{ flex: 0.5 }} >
                                        <FormikTextInput name='mid_paper_rate' label='Paper Rate/kg' type='phone' />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 20, marginVertical: 10 }} >
                                        <Text>FF</Text>
                                        <FormikSelect name='mid_ff' label='FF' options={ffOptions} />
                                    </View>
                                </View>

                                {/*Bottom  */}


                                <Text style={[styles.inputHead, { fontSize: 13 }]} >Bottom Paper</Text>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 20 }} >
                                    <View style={{ flex: 0.5 }} >
                                        <FormikTextInput name='bottom_bf' label='BF' type='phone' />
                                    </View>
                                    {/* GSM */}
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginVertical: 10 }} >
                                        <Text>GSM</Text>
                                        <FormikSelect name='bottom_gsm' label='GSM' options={gsmOptions} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 20, marginBottom: 8 }} >
                                    <View style={{ flex: 0.32 }} >
                                        <FormikTextInput name='bottom_paper_rate' label='Paper Rate/kg' type='phone' />
                                    </View>
                                </View>

                            </View>

                            {/* Printing Specifications */}
                            <View>
                                <Text style={[styles.inputHead, { marginBottom: 8 }]} >Printing Specifications</Text>
                                <View style={{ flex: 1, width: "35%", marginBottom: 5 }} >
                                    <FormikTextInput name='box_quantity' label='Box Quantity' type='phone' />
                                </View>
                                <View style={{ marginBottom: 8 }} >
                                    <Text style={[styles.inputHead, { fontSize: 13 }]} >Color Selection</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginVertical: 10 }} >
                                        <Text style={{ width: '25%' }} >Color Type</Text>
                                        <FormikSelect name='color_type' label='Color Type' options={colorOptions} />
                                    </View>
                                    <ColorNotice  type={values.color_type as ColorType} />
                                    
                                </View>

                                <View style={{ marginBottom: 8 }} >
                                    <Text style={[styles.inputHead, { fontSize: 13 }]} >Lamination Selection</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginVertical: 10 }} >
                                        <Text style={{ width: '25%' }} >Lamination Type</Text>
                                        <FormikSelect name='lamination_type' label='Color Type' options={laminationOptions} />
                                    </View>
                                   {values.lamination_type === "yes" &&  <Text style={{textAlign: 'left', color : '#ff8c00', marginBottom : 15}} >6 ₹ / Box</Text>}
                                </View>
                            </View>

                            {/* Charges */}

                            <View style ={{flex : 1, marginBottom : 35}} >
                                <Text style={[styles.inputHead, { marginBottom: 8, }]} >Charges</Text>
                                <View style={{flex:1 , flexDirection : 'row', gap:25}} >
                                    <View style={{ flex : 1,  marginBottom: 5, flexDirection : "row" }} >
                                        <FormikTextInput name='transportation_charge' label='Transportation + Other ( ₹ )' type='phone' />
                                    </View>
                                    <View style={{ flex : 1,  marginBottom: 5, flexDirection : "row" }} >
                                        <FormikTextInput name='profit' label='Profit ( % )' type='phone' />
                                    </View>
                                </View>
                                <View style={{flex:1 , flexDirection : 'row', gap:25}} >
                                    <View style={{ flex : 1,  marginBottom: 5, flexDirection : "row" }} >
                                        <FormikTextInput name='tax' label='Tax ( % )' type='phone' />
                                    </View>
                                    <View style={{ flex : 1,  marginBottom: 5, flexDirection : "row" }} >
                                        <FormikTextInput name='wastage' label='Wastage ( % )' type='phone' />
                                    </View>
                                </View>
                            </View>




                            {/* Estimate Details */}
                            <EstimateDetails values={values}  />


                            {/* Color Details */}

                            {/* <View style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderRadius: 6, gap: 10, marginBottom: 15 }} >
                                <Text style={[styles.inputHead, { borderLeftWidth: 2, borderRightColor: "#433cc9", paddingLeft: 10, marginBottom: 10 }]} >
                                    Color Specifications
                                </Text>
                                <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >
                                    <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
                                        <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Cutting Length</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{cuttingLength(values) || "00.00"}</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
                                        <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Cutting Height</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{cuttingLength(values) || "00.00"}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >
                                    <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
                                        <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Cutting Length</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{cuttingLength(values) || "00.00"}</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
                                        <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Cutting Height</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{cuttingLength(values) || "00.00"}</Text>
                                    </View>
                                </View>
                            </View> */}



                            <Pressable

                                onPress={submitForm}
                            >
                                <Text style={styles.saveBoxBtn}>{"Save Estimate"}</Text>
                            </Pressable>





                        </View>
                    )}

                </Formik>

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
    }
})