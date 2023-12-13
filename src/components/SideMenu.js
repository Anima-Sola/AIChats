//Side menu that opens by swipe right gesture
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, StyleSheet, Animated, Pressable, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rneui/themed';
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { getChatsModels, getChatsMessages, getChatsSettings, getCurrentChat } from '../store/selectors';
import THEME from '../styles/theme';

import ChatGPTIcon from '../assets/ChatIcons/ChatGPTicon.png';
import GigaChatIcon from '../assets/ChatIcons/GigaChatIcon.png';
import YandexGPTIcon from '../assets/ChatIcons/YandexGPTIcon.png';

const SideMenu = ( props, ref ) => {
    const currentChat = useSelector( getCurrentChat );
    const chatsModels = useSelector( getChatsModels );
    const chatsMessages = useSelector( getChatsMessages )[ currentChat ];
    const chatsSettings = useSelector( getChatsSettings );
    const animSideMenu = useRef(new Animated.Value( - THEME.SCREEN_WIDTH )).current;
    const animOverlayOpacity = useRef(new Animated.Value(0)).current;

    useFocusEffect(() => {
        Animated.timing(
            animSideMenu,
            {
                toValue: - THEME.SCREEN_WIDTH,
                duration: 0,
                useNativeDriver: true
            }
        ).start();
    })
    
    useImperativeHandle( ref, () => ({
        showSideMenu: () => { showSideMenu() }
    }))

    const showSideMenu = () => {
        Animated.sequence([
            Animated.timing(
                animSideMenu,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                animOverlayOpacity,
                {
                    toValue: 0.2,
                    duration: 1,
                    useNativeDriver: true
                }
            ),
        ]).start();
    }

    const hideSideMenu = () => {
        Animated.sequence([
            Animated.timing(
                animOverlayOpacity,
                {
                    toValue: 0,
                    duration: 1,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                animSideMenu,
                {
                    toValue: - THEME.SCREEN_WIDTH,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
        ]).start();
    }

    const flingLeftGesture = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            hideSideMenu();
        });

    const chatsList = () => {
        const chatIcons = [ ChatGPTIcon, GigaChatIcon, YandexGPTIcon ];

        const showFirstMessage = ( key ) => {
            if( !chatsMessages[ key ] || ( chatsMessages[ key ].length === 0 )) {
                return ( <>В чате сообщений нет...</> )
            }

            let firstMessage = chatsMessages[ key ].slice( 0, 20 );
            firstMessage += '...';

            return ( <>{ firstMessage }</> )
        }

        const items = chatsModels.map(( element, key ) => {
            return (
                <Pressable style={ THEME.SIDE_MENU_PRESSABLE_STYLE( styles.sideMenuItem ) } key={ key }>
                    <View style={ styles.sideMenuItemHeader } >
                        <Image style={ styles.messageIconImage } source = { chatIcons[ element ] } />
                        <Text style={ styles.chatNameText }>
                            { chatsSettings[ element ].chatName }
                        </Text>
                    </View>
                    <Text style={ styles.firstMessageText }>
                        { showFirstMessage( key ) }
                    </Text>
                </Pressable>
            )
        })

        return (
            <View style={ styles.sideMenuItems }>
                { items }
                <Button 
                    buttonStyle={ styles.addNewChatButton } 
                    titleStyle={ styles.addNewChatButtonTitle }
                    type="outline" 
                    title="+ Новый чат"
                />
            </View>
        )

    }
    

    return (
        <GestureDetector gesture={ flingLeftGesture }>
            <Animated.View style={{ ...styles.sideMenuContainer, transform: [{ translateX: animSideMenu }] }}>
                <View style={ styles.sideMenu }>
                    <Pressable 
                        onPress={ () => {
                            hideSideMenu();
                        }} 
                        style={ styles.closeMenuCross }
                    >
                        <Ionicons name="close-outline" size={ 40 } color= { THEME.SIDE_MENU_ITEMS_TEXT_COLOR } />
                    </Pressable>
                    { chatsList() }
                </View>
                <Pressable onPress={ hideSideMenu }>
                    <Animated.View style={{ ...styles.sideMenuOverlay, opacity: animOverlayOpacity }}>
                    </Animated.View>
                </Pressable>
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    addNewChatButton: {
        margin: wp('2%'),
        width: THEME.SCREEN_WIDTH * 0.7 - wp('4%'),
        borderRadius: wp('3%'),
        borderColor: THEME.SIDE_MENU_FIRST_MESSAGE_TEXT_COLOR
    },
    addNewChatButtonTitle: {
        color: THEME.SIDE_MENU_FIRST_MESSAGE_TEXT_COLOR,
        fontWeight: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT22,
    },
    sideMenuContainer: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        top: 0,
        width: THEME.SCREEN_WIDTH,
        height: THEME.SCREEN_HEIGHT * 2,
    },
    sideMenu: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.7,
        backgroundColor: THEME.SIDE_MENU_BACKGROUND_COLOR,
        paddingTop: THEME.STATUSBAR_HEIGHT,
    },
    closeMenuCross: {
        alignItems: 'flex-end'
    },
    sideMenuItems: {
        marginTop: hp('2%')
    },
    sideMenuItem: {
        marginRight: wp('1%'),
        marginLeft: wp('1%'),
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: wp('3%'),
    },
    sideMenuItemHeader: {
        paddingTop: hp('1%'),
        paddingLeft: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageIconImage: {
        width: wp('7%'),
        height: wp('7%')
    },
    chatNameText: {
        color: THEME.MESSAGE_NAME_COLOR,
        fontWeight: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
        marginLeft: wp('2%')
    },
    firstMessageText: {
        color: THEME.SIDE_MENU_FIRST_MESSAGE_TEXT_COLOR,
        fontSize: THEME.FONT22,
        fontWeight: THEME.FONT_LIGHT,
        paddingLeft: wp('11.1%'),
        paddingBottom: hp('1%')
    },
    sideMenuOverlay: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.3,
        backgroundColor: '#000',
        opacity: 0
    }
})

export default forwardRef(SideMenu);