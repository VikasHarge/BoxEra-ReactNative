import { View, Text } from 'react-native'
import React from 'react'

type EstimateTabProps = {
  label: string,
  children: React.ReactNode
}

const EstimateTab = ({ label, children }: EstimateTabProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#dcdcdc76', borderRadius: 6 }} >
      <Text style={{ backgroundColor: '#010744', color: "#ffff", fontSize: 15, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{label}</Text>
      <Text style={{ fontSize: 18, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, textAlign: 'center' }} >{children}</Text>
    </View>
  )
}

export default EstimateTab