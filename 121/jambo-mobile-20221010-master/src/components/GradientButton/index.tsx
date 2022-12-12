
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { Pressable, TextStyle, ViewStyle } from "react-native";
import { Text } from 'native-base';

interface IMyButton {
  start?: {
    x: number
    y: number
  },
  end?: {
    x: number
    y: number
  },
  colors?: [string, string],
  onPress?: () => void,
  onPressIn?: () => void,
  onPressOut?: () => void,
  onLongPress?: () => void,
  android_ripple?: {
    color: string,
    borderless?: boolean,
    radius?: number
  },
  children: string | React.ReactNode,
  textStyle?: TextStyle
  containerStyle?: ViewStyle & { height?: number },
  disabled?: boolean
}

export default class GradientButton extends React.Component<IMyButton> {
  render() {
    const {
      start = { x: 0.5, y: 0 },
      end = { x: 0.5, y: 1 },
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      colors = ['#FFB422', '#FFDD8D'],
      containerStyle,
      android_ripple = {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      textStyle,
      children,
      disabled
    } = this.props;

    return (
      <LinearGradient
        start={start}
        end={end}
        colors={[colors[0] + 80, colors[1] + 80]}
        style={[
          styles.GradientButtonBox,
          { borderRadius: containerStyle?.height ? containerStyle?.height / 2 : 24 },
          { opacity: disabled ? 0.5 : 1 },
          containerStyle
        ]}
      >
        <LinearGradient
          start={start}
          end={end}
          colors={colors}
          style={[styles.ButtonBox, { borderRadius: containerStyle?.borderRadius || (containerStyle?.height ? (containerStyle?.height - 4) / 2 : 22) }]}
        >
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onLongPress={onLongPress}
            onPress={onPress}
            style={styles.Pressable}
            android_ripple={android_ripple}
            disabled={disabled}
          >
            {
              typeof children === 'string' ?
                <Text style={[
                  styles.childrenText,
                  { lineHeight: containerStyle?.height ? containerStyle.height - 4 : 44 },
                  textStyle,
                ]}>{children}</Text> :
                children
            }
          </Pressable>
        </LinearGradient>
      </LinearGradient>
    )
  }
}
