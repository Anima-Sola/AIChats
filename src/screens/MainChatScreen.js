import React, { useState, useEffect, useReducer, useRef } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { View, StyleSheet, StatusBar, Text, BackHandler, Image, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import { APIs } from '../APIs/APIs';
import InputField from '../components/InputField';
import AddNewChatModal from '../components/AddNewChatModal';
import { getChatsMessages, getChatsSettings, getCurrentChat, getChatsModels } from '../store/selectors';
import { sendMessageToChatAction, clearChatAction } from '../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../components/Chat';
import SideMenu from '../components/SideMenu';
import THEME from '../styles/theme';
import { isNoChats } from '../components/CommonFuncs';

import ChatGPTIcon from '../assets/ChatIcons/ChatGPTicon.png';
import GigaChatIcon from '../assets/ChatIcons/GigaChatIcon.png';
import YandexGPTIcon from '../assets/ChatIcons/YandexGPTIcon.png';

const NoChats = ({ isNewChatModalVisible, setIsNewChatModalVisible }) => {
    return (
        <View style={ styles.container } >
            <StatusBar translucent backgroundColor="transparent" />
            <AddNewChatModal isVisible={ isNewChatModalVisible } setIsVisible={ setIsNewChatModalVisible } />
            <View style={ styles.header }>
                <View style={{ ...styles.header_left_side, opacity: 0.3 }} >
                    <Icon name={ 'chatbubbles-outline' } color={ THEME.TEXT_COLOR } size={ 35 } disabled={ true }/>
                </View>
                <View style={ styles.header_right_side }>
                    <Icon.Button 
                        name='chatbubbles-outline' 
                        size={ 20 } 
                        borderRadius={ 20 } 
                        backgroundColor={ THEME.OWN_MESSAGE_NAME_COLOR }
                        onPress={ () => setIsNewChatModalVisible( true ) }
                    >
                        <Text style={ styles.add_chat_button_text_style }>
                            Add Chat
                        </Text>
                    </Icon.Button>
                    <Icon style={ styles.settings_icon } name={ 'menu' } color={ THEME.TEXT_COLOR  } size={ 40 }/>
                </View>
            </View>
            <Chat isReplyArrived={ true }/>
            <InputField clearChat={ () => {} } sendMessageToChat={ () => {} } isReplyArrived={ false } />
        </View>
    )
}

const Chats = ({ isNewChatModalVisible, setIsNewChatModalVisible, forceUpdate }) => {
    const [ isReplyArrived, setIsReplyArrived ] = useState( true );
    const childRef = useRef();
    const currentChat = useSelector( getCurrentChat );
    const chatModel = useSelector( getChatsModels )[ currentChat ];
    const chatsSettings = useSelector( getChatsSettings );
    const { api } = chatsSettings[ chatModel ];
    const chatMessages = useSelector( getChatsMessages )[ currentChat ];
    const dispatch = useDispatch();
    const chatIcons = [ ChatGPTIcon, GigaChatIcon, YandexGPTIcon ];

    //Detect slide to the right to show side menu
    const flingRightGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            childRef.current.showSideMenu();
        });


    useEffect(() => {
        NavigationBar.setBackgroundColorAsync( THEME.NAV_BAR_COLOR );
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
        return () => backHandler.remove();
    })

    const sendMessageToChat = async ( userMessage ) => {
        if( userMessage === '' ) return;

        setIsReplyArrived( false );

        dispatch(sendMessageToChatAction( userMessage ));
        forceUpdate();
        
        const assistantMessage = await APIs[ api ].chat( chatMessages );
        /*const assistantMessage = 'Столицей Франции является город Париж';
        setTimeout(() => {
            setIsReplyArrived( true );
            dispatch(sendMessageToChatAction( assistantMessage ));
            forceUpdate();
        }, 1000);*/
        setIsReplyArrived( true );
        dispatch(sendMessageToChatAction( assistantMessage ));
        forceUpdate();
    }

    const clearChat = () => {
        if( chatMessages.length === 0 ) return;
        dispatch( clearChatAction() );
        forceUpdate();
    }

    return (
        <GestureDetector gesture={ flingRightGesture }>
            <View style={ styles.container } >
                <StatusBar translucent backgroundColor="transparent" />
                <AddNewChatModal isVisible={ isNewChatModalVisible } setIsVisible={ setIsNewChatModalVisible } />
                <View style={ styles.header }>
                    <View style={ styles.header_left_side } >
                        <Icon name={ 'chatbubbles-outline' } color={ THEME.TEXT_COLOR } size={ wp('9%') } onPress={() => { childRef.current.showSideMenu() }}/>
                    </View>
                    <View style={ styles.header_right_side }>
                        <Pressable
                            style={ THEME.ADD_NEW_CHAT_BUTTON_PRESSABLE_STYLE( styles.addChatButtonContainer )}
                            onPress={ () => setIsNewChatModalVisible( true ) }
                        >   
                            <Icon style={ styles.settings_icon } name={ 'chatbubbles-outline' } color={ THEME.TEXT_COLOR  } size={ 20 }/>
                            <Text style={ styles.add_chat_button_text_style }>
                                Add Chat
                            </Text>
                        </Pressable>
                        <Icon style={ styles.settings_icon } name={ 'menu' } color={ THEME.TEXT_COLOR  } size={ wp('10.5%') }/>
                    </View>
                </View>
                <View style={ styles.imageBackgroundContainer } >
                    <Image source={ chatIcons[ chatModel ] } />
                    <Text style={ styles.textBackground }>{ chatsSettings[ chatModel ].chatName }</Text>
                </View> 
                <Chat isReplyArrived={ isReplyArrived }/>
                <InputField clearChat={ clearChat } sendMessageToChat={ sendMessageToChat } isReplyArrived={ isReplyArrived } />
                <SideMenu ref={ childRef } forceUpdate={ forceUpdate }/>
            </View>
        </GestureDetector>
    )
}

const MainChatScreen = () => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const [ isNewChatModalVisible, setIsNewChatModalVisible ] = useState( false );

    if( !isNoChats() ) {
        return <NoChats isNewChatModalVisible={ isNewChatModalVisible } setIsNewChatModalVisible={ setIsNewChatModalVisible } />
    }

    return <Chats 
                isNewChatModalVisible={ isNewChatModalVisible } 
                setIsNewChatModalVisible={ setIsNewChatModalVisible } 
                forceUpdate={ forceUpdate }
            />
    
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
        paddingLeft: 10,
        paddingRight: 5,
        height: THEME.HEADER_HEIGHT,
        alignItems: 'center',
        paddingBottom: 5
    },
    header_left_side: {
        justifyContent: 'center'
    },
    header_right_side: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: wp('50%'),
    },
    add_chat_button_text_style: {
        color: THEME.ICON_COLOR,
        fontSize: THEME.FONT22,
        marginLeft: 5,
        marginRight: 5
    },
    addChatButtonContainer: {
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    settings_icon: {
        marginLeft: 10
    },
    imageBackgroundContainer: {
        position: 'absolute',
        top: hp('53%') - 110,
        left: wp('50%') - 80,
        alignItems: 'center',
        opacity: 0.05,
    },
    textBackground: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT35,
        marginTop: 10
    }
})

export default MainChatScreen;