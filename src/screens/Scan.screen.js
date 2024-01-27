import React, { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  Linking,
  Text,
  Dimensions,
  ScrollView,
  Image,
  View,
} from 'react-native'


import { Header } from 'react-native-elements';
import { Appbar, TextInput, Button, Card, Divider } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
// import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from "react-native-animatable";

import { commonStyles, colorStyles } from '../assets/styles';
import '../utils/ignoreWarning';
import Constants from '../utils/constants';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


const ScanScreen = ({ navigation }) => {
    const scannerRef = useRef(null);

    const onScanSuccess = e => {
        if(e) {
            console.log(e.data);
            navigation.navigate('Main', {result : e.data})
        }
    };


    const makeSlideOutTranslation = (translationType, fromValue) => {
        return {
          from: {
            [translationType]: SCREEN_WIDTH * -0.3
          },
          to: {
            [translationType]: fromValue
          }
        };
    }

    return (
        <SafeAreaView style={commonStyles.SafeAreaView}>
            <StatusBar barStyle={'light-content'} backgroundColor={colorStyles.headerColor} />

            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: '3%', paddingHorizontal: '10%'}}>
                <Text style={{alignSelf: 'stretch', textAlign: 'center', fontSize: 20}}>Please move your camara over the QR/Bar Code.</Text>
            </View>
            <View style={{flex: 1}}>
                <QRCodeScanner
                    onRead={(e) => {onScanSuccess(e)}}
                    vibrate={true}
                    reactivate={true}
                    containerStyle={{flex: 1, width: '100%'}}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    ref={scannerRef}
                    showMarker={true}
                    customMarker={
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "transparent"}}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{height: '100%',width: '70%', borderRadius: 15, borderWidth: 3, borderColor: 'white', alignItems: "center", justifyContent: "center", backgroundColor: "transparent"}}>
                                    <Icon
                                        name="scan-outline"
                                        size={SCREEN_WIDTH * 0.1}
                                        color={colorStyles.defaultColor}
                                    />
                                    <Animatable.View
                                        style={{width: SCREEN_WIDTH * 0.5, height: 2, backgroundColor: 'red'}}
                                        direction="alternate-reverse"
                                        iterationCount="infinite"
                                        duration={2000}
                                        easing="linear"
                                        animation={makeSlideOutTranslation(
                                            "translateY",
                                            SCREEN_WIDTH * 0.2
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default ScanScreen
