import React from 'react';
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { DotIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Ionicons';
import { getChatsMessages, getChatsSettings, getCurrentChat, getChatsModels } from '../store/selectors';
import THEME from '../styles/theme';
import { isNoChats } from './CommonFuncs'; 

import HumanIcon from '../assets/ChatIcons/HumanIcon.png';
import ChatGPTIcon from '../assets/ChatIcons/ChatGPTicon.png';
import GigaChatIcon from '../assets/ChatIcons/GigaChatIcon.png';
import YandexGPTIcon from '../assets/ChatIcons/YandexGPTIcon.png';

const Chat = ({ isReplyArrived }) => {

    console.log('render');

    if( !isNoChats() ) {
        return (
            <View style={{ ...styles.container, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={ styles.noMessagesText }>
                    Нажмите кнопку
                </Text>
                <Text style={ styles.noMessagesTextAddChat }>
                    "Add Chat"
                </Text>
            </View>
        )
    }

    const currentChat = useSelector( getCurrentChat );
    const currentChatModel = useSelector( getChatsModels )[ currentChat ];
    const chatsMessages = useSelector( getChatsMessages )[ currentChat ];
    const chatsSettings = useSelector( getChatsSettings )[ currentChatModel ];
    const chatIcons = [ ChatGPTIcon, GigaChatIcon, YandexGPTIcon ];
    
    if( !chatsMessages?.length ) {
        return (
            <View style={ styles.container }>
                <View style={ styles.messageContainer }>
                    <View style={ styles.messageHeader }>
                        <Image style={ styles.messageIconImage } source = { HumanIcon } />
                        <Text style={{ ...styles.messageNameContainer, color: THEME.OWN_MESSAGE_NAME_COLOR }}>ВЫ</Text>
                    </View>
                    <View style={ styles.messageTextContainer } >
                        <Text style={ styles.messageText } selectable={true}>В чате сообщений нет...</Text>
                    </View>
                </View>
            </View>
        )
    }

    const displayMessages = () => {
        let messageNameColor, messageIcon, messageName, messageBackgroundColor, paddingBottom;

        const items = chatsMessages.map(( element, key ) => {
            
            if(( key % 2 ) === 0 ) {
                messageIcon = HumanIcon;
                messageName = 'ВЫ';
                messageNameColor = THEME.OWN_MESSAGE_NAME_COLOR;
                paddingBottom = 0;
            } else {
                messageIcon = chatIcons[ chatsSettings.iconNum ];
                messageName = chatsSettings.chatName;
                messageNameColor = THEME.MESSAGE_NAME_COLOR;
                messageBackgroundColor =  'rgba(255, 255, 255, 0.1)';
                paddingBottom = 10;
            }

            return (
                <View style={{ ...styles.messageContainer, backgroundColor: messageBackgroundColor, paddingBottom }} key={ key }>
                    <View style={ styles.messageHeader }>
                        <Image style={ styles.messageIconImage } source = { messageIcon } />
                        <Text style={{ ...styles.messageNameContainer, color: messageNameColor }}>{ messageName }</Text>
                    </View>
                    <View style={ styles.messageTextContainer } >
                        <Text style={ styles.messageText } selectable={true}>{ element }</Text>
                    </View>
                    <View style={ styles.icons }>
                        <View style={ styles.iconWrapper }>
                            <Icon name={ 'copy-outline' } color={ THEME.TEXT_COLOR } size={ hp('3.5%') } disabled={ true }/>
                        </View>
                        <View style={ styles.iconWrapper }>
                            <Icon name={ 'share-social' } color={ THEME.TEXT_COLOR } size={ hp('3.5%') } disabled={ true }/>
                        </View>
                    </View>
                </View>
            )
        })

        return (
            <>{ items }</>
        )
    }

    const showDotIndicator = () => {
        if( isReplyArrived ) {
            return ( <></> )
        }

        return (
            <View style={ styles.responseWaitingContainer }>
                <Text style={ styles.responseWaitingText }>Ожидаем ответ</Text>
                <View style={ styles.dots }>
                    <DotIndicator color='white' size={ 2 } count={ 3 }/>
                </View>
            </View>
        )

    }
    
    return (
        <View style={ styles.container }>
            <ScrollView>
                { displayMessages() }
                { showDotIndicator() }
            </ScrollView>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
    },
    noMessagesText: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT35,
        fontStyle: 'italic'
    },
    noMessagesTextAddChat: {
        color: THEME.OWN_MESSAGE_NAME_COLOR,
        fontSize: THEME.FONT35,
        fontStyle: 'italic'
    },
    messageContainer: {
        width: '100%',
        marginBottom: hp('3%'),
        padding: 5,
    },
    messageHeader: {
        width: '100%',
        flexDirection: 'row'
    },
    messageNameContainer: {
        fontSize: THEME.FONT30,
        paddingLeft: 10,
        alignSelf: 'center',
    },
    messageChatIconContainer: {
        width: wp('10%'),
    },
    icons: {
        marginLeft: wp('8%'),
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 10
    },
    iconWrapper: {
        paddingRight: 15
    },
    messageIconImage: {
        width: wp('8%'),
        height: wp('8%'),
        alignSelf: 'center'
    },
    messageText: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT22,
        marginLeft: wp('8%'),
        paddingLeft: 10,
    },
    responseWaitingContainer: {
        marginLeft: wp('8%'),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    responseWaitingText: {
        fontStyle: 'italic',
        fontSize: THEME.FONT22,
        color: THEME.TEXT_COLOR,
        paddingLeft: 10,
    },
    dots: {
        marginTop: hp('1.5%'),
    },
    messageTextContainer: {
        //marginTop: 5
    }
})

export default Chat;