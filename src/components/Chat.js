import React from 'react';
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { DotIndicator } from 'react-native-indicators';
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
    
    if( !chatsMessages?.length ) {
        return (
            <View style={{ ...styles.container, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={ styles.noMessagesText }>
                    В чате нет сообщений...
                </Text>
            </View>
        )
    }

    const displayMessages = () => {
        let messageBackGroundColor, messageNameColor, messageIcon, messageName;
        const chatIcons = [ ChatGPTIcon, GigaChatIcon, YandexGPTIcon ];

        const items = chatsMessages.map(( element, key ) => {
            
            if(( key % 2 ) === 0 ) {
                messageBackGroundColor = THEME.OWN_MESSAGE_BACKGROUND_COLOR;
                messageIcon = HumanIcon;
                messageName = 'YOU';
                messageNameColor = THEME.OWN_MESSAGE_NAME_COLOR;
            } else {
                messageBackGroundColor = THEME.MESSAGE_BACKGROUND_COLOR;
                messageIcon = chatIcons[ chatsSettings.iconNum ];
                messageName = chatsSettings.chatName;
                messageNameColor = THEME.MESSAGE_NAME_COLOR;
            }

            return (
                <View style={{ ...styles.messageContainer, backgroundColor: messageBackGroundColor }} key={ key }>
                    <View style={ styles.messageIconContainer }>
                        <Image style={ styles.messageIconImage } source = { messageIcon } />
                    </View>
                    <View style={ styles.messageTextContainer } >
                        <Text style={{ ...styles.messageNameContainer, color: messageNameColor }}>{ messageName }</Text>
                        <Text style={ styles.messageText } selectable={true}>{ element }</Text>
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
        marginBottom: hp('1%')
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
    messageText: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT22
    },
    messageContainer: {
        width: wp('96%'),
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: hp('2%')
    },
    messageIconContainer: {
        width: wp('10%'),
        justifyContent: 'flex-start',
        paddingTop: hp('0.3%')
    },
    messageIconImage: {
        width: wp('7%'),
        height: wp('7%')
    },
    messageNameContainer: {
        fontSize: THEME.FONT30
    },
    responseWaitingContainer: {
        marginLeft: wp('12%'),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    responseWaitingText: {
        fontStyle: 'italic',
        fontSize: THEME.FONT22,
        color: THEME.TEXT_COLOR,
    },
    dots: {
        marginTop: hp('1.5%')
    },
    messageTextContainer: {
        width: wp('86%'),
        justifyContent: 'flex-start'
    }
})

export default Chat;