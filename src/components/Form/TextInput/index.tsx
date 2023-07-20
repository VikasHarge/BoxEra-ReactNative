import React, { useRef } from 'react';
import { Text, TextInput, View, Animated } from 'react-native';
import { useFormikContext, ErrorMessage } from 'formik';

interface FormikTextInputProps {
    label: string;
    name: string;
    type? : "phone" | "email"
}

const FormikTextInput: React.FC<FormikTextInputProps> = ({ label, name, type }) => {
    const { values, handleChange, handleBlur, touched, errors } = useFormikContext<any>();
    const animatedValue = useRef(new Animated.Value(values[name] ? 1 : 0)).current;

    const handleFocus = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,

        }).start();
    };


    const handleBlurInput = () => {
        if (!values[name]) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
        handleBlur(name);
    };

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [10, -10],
    });

    return (
        <View style={{marginBottom : 5, marginTop : 20, width : "100%"}} >
            <Animated.Text
                style={{
                    position: 'absolute',
                    top: translateY,
                    left: 5,
                    color: "#616161c9"
                }}
            >
                {label}
            </Animated.Text>
            <TextInput
                style={{
                    borderBottomWidth: 2,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    borderBottomColor: errors[name] && touched[name] ? 'red' : '#0051ad6c',
                    padding: 5,
                    marginBottom: 5,
                    
                }}
                
                value={values[name]}
                onChangeText={handleChange(name)}
                onBlur={handleBlurInput}
                onFocus={handleFocus}
                keyboardType={type === "phone" ? "numeric" : type === 'email' ? "email-address" : "default"}
            />
             {errors[name] && touched[name] && <Text style={{color : 'red'}} >{errors[name]}</Text>}
        </View>
    );
};

export { FormikTextInput };
