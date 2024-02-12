import store from '../store';

export const isNoChats = () => {
    if( store.getState().chatsModels.length === 0 ) return false;
    return true;
}