import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import { Formik, FormikHelpers } from 'formik'
import {  estimateSchema, ffOptions, gsmOptions, isColorOptions, laminationOptions, plyOptions } from '../../navigation/Screens/HomeTab/BoxDetailsInput/constants'
import { Ionicons } from '@expo/vector-icons'
import { FormikTextInput } from '../Form/TextInput'

import FormikSelect from '../Form/FormikSelect'
import ColorNotice from '../../navigation/Screens/HomeTab/BoxDetailsInput/components/ColorNotice'
import EstimateDetails from '../../navigation/Screens/HomeTab/BoxDetailsInput/components/EstimateDetails'
import { Estimate } from '../../store/types'

export type BoxForm = {
    initialValues: Estimate,
    handleSubmit: (values: Estimate, { setErrors }: FormikHelpers<Estimate>) => Promise<void>
    client_name: string,
    isEdit: boolean,
}

const BoxForm = ({ handleSubmit, initialValues, client_name, isEdit }: BoxForm) => {
    return (
        <Formik<Estimate>
            initialValues={{
                ...initialValues,
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


                    {isEdit ? <Text style={{ marginVertical: 15, fontSize: 20, fontWeight: 'bold', borderBottomWidth: 2, borderBottomColor: "#828282", paddingBottom: 10 }} >{values.box_name}</Text> : <FormikTextInput name='box_name' label='Enter Box Name' />}

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
                            <View style={{ flex: 1, flexDirection: 'row', gap: 20, justifyContent: 'flex-end', alignItems: 'flex-end', marginVertical: 5 }} >
                                <View style={{ flex: 0.5, flexDirection: 'column', gap: 10, marginVertical: 8 }} >
                                    <FormikSelect name='is_color' label='Color' options={isColorOptions} />
                                </View>
                                <View style={{ flex: 0.5 }} >
                                    {values.is_color && <FormikTextInput name='color_cost' label='Color Cost' type='phone' />}
                                </View>
                            </View>

                        </View>

                        <View style={{ marginBottom: 8 }} >
                            <Text style={[styles.inputHead, { fontSize: 13 }]} >Lamination Selection</Text>
                            <View style={{ flex: 1, flexDirection: 'row', gap: 20, justifyContent: 'flex-end', alignItems: 'flex-end', marginVertical: 5 }} >
                                <View style={{ flex: 0.5, flexDirection: 'column', gap: 10, marginVertical: 8 }} >
                                    <FormikSelect name='is_lamination' label='Lamination' options={laminationOptions} />
                                </View>
                                <View style={{ flex: 0.5 }} >
                                    {values.is_lamination && <FormikTextInput name='lamination_factor' label='Lamination Factor' type='phone' />}
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Charges */}

                    <View style={{ flex: 1, marginBottom: 35 }} >
                        <Text style={[styles.inputHead, { marginBottom: 8, }]} >Charges</Text>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 25 }} >
                            <View style={{ flex: 1, marginBottom: 5, flexDirection: "row" }} >
                                <FormikTextInput name='conversion_cost' label='Coversion Cost / Kg' type='phone' />
                            </View>
                            <View style={{ flex: 1, marginBottom: 5, flexDirection: "row" }} >
                                <FormikTextInput name='profit' label='Profit ( % )' type='phone' />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 25 }} >

                            <View style={{ flex: 1, marginBottom: 5, flexDirection: "row" }} >
                                <FormikTextInput name='transportation_charge' label='Transportation + Other ( ₹ )/box' type='phone' />
                            </View>
                        </View>
                    </View>




                    {/* Estimate Details */}
                    <EstimateDetails values={values} />






                    <Pressable

                        onPress={submitForm}
                    >
                        <Text style={styles.saveBoxBtn}>{"Save Estimate"}</Text>
                    </Pressable>





                </View>
            )}

        </Formik>
    )
}

export default BoxForm


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