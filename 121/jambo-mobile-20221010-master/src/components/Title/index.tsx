import React from 'react'
import styles from "./style"
import { TextStyle } from "react-native"
import { Text } from 'native-base';

export default function Title(props: {
  title?: string | number,
  style?: TextStyle,
  size?: "sm" | "md" | "lg" | "xl" | "2xl",
  numberOfLines?: number,
  onPress?: () => void
}) {
  const { title, size = 'lg', numberOfLines = 2, onPress } = props;
  return (
    <Text
      size={size}
      style={[
        styles.title,
        { lineHeight: props.style?.fontSize ? (props.style?.fontSize + props.style?.fontSize / 2) : 27 },
        props.style
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {title}
    </Text>
  )
}