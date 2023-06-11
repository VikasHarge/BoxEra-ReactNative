import { View, Text } from 'react-native'
import React from 'react'
import { Estimate } from '../../../../../../store/types'
import { styles } from '../..'

export type EstimateDetailsProps = {
    values : Estimate
}

const EstimateDetails = ({values}:EstimateDetailsProps) => {

    const cuttingLength = (box: Estimate) => {
        if (!box.outer_length || !box.outer_width || !box.outer_height) {
            return null
        }
        const lengthInInch = (Number(box.outer_length) + Number(box.outer_width) + 1 + 1)
        return Number(lengthInInch.toFixed(2))
    }

    const cuttingHeight = (box: Estimate) => {
        if (!box.outer_length || !box.outer_width || !box.outer_height) {
            return null
        }
        const heightInInch = (Number(box.outer_height) + Number(box.outer_width) + 1)
        return Number(heightInInch.toFixed(2))
    }

    const sheetArea = (box: Estimate) => {

        const cuttinglength = cuttingLength(box);
        const cuttingheight = cuttingHeight(box);
        const sheetArea = (Number(cuttinglength) * Number(cuttingheight)) / 1550
        return sheetArea.toFixed(2)
    }
    const boxWeight = (box: Estimate) => {

        const cuttinglength = cuttingLength(box);
        const cuttingheight = cuttingHeight(box);
        const sheetArea = (Number(cuttinglength) * Number(cuttingheight)) / 1550
        const topSheetWeight = Math.ceil(sheetArea * Number(box.top_gsm))
        const middleSheetWeight = Math.ceil(sheetArea * Number(box.mid_gsm) * Number(box.mid_ff))
        const bottomSheetWeight = Math.ceil(sheetArea * Number(box.bottom_gsm))
        const plyFactor = (Number(box.ply_number) - 1) / 2
        const totalWeight = topSheetWeight + ((middleSheetWeight + bottomSheetWeight) * plyFactor)
        return totalWeight * 2
    }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderRadius: 6, gap: 10, marginBottom: 15 }} >
    <Text style={[{ borderLeftWidth: 2, borderRightColor: "#433cc9", paddingLeft: 10, marginBottom: 10 , fontSize: 16,
        fontWeight: '700',}]} >
        Estimate Details
    </Text>
    {/* cutting diamentions */}
    <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >
        <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
            <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Cutting Length</Text>
            <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{cuttingLength(values) || "00.00"}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
            <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Cutting Height</Text>
            <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{cuttingHeight(values) || "00.00"}</Text>
        </View>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >
        <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
            <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Sheet Area (sqm)</Text>
            <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{sheetArea(values) || "00.00"}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
            <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Weight/box</Text>
            <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{boxWeight(values) || "00.00"}</Text>
        </View>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', gap: 15 }} >
        <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
            <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Sheet Area (sqm)</Text>
            <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{sheetArea(values) || "00.00"}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
            <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >Weight/box</Text>
            <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{boxWeight(values) || "00.00"}</Text>
        </View>
    </View>
</View>
  )
}

export default EstimateDetails