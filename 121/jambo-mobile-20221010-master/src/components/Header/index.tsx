import React, { ReactNode } from 'react'
import styles from "./style"
import Title from 'components/Title';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { Icon, IconButton, View } from 'native-base';
import { goBack } from 'src/router/customNavigation';

const { width } = Dimensions.get('screen')
interface IHeader {
  title?: string
  style?: ViewStyle
  titleStyle?: TextStyle
  rightNode?: ReactNode | ReactNode[]
  leftNode?: ReactNode | ReactNode[]
  onPressGoBack?: () => void
}

const Header = (props: IHeader) => {
  const { title, style, titleStyle, rightNode, leftNode } = props

  const onPressGoBack = () => {
    if (props.onPressGoBack) {
      props.onPressGoBack()
    } else {
      goBack()
    }
  }

  return (
    <View style={[styles.Header, style]}>
      {
        leftNode ?
          <View style={styles.leftBox}>
            {leftNode}
          </View> :
          <IconButton
            icon={<Icon as={<FeatherIcon name='arrow-left' />} />}
            borderRadius="full"
            _icon={{
              color: "#FFD27B",
              size: 'lg'
            }}
            onPress={onPressGoBack}
          />
      }
      <Title title={title} style={{ ...titleStyle, maxWidth: width - 132 }} numberOfLines={1} />
      <View style={styles.leftBox}>
        {rightNode}
      </View>
    </View>
  )
}

export default Header;