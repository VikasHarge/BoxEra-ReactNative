import { View, Text } from 'react-native'
import React from 'react'
import { useFormikContext, ErrorMessage } from 'formik';
import { Picker } from '@react-native-picker/picker'

export type Option = {
    label : string,
    value : string | number | boolean,
}

type FormikSelectProps = {
    name : string,
    label : string,
    options : Option[]
}

const FormikSelect = ({name, options}:FormikSelectProps) => {
    const { values, setFieldValue, errors, touched, handleChange } = useFormikContext<any>();
  return (
<View style={{flex : 1, }} >
<Picker 
    selectedValue={values[name]}
    mode='dialog'
    placeholder='Select'
    onValueChange={(selected)=> setFieldValue(name , selected)}
    style={{backgroundColor : '#ffffffb5', borderRadius : 8}}
    >
        {
            options && options.map((option)=>(
                <Picker.Item key={option.label} label={option.label} value={option.value}  />
            ))
        }
    </Picker>
    {errors[name] && touched[name] && <Text style={{color : 'red'}} >{errors[name]}</Text>}
</View>
  )
}

export default FormikSelect