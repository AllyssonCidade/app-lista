import React, { useState } from 'react'
import { Container, FieldTime, Input, InputContainer, Text } from './styles'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { IInputProps } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller, UseControllerProps, FieldValues } from "react-hook-form";

export type InputFieldProps = {
  titulo?: string,
  value?: any,
  children?: string,
  types?: 'date' | 'text' | 'time' | 'select',
  options?: { label: string, value: string }[],
  [key: string]: any,
} & IInputProps

const InputField = ({titulo, placeholder,onChangeText, children,value, types, ...rest}:InputFieldProps) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [formatDate, setFormatDate] = useState("DD/MM/AAAA")
  
  switch(types) {  
    case 'text':
      return (
        <Container >
            <Text >{titulo}</Text>
            <Input onChangeText={onChangeText} placeholder={placeholder}>{children}</Input>
        </Container>
        );
    case 'date':
      return (
        <Container >
          <Text>{titulo}</Text>
          <TouchableOpacity {...rest}  onPress={() => setShowDatePicker(true)} style={styles.input}>
          
          {showDatePicker &&(

            <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormatDate(selectedDate.toLocaleDateString('pt-BR',{
                  day: 'numeric',
                  dateStyle: 'short',
                  weekday: 'long',
                  year: 'numeric'
                }))
                onChangeText && onChangeText(selectedDate);
              }
            }}
            {...rest}
            />
          )}
          <Text>{formatDate}</Text>
          <Feather style={styles.icon}  name="calendar" size={30} color="gray" />
          </TouchableOpacity>
        </Container>
      );
    case 'time':
      return(
        <FieldTime>
          <Text>{titulo}</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}style={styles.input}>
          {showTimePicker &&(
            <DateTimePicker
            value={value || new Date()}
            mode="time"
            display="default"

            locale='pt-BR'
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              if (selectedDate) {
                setFormattedTime(selectedDate.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }))
                onChangeText && onChangeText(selectedDate);
                console.log( selectedDate ,'selectedDate')
              }
            }}
            {...rest}
            />
          )}
            <Text>{formattedTime}</Text>
            <Feather style={styles.icon}  name="clock" size={30} color="gray" />
          </TouchableOpacity>
        </FieldTime>
      )
    case 'select':
      return(
        <Container>
          <Text>{titulo}</Text>
          <Picker
            style={styles.input}
            selectedValue={value} 
            onValueChange={(itemValue) => onChangeText(itemValue)}
          >
            {rest.options?.map(option => (
           <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </Container>
      )
}}
const styles = StyleSheet.create({
  icon:{
    marginRight: 10,
    alignSelf: 'flex-end',
    margin: 'auto',
  },
  input:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 40,
    paddingLeft: 10,
    height: 40,
    width: '100%',
    backgroundColor: 'white',
  }
})
export default InputField;