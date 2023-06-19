import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Estimate } from '../../../../../../store/types'
import { useFormikContext } from 'formik'
import { boxWeight, conversionCost, cuttingHeight, cuttingLength, getBoxMfgCost, getBoxPrice, getProfit, laminationCost, paperCostPerBox, printingCost, sheetArea, totalGsm } from '../../../../../../utils/Calculations'
import EstimateTab from '../EstimateDetails/Components/EstimateTab'


export type PaperDetailsProps = {
    values: Estimate
}




const PaperDetails = ({ values }: PaperDetailsProps) => {



    return (
        <View style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderRadius: 6, gap: 10, marginBottom: 15 }} >
            <Text style={[{
                borderLeftWidth: 2, borderRightColor: "#433cc9", paddingLeft: 10, marginBottom: 10, fontSize: 16,
                fontWeight: '700',
            }]} >
                Paper Details
            </Text>

            <View style={{ flex: 1, flexDirection: 'row', gap: 5, width : "100%" }} >

                <View style = {[styles.tableCol, {flex : 1.6}]} >
                    <Text style={styles.tableHead} >{`${values.ply_number} ply`}</Text>
                    <Text style={styles.tableData}>Top Paper</Text>
                    <Text style={styles.tableData} >Flute Paper</Text>
                    <Text style={styles.tableData} >Bottom Paper</Text>
                </View>
                <View style = {styles.tableCol}  >
                    <Text style={styles.tableHead} >BF</Text>
                    <Text style={styles.tableData}>{values.top_bf}</Text>
                    <Text style={styles.tableData} >{values.mid_bf}</Text>
                    <Text style={styles.tableData} >{values.bottom_bf}</Text>
                </View>
                <View style = {styles.tableCol}  >
                    <Text style={styles.tableHead} >GSM</Text>
                    <Text style={styles.tableData}>{values.top_gsm}</Text>
                    <Text style={styles.tableData} >{values.mid_gsm}</Text>
                    <Text style={styles.tableData} >{values.bottom_gsm}</Text>
                </View>
                <View style = {styles.tableCol}  >
                    <Text style={styles.tableHead} >Rate</Text>
                    <Text style={styles.tableData}>{values.top_paper_rate}</Text>
                    <Text style={styles.tableData} >{values.mid_paper_rate}</Text>
                    <Text style={styles.tableData} >{values.bottom_paper_rate}</Text>
                </View>
                <View style = {styles.tableCol}  >
                    <Text style={styles.tableHead} >FF</Text>
                    <Text style={styles.tableData}>-</Text>
                    <Text style={styles.tableData} >{values.mid_ff}</Text>
                    <Text style={styles.tableData} >-</Text>
                </View>

            </View>


        </View>
    )
}

export default PaperDetails


const styles = StyleSheet.create({
   tableCol : {display : "flex", flexDirection : "column", gap : 3, flex : 1},
    tableHead: { backgroundColor: '#010744', color: "#fff", fontSize: 15, fontWeight: "700", textAlign: 'center', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 4 }, 
    tableData: { backgroundColor: '#95959555', color: "#000000", fontSize: 15, fontWeight: "700", textAlign: 'center', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 4 }, 
})