import { GestureResponderEvent, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

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
            style={[styles.wrapper, styles[size], {backgroundColor: styles[color].backgroundColor}]}  onPress={onPress} {...props}>
            <Text style={[styles.text, { fontSize: styles[size].fontSize, fontWeight: styles[size].fontWeight, color: styles[color].color}]} >
 {children}</Text>
        </TouchableOpacity>
    );
}
