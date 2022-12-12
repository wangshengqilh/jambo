import * as React from 'react';
import styles from './style';
import GradientButton from 'src/components/GradientButton';
import IProps from 'src/IProps';
import Header from 'components/Header';
import images from 'src/assets/images';
import { ImageBackground } from 'react-native';
import { apply_friend } from 'src/store/api';
import { Text, TextArea } from 'native-base';
import { store } from 'src/store';

// 添加朋友申请
/**
 * @param {
 *  friend_id
 *  address?
 * }
 */
export default class ApplyAdd extends React.Component<IProps> {
  private params: {
    friend_id: string
    friend_remarks: string
    content: string
    address: string | number
  } = {
      friend_id: this.props.route.params.friend_id,
      friend_remarks: '',
      content: '',
      address: this.props.route.params.address || ''
    }

  componentDidMount() {
    this.getMyInfo()
  }

  getMyInfo() {
    const myInfo = store.getState().myInfo.value
    this.params.content = `Hello, I'm ${myInfo.username}`
    this.setState({})
  }

  onChangeTextApply(text: string) {
    this.params.content = text
    this.setState({})
  }

  onPressSend() {
    apply_friend(this.params).then(res => {
      this.props.navigation.goBack()
    })
  }

  render() {
    return (
      <ImageBackground source={images.background1} style={styles.ApplyAdd}>
        <Header title="Add friends" titleStyle={styles.title} />

        <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
          <Text>Send Friend Request</Text>
          <TextArea autoCompleteType={undefined} value={this.params.content} onChangeText={this.onChangeTextApply.bind(this)} />
          <GradientButton containerStyle={styles.GradientButton} onPress={this.onPressSend.bind(this)}>
            Send
          </GradientButton>
        </ImageBackground>
      </ImageBackground>
    );
  }
}
