import React from 'react';
import IProps from 'src/IProps';
import WebView from 'react-native-webview';
import { store } from 'src/store';
import { onMask } from 'src/store/mask/maskSlice';

export default class Web extends React.Component<IProps> {

    componentDidMount(): void {
        store.dispatch(onMask('Loading...'))
    }

    render() {
        return (
            <WebView source={{ uri: this.props.route.params.uri }} onLoadEnd={() => store.dispatch(onMask(''))} />
        );
    }
}
