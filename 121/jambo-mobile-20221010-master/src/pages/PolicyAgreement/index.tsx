import React from 'react';
import IProps from 'src/IProps';
import Header from 'components/Header';
import images from 'src/assets/images';
import WebView from 'react-native-webview';
import styles from './style';
import { Policy, TermsOfService } from 'src/assets/static';
import { ImageBackground } from 'react-native';
import { View } from 'native-base';

/**
 * @params title: 'Privacy Policy' | 'Terms of Use'
 * 条件协议,隐私政策
 */
export default class PolicyAgreement extends React.Component<IProps> {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.title
    })
  }

  render() {
    let uri = ''
    switch (this.props.route.params.title) {
      case 'Privacy Policy':
        uri = Policy
        break
      case 'Terms of Use':
        uri = TermsOfService
        break
      default: break
    }

    const INJECTED_JAVASCRIPT = `(function() {
      const meta = document.createElement('meta'); 
      meta.setAttribute('content', 'initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); 
      meta.setAttribute('name', 'viewport'); 
      document.getElementsByTagName('head')[0].appendChild(meta)
    })();`

    return (
      <ImageBackground source={images.background1} style={styles.PolicyAgreement}>
        <Header title={this.props.route.params.title} titleStyle={styles.title} />

        <View style={styles.box}>
          <WebView source={{ uri }} injectedJavaScript={INJECTED_JAVASCRIPT} javaScriptEnabled={true} scalesPageToFit={false} />
        </View>
      </ImageBackground>
    );
  }
}
