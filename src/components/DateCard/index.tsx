import { StyleSheet, View } from "react-native";
import { Container, ContainerSelectedDate, TextContainer, TextContainerDay, TextSelectedDate, TextSelectedDateDay } from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from "react";

export function DateCart() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [month, setMonth] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [subsequentDates, setSubsequentDates] = useState<Date[]>([]);

    const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
        return date.toLocaleDateString('pt-BR', options).replace(/\.$/, '');
    };
    const getSubsequentDates = (startDate: Date) => {
        const dates = [];
        for (let i = 1; i <= 3; i++) {
            const nextDate = new Date(startDate);
            nextDate.setDate(startDate.getDate() + i);
            dates.push(nextDate);
        }
        return dates;
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setSelectedDate(selectedDate); 
            setDayOfWeek(formatDate(selectedDate, { weekday: 'short' }));
            setDay(formatDate(selectedDate, { day: '2-digit' }));
            setMonth(formatDate(selectedDate, { month: 'short' }));
            setYear(formatDate(selectedDate, { year: 'numeric' }));

            const subsequentDates = getSubsequentDates(selectedDate);

            setSubsequentDates(subsequentDates);
        }
    };

    useEffect(() => {
        setDayOfWeek(formatDate(selectedDate, { weekday: 'short' }));
        setDay(formatDate(selectedDate, { day: '2-digit' }));
        setMonth(formatDate(selectedDate, { month: 'short' }));
        setYear(formatDate(selectedDate, { year: 'numeric' }));
        setSubsequentDates(getSubsequentDates(selectedDate));
    }, [selectedDate]);

    return (
        <View style={Localstyles.containerRow}>
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                />
            )}

            <ContainerSelectedDate onPress={() => setShowDatePicker(!showDatePicker)}>
                <TextSelectedDate>{month}</TextSelectedDate>
                <TextSelectedDateDay>{day}</TextSelectedDateDay>
                <TextSelectedDate>{dayOfWeek}</TextSelectedDate>
            </ContainerSelectedDate>

            {subsequentDates.map((date, index) => (
                <Container key={index}>
                    <TextContainer>{formatDate(date, { month: 'short' })}</TextContainer>
                    <TextContainerDay>{formatDate(date, { day: '2-digit' })}</TextContainerDay>
                    <TextContainer>{formatDate(date, { weekday: 'short' })}</TextContainer>
                </Container>
            ))}
        </View>
    );
}

const Localstyles = StyleSheet.create({
    containerRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});
