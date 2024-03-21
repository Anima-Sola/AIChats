import store from '../store';
import * as Sharing from 'expo-sharing';

export const isNoChats = () => {
    if( store.getState().chatsModels.length === 0 ) return false;
    return true;
}

export const isSharingPossible = () =>{        
    const isAvailableAsync = Sharing.isAvailableAsync().then(( result ) => {
        return result;
    });

    return isAvailableAsync;
}