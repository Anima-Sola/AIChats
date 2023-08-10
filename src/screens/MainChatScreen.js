import React, { useState, useEffect, useReducer, useRef } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { View, StyleSheet, StatusBar, TextInput, BackHandler } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { APIs } from '../APIs/APIs';
import { getChatsMessages, getChatsSettings, getCurrentChat } from '../store/selectors';
import { sendMessageToChatAction, clearChatAction } from '../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../components/Chat';
import THEME from '../styles/theme';

const InputField = ({ sendMessageToChat, clearChat, inputHeight, setInputHeight }) => {
    const [ message, setMessage ] = useState('');

    return (
        <View style={ styles.inputContainer }>
            <View style={{ ...styles.clearChatIcon, height: inputHeight }}>
                <Icon 
                    name={ 'close-outline' } 
                    color={ THEME.INPUT_LINE_TEXT_COLOR  } 
                    size={ 35 }
                    onPress={ () => clearChat() }
                />
            </View>
            <View style={{ ...styles.input, height: inputHeight }}>
                <TextInput
                    style={{ ...styles.textInput, height: inputHeight }}
                    multiline={ true }
                    onContentSizeChange={( event ) => {
                        setInputHeight( event.nativeEvent.contentSize.height );
                    }}
                    onChangeText={ setMessage }
                    value={ message }
                />
            </View>
            <View style={{ ...styles.sendTextVoice, height: inputHeight }} >
                <Icon 
                    name={ 'send' } 
                    color={ THEME.INPUT_LINE_TEXT_COLOR  } 
                    size={ 30 } 
                    onPress={ () => {
                        sendMessageToChat( message );
                        setMessage('');
                    }}
                />
            </View>
        </View>
    )

}

const MainChatScreen = () => {
    const chatSettings = useSelector( getChatsSettings );
    const currentChat = useSelector( getCurrentChat );
    const chatMessages = useSelector( getChatsMessages )[ currentChat ];
    const dispatch = useDispatch();
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const [ inputHeight, setInputHeight ] = useState( 46 );

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync( THEME.NAV_BAR_COLOR );
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
        return () => backHandler.remove();
    })

    const sendMessageToChat = async ( text ) => {
        if(text === '') return;
        setInputHeight(46);

        const userMessage = {
            'role': 'user',
            'content': text
        }

        dispatch(sendMessageToChatAction( userMessage ));

        forceUpdate();

        const selectedAPI = chatSettings[ currentChat ].api;
        const response = await APIs[ selectedAPI ].chat( chatMessages );
        //const response = 'Столицей Франции является город Париж';

        const robotMessage = {
            'role': 'assistant',
            'content': response
        }

        dispatch(sendMessageToChatAction( robotMessage ));

        forceUpdate();

        console.log('Ответ GPT:', response);        
    }

    const clearChat = () => {
        dispatch( clearChatAction() );
        forceUpdate();
    }

    return (
        <View style={ styles.container } >
            <StatusBar translucent backgroundColor="transparent" />
            <View style={ styles.header }>
                <Icon style={ styles.icon } name={ 'menu' } color={ THEME.TEXT_COLOR } size={ 35 }/>
                <Icon style={ styles.icon } name={ 'settings-outline' } color={ THEME.TEXT_COLOR  } size={ 35 }/>
            </View>
            <Chat />
            <InputField 
                clearChat={ clearChat } 
                sendMessageToChat={ sendMessageToChat } 
                inputHeight={ inputHeight }
                setInputHeight={ setInputHeight }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: THEME.STATUSBAR_HEIGHT,
        backgroundColor: THEME.HEADER_BACKGROUND_COLOR,
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        height: hp('13%'),
    },
    icon: {
        alignSelf: 'center'
    },
    inputContainer: {
        backgroundColor: THEME.INPUT_LINE_BACKGROUND_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearChatIcon: {
        width: wp('10%'),
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: hp('0.5%'),
        paddingLeft: wp('2%')
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('80%'),
        paddingLeft: wp('2%'),
        minHeight: hp('6.5%')
    },
    textInput: {
        fontSize: THEME.FONT28,
        color: THEME.INPUT_LINE_TEXT_COLOR,
        width: wp('77%'),
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
    },
    sendTextVoice: {
        width: wp('10%'),
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: wp('2%'),
        paddingBottom: hp('0.8%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT50
    }
})

export default MainChatScreen;


/*

<View style={ styles.inputContainer }>
                <View style={{ ...styles.clearChatIcon, height: inputHeight }}>
                    <Icon 
                        name={ 'close-outline' } 
                        color={ THEME.INPUT_LINE_TEXT_COLOR  } 
                        size={ 35 }
                        onPress={ () => clearChat() }
                    />
                </View>
                <View style={{ ...styles.input, height: inputHeight }}>
                    <TextInput
                        ref={ textInput }
                        style={{ ...styles.textInput, height: inputHeight }}
                        multiline={ true }
                        onContentSizeChange={( event ) => {
                            setInputHeight( event.nativeEvent.contentSize.height );
                        }}
                        onChangeText={( value ) => message.current = value }
                    />
                </View>
                <View style={{ ...styles.sendTextVoice, height: inputHeight }} >
                    <Icon 
                        name={ 'send' } 
                        color={ THEME.INPUT_LINE_TEXT_COLOR  } 
                        size={ 30 } 
                        onPress={ () => sendMessageToChat( message.current ) }
                    />
                </View>
            </View>

*/            