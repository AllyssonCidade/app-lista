import { GestureResponderEvent, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { ReactElement } from "react";

export type ButtomProps = {
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    children?: React.ReactNode
    color?: 'red' | 'blue' | 'white'
    onPress?: (event: GestureResponderEvent) => void
    title?: string
}

export function Buttom({ children, size= 'medium', color = "blue", onPress, ...props }: ButtomProps) {
    return (
        <TouchableOpacity 
            style={[styles.wrapper, styles[size], styles[color]]}  onPress={onPress} {...props}>
            <Text style={[styles.text, { fontSize: styles[size].fontSize, color: styles[color].color }]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
