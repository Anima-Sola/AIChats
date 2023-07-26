import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import Reactotron from '../../ReactotronConfig';

export default createStore(reducer, compose(applyMiddleware( thunk ), Reactotron.createEnhancer()));