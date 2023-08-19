if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './src/store';

const App = () => {
    return (
        <Provider store={ store }>
            <GestureHandlerRootView style={ styles.container }>
                <AppRootNavigation />
            </GestureHandlerRootView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default App;