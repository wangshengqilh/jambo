import * as React from 'react';
import { Text } from 'native-base';
import { Modal, Pressable, View } from 'react-native';
import styles from './style';

interface ICurtainModal {
  visible: boolean
  onRequestClose: () => void
  onRequestOk?: () => void
  title?: string
  cannel?: string
  confirm?: string
  children: any
}

export default class CurtainModal extends React.Component<ICurtainModal> {

  onRequestOk() {
    this.props.onRequestOk && this.props.onRequestOk();
    this.props.onRequestClose();
  }

  render() {
    const { title = 'please choose', cannel = 'Cancel', confirm = 'OK' } = this.props
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose.bind(this)}
      >
        <View style={styles.Modal}>
          <Pressable style={styles.ModalClose} onPress={this.props.onRequestClose.bind(this)} />
          <View style={styles.ModalContent}>
            <View style={styles.ModalContentHeader}>
              {
                this.props.onRequestOk ?
                  <>
                    <Text style={styles.ModalContentHeaderText2} onPress={this.props.onRequestClose.bind(this)}>{cannel}</Text>
                    <Text style={styles.ModalContentHeaderText1}>{title}</Text>
                    <Text style={styles.ModalContentHeaderText3} onPress={this.onRequestOk.bind(this)}>{confirm}</Text>
                  </> :
                  <>
                    <Text style={styles.ModalContentHeaderText1}>{title}</Text>
                    <Text style={styles.ModalContentHeaderText2} onPress={this.props.onRequestClose.bind(this)}>{cannel}</Text>
                  </>
              }
            </View>
            {this.props.children}
          </View>
        </View>
      </Modal>
    )
  }
}