import React, { Component } from 'react';
import renderChart from './renderChart';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { IMyEcharts } from '../../index';

export default class Echarts extends Component<IMyEcharts> {
  private chart: WebView | null = null

  constructor(props: IMyEcharts) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }

  componentDidUpdate(nextProps: IMyEcharts) {
    if (nextProps.option !== this.props.option) {
      this.chart?.reload();
    }
  }

  setNewOption(option: any) {
    this.chart?.postMessage(JSON.stringify(option));
  }

  render() {
    return (
      <View style={{ flex: 1, height: this.props.height || 400, }}>
        <WebView
          ref={ref => this.chart = ref}
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          scalesPageToFit={Platform.OS !== 'ios'}
          originWhitelist={['*']}
          source={Platform.OS === 'ios' ? require('./html/echarts.html') : { uri: 'file:///android_asset/html/echarts.html' }}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
