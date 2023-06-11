import { View, Text } from 'react-native'
import React from 'react'

type ColorNoteProps = {
    label : string
}

const ColorNote = ({label} : ColorNoteProps) => {
  return (

      <Text style={{textAlign: 'left', color : '#ff8c00', marginBottom : 15}} >{label}</Text>

  )
}

export default ColorNote