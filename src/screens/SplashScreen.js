import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export const AppSplashScreen =({ navigation }) => {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 3000));
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