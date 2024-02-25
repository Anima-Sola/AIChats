import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { loadAppDataAction } from '../store/actions';

SplashScreen.preventAutoHideAsync();

const AppSplashScreen =({ navigation }) => {
    const dispatch = useDispatch();
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                dispatch( loadAppDataAction() );
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if( appIsReady ) {
            navigation.navigate('MainChatScreen');
            await SplashScreen.hideAsync();
        }
    }, [ appIsReady ]);

    if ( !appIsReady ) {
        return null;
    }

    return ( <><View onLayout={ onLayoutRootView } /></> );
}

export default AppSplashScreen;