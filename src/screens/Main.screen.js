import React, { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  Linking,
  Text,
  Dimensions,
  ScrollView,
  BackHandler,
  View,
} from 'react-native'


import { Header } from 'react-native-elements';
import { Appbar, TextInput, Button, Card, Divider } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';

import { commonStyles, colorStyles } from '../assets/styles';
import '../utils/ignoreWarning';
import Constants from '../utils/constants';


const MainScreen = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [uri, setUri] = useState(Constants.defaultURI);

    const [canGoBack, setCanGoBack] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')

    const webviewRef = useRef(null);

    const backButtonHandler = () => {
        if (webviewRef.current) {
            webviewRef.current.goBack();
            return true;
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backButtonHandler,
        );
    
        return () => backHandler.remove();
    }, []);

    const [params, setParams] = useState(route.params)

    if(params != route.params) {
        setParams(route.params)
    }


    useEffect(() => {
        console.log(params);
        if(params) {
            setUri(Constants.defaultURI + 'barcode=' + params.result);
        }
    }, [params])


    return (
        <SafeAreaView style={commonStyles.SafeAreaView}>
            <StatusBar barStyle={'light-content'} backgroundColor={colorStyles.headerColor} />

            <View style={{flexDirection: 'row', marginVertical: '3%', justifyContent: 'flex-end'}}>
                <Button 
                    icon="qrcode"
                    mode="contained"
                    labelStyle={{fontWeight: 'bold', fontSize: 17}}
                    buttonColor={colorStyles.scanButtonColor}
                    style={{marginRight: '2%'}}
                    onPress={() => {navigation.navigate('Scan')}}
                >
                    Scan Barcode
                </Button>
            </View>
            
            <WebView
                source={{uri: uri}}
                startInLoadingState={true}
                renderLoading={() => (
                    <Spinner visible={isLoading} textContent={''} textStyle={{color : 'white' }} />
                )}
                ref={webviewRef}
                onNavigationStateChange={navState => {
                    navState.loading == true ? setIsLoading(true) : setIsLoading(false);
                    setCanGoBack(navState.canGoBack)
                    setCurrentUrl(navState.url)
                }}
            />
        </SafeAreaView>
    )
}

export default MainScreen
