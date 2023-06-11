import React from 'react';
import { Provider } from 'react-redux';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import store from './src/store';

const App = () => {
    return (
        <Provider store={ store }>
            <AppRootNavigation />
        </Provider>
    )
}

export default App;