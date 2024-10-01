import React, { useState } from 'react'
import { Container, FieldTime, Input, InputContainer, Text } from './styles'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { IInputProps } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';

export type InputFieldProps = {
  titulo?: string,
  value?: any,
  children?: string,
  types?: 'date' | 'text' | 'time' | 'select',
  options?: { label: string, value: string }[],
  [key: string]: any,
} & IInputProps

const InputField = ({ titulo, placeholder, onChangeText, secureTextEntry, children, value, types, ...rest }: InputFieldProps) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeStringValue, setTimeStringValue] = useState('00:00');
  const [dataStringValue, setDataStringValue] = useState("HH:MM");

  const handleDateChange = (event, selectedDate): any => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatedDate = selectedDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      setDataStringValue(formatedDate);
      onChangeText && onChangeText(formatedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formatedTime = selectedTime.toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTimeStringValue(formatedTime);
      onChangeText && onChangeText(formatedTime);
    }
  };

  switch (types) {
    case 'text':
      return (
        <Container >
          <Text>{titulo}</Text>
          <Input secureTextEntry={secureTextEntry} value={value} onChangeText={onChangeText} placeholder={placeholder} />
        </Container>
      );
    case 'date':
      return (
        <Container >
          <Text>{titulo}</Text>
          <TouchableOpacity {...rest} onPress={() => setShowDatePicker(true)} style={styles.input}>

            {showDatePicker && (

              <DateTimePicker
                value={new Date()}
                mode="date"
                display="inline"
                onChange={handleDateChange}
                {...rest}
              />
            )}
            <Text>{dataStringValue}</Text>
            <Feather style={styles.icon} name="calendar" size={30} color="gray" />
          </TouchableOpacity>
        </Container>
      );
    case 'time':
      return (
        <FieldTime>
          <Text>{titulo}</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                locale='pt-BR'
                onChange={handleTimeChange}
                {...rest}
              />
            )}
            <Text>{timeStringValue}</Text>
            <Feather style={styles.icon} name="clock" size={30} color="gray" />
          </TouchableOpacity>
        </FieldTime>
      )
    case 'select':
      return (
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
  }
}
const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    alignSelf: 'flex-end',
    margin: 'auto',
  },
  input: {
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