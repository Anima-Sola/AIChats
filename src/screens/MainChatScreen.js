import React, { useState, useEffect, useReducer, useRef } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { View, StyleSheet, StatusBar, Text, BackHandler } from 'react-native';
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

const NoChats = ({ isNewChatModalVisible, setIsNewChatModalVisible }) => {
    return (
        <View style={ styles.container } >
            <StatusBar translucent backgroundColor="transparent" />
            <AddNewChatModal isVisible={ isNewChatModalVisible } setIsVisible={ setIsNewChatModalVisible } />
            <View style={ styles.header }>
                <View style={{ ...styles.header_left_side, opacity: 0.3 }} >
                    <Icon name={ 'chatbubbles-outline' } color={ THEME.TEXT_COLOR } size={ 40 } disabled={ true }/>
                </View>
                <View style={ styles.header_right_side }>
                    <Icon.Button 
                        name='chatbubbles-outline' 
                        size={ 25 } 
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

const Chats = ({ isNewChatModalVisible, setIsNewChatModalVisible }) => {
    const [ isReplyArrived, setIsReplyArrived ] = useState( true );
    const childRef = useRef();
    const currentChat = useSelector( getCurrentChat );
    const chatModel = useSelector( getChatsModels )[ currentChat ];
    const { api } = useSelector( getChatsSettings )[ chatModel ];
    const chatMessages = useSelector( getChatsMessages )[ currentChat ];
    const dispatch = useDispatch();
    const [, forceUpdate ] = useReducer(x => x + 1, 0);

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
                        <Icon name={ 'chatbubbles-outline' } color={ THEME.TEXT_COLOR } size={ 40 } onPress={() => { childRef.current.showSideMenu() }}/>
                    </View>
                    <View style={ styles.header_right_side }>
                        <Icon.Button 
                            name='chatbubbles-outline' 
                            size={ 25 } 
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
                <Chat isReplyArrived={ isReplyArrived }/>
                <InputField clearChat={ clearChat } sendMessageToChat={ sendMessageToChat } isReplyArrived={ isReplyArrived } />
                <SideMenu ref={ childRef } forceUpdate={ forceUpdate }/>
            </View>
        </GestureDetector>
    )
}

const MainChatScreen = () => {
    const [ isNewChatModalVisible, setIsNewChatModalVisible ] = useState( false );

    if( !isNoChats() ) {
        return <NoChats isNewChatModalVisible={ isNewChatModalVisible } setIsNewChatModalVisible={ setIsNewChatModalVisible } />
    }

    return <Chats isNewChatModalVisible={ isNewChatModalVisible } setIsNewChatModalVisible={ setIsNewChatModalVisible } />
    
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
        height: hp('12%'),
    },
    header_left_side: {
        justifyContent: 'center'
    },
    header_right_side: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: wp('50%'),
        /*borderWidth: 1,
        borderColor: '#fff'*/
    },
    add_chat_button_text_style: {
        color: THEME.ICON_COLOR,
        fontSize: THEME.FONT25,
        marginLeft: wp('-1%'),
        marginRight: wp('0.5%'),
    },
    settings_icon: {
        marginLeft: wp('2%')
    }
})

export default MainChatScreen;


                            /*<Button 
                                type="outline"
                                buttonStyle={ styles.add_chat_button_style }
                                titleStyle={ styles.add_chat_title_style }
                            >
                                ADD
                            </Button>*/
                            /*<AddNewChatModal isVisible={ isNewChatModalVisible } setIsVisible={ setIsNewChatModalVisible } />*/