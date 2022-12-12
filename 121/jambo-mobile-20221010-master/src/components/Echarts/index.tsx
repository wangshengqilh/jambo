import React, { Component } from 'react';
import { Container, Echarts } from './components'

export interface IMyEcharts {
  width?: number
  height?: number
  option: any
  backgroundColor?: string
  onPress?: (e: any) => void
}

export default class MyEcharts extends Component<IMyEcharts> {
  private chart: any = null

  setNewOption(option: any) {
    this.chart.setNewOption(option);
  }

  render() {
    return (
      <Container width={this.props.width}>
        <Echarts {...this.props} ref={e => this.chart = e} />
      </Container>
    );
  }
}
