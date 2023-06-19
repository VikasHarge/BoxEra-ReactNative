import { View, Text } from 'react-native'
import React from 'react'
import { Estimate } from '../../../../../../store/types'
import { styles } from '../..'
import EstimateTab from './Components/EstimateTab'
import { useFormikContext } from 'formik'
import { boxWeight, conversionCost, cuttingHeight, cuttingLength, getBoxMfgCost, getBoxPrice, getProfit, laminationCost, paperCostPerBox, printingCost, sheetArea, totalGsm } from '../../../../../../utils/Calculations'


export type EstimateDetailsProps = {
    values: Estimate
}




const EstimateDetails = ({ values }: EstimateDetailsProps) => {






    return (
        <View style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderRadius: 6, gap: 10, marginBottom: 15 }} >
            <Text style={[{
                borderLeftWidth: 2, borderRightColor: "#433cc9", paddingLeft: 10, marginBottom: 10, fontSize: 16,
                fontWeight: '700',
            }]} >
                Estimate Details
            </Text>
            {/* cutting diamentions */}
            <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >

                <EstimateTab label='Cutting Length (inch)' >
                    {cuttingLength(values) || "00.00"}
                </EstimateTab>

                <EstimateTab label='Cutting Height (inch)' >
                    {cuttingHeight(values) || "00.00"}
                </EstimateTab>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >

                <EstimateTab label='Sheet Area (sqm)/sheet' >
                    {sheetArea(values) || "00.00"}
                </EstimateTab>

                <EstimateTab label='Weight(gram)/box' >
                    {boxWeight(values) || "00.00"}
                </EstimateTab>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >

                <EstimateTab label=' Total Gsm ' >
                    {totalGsm(values) || "00.00"}
                </EstimateTab>

                <EstimateTab label='paper cost/box' >
                    {paperCostPerBox(values) || "00.00"}
                </EstimateTab>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >

                <EstimateTab label='Printing Cost ₹' >
                    {printingCost(values) || "00.00"}
                </EstimateTab>

                <EstimateTab label='Lamination Cost/box' >
                    {laminationCost(values) || "00.00"}
                </EstimateTab>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >

                <EstimateTab label='Conversion Cost/box' >
                    {conversionCost(values) || "00.00"}
                </EstimateTab>

                <EstimateTab label='Box Mfg. Cost' >
                    {getBoxMfgCost(values) || "00.00"}
                </EstimateTab>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >

                <EstimateTab label={`Profit ${values.profit || ""} %`} >
                    {getProfit(values) || "00.00"}
                </EstimateTab>

                <EstimateTab label='Box Price ₹' >
                    {getBoxPrice(values) || "00.00"}
                </EstimateTab>
            </View>
        </View>
    )
}

export default EstimateDetails