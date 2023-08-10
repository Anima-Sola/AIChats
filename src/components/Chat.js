import React from 'react';
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { DotIndicator } from 'react-native-indicators';
import { getChatsMessages, getChatsSettings, getCurrentChat, getCurrentChatModel, getState } from '../store/selectors';
import THEME from '../styles/theme';

import HumanIcon from '../assets/ChatIcons/HumanIcon.png';

const Chat = () => {
    const chatsMessages = useSelector( getChatsMessages );
    const chatsSettings = useSelector( getChatsSettings );
    const currentChat = useSelector( getCurrentChat );
    const currentChatModel = useSelector( getCurrentChatModel );

    console.log('render');

    if( chatsMessages[ currentChat ].length === 0 ) {
        return (
            <View style={{ ...styles.container, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={ styles.noMessagesText }>
                    В чате нет сообщений...
                </Text>
            </View>
        )
    }

    const displayMessages = () => {
        const messages = chatsMessages[ currentChat ];
        const chatSettings = chatsSettings[ currentChatModel ];
        let messageBackGroundColor;
        let messageNameColor;
        let messageIcon;
        let messageName;

        const items = messages.map(( element, key ) => {
            
            if( element['role'] === 'user' ) {
                messageBackGroundColor = THEME.OWN_MESSAGE_BACKGROUND_COLOR;
                messageIcon = HumanIcon;
                messageName = 'YOU';
                messageNameColor = THEME.OWN_MESSAGE_NAME_COLOR;
            } else {
                messageBackGroundColor = THEME.MESSAGE_BACKGROUND_COLOR;
                messageIcon = chatSettings.icon;
                messageName = chatSettings.chatName;
                messageNameColor = THEME.MESSAGE_NAME_COLOR;
            }

            return (
                <View style={{ ...styles.messageContainer, backgroundColor: messageBackGroundColor }} key={ key }>
                    <View style={ styles.messageIconContainer }>
                        <Image style={ styles.messageIconImage } source = { messageIcon } />
                    </View>
                    <View style={ styles.messageTextContainer } >
                        <Text style={{ ...styles.messageNameContainer, color: messageNameColor }}>{ messageName }</Text>
                        <Text style={ styles.messageText }>{ element['content'] }</Text>
                        <View style={ styles.responseWaitingContainer }>
                            <Text style={ styles.responseWaitingText }>Ожидаем ответ</Text>
                            <View style={ styles.dots }>
                                <DotIndicator color='white' size={ 2 } count={ 3 }/>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })

        return (
            <>{ items }</>
        )
    }
    
    return (
        <View style={ styles.container }>
            <ScrollView>
                { displayMessages() } 
            </ScrollView>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp('2%')
    },
    noMessagesText: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT35,
        fontStyle: 'italic'
    },
    messageText: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT25
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
        marginTop: hp('0.3%'),
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