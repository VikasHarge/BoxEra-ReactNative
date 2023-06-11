import { View, Text } from 'react-native'
import React from 'react'
import { ColorType } from '../../../../../../store/types'
import ColorNote from './ColorNote'

type colorNoticeProps = {
    type: ColorType
}

const ColorNotice = ({type} : colorNoticeProps) => {
    switch (type) {
        case "single_color":
            return <ColorNote label='Per box 1.4 ₹, Minimum 700 ₹'  ></ColorNote>
        case "two_color":
            return <ColorNote label='Per box 2.8 ₹, Minimum 1400 ₹'  ></ColorNote>
        case "four_color":
            return <ColorNote label='Per box 5 ₹, Minimum 5000 ₹'  ></ColorNote>
        case "no_color":
            return <ColorNote label='' ></ColorNote>
        default: <ColorNote label='' ></ColorNote>
    }
    return <></>
}

export default ColorNotice

