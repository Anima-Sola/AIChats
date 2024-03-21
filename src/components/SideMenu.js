//Side menu that opens by swipe right gesture
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, StyleSheet, Animated, Pressable, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { getChatsModels, getChatsMessages, getChatsSettings, getCurrentChat } from '../store/selectors';
import { deleteChatAction, setCurrentChatAction } from '../store/actions';
import THEME from '../styles/theme';

import ChatGPTIcon from '../assets/ChatIcons/ChatGPTicon.png';
import GigaChatIcon from '../assets/ChatIcons/GigaChatIcon.png';
import YandexGPTIcon from '../assets/ChatIcons/YandexGPTIcon.png';

const SideMenu = ( props, ref ) => {
    const dispatch = useDispatch();
    const currentChat = useSelector( getCurrentChat );
    const chatsModels = useSelector( getChatsModels );
    const chatsMessages = useSelector( getChatsMessages );
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

    const displayChatsList = () => {
        const chatIcons = [ ChatGPTIcon, GigaChatIcon, YandexGPTIcon ];

        const showFirstMessage = ( key ) => {
            if( !chatsMessages[ key ][ 0 ] || ( chatsMessages[ key ][ 0 ].length === 0 )) {
                return ( <>Cообщений нет...</> )
            }

            let firstMessage = chatsMessages[ key ][ 0 ].slice( 0, 16 );
            firstMessage += '...';

            return ( <>{ firstMessage }</> )
        }

        const items = chatsModels.map(( element, key ) => {
            const itemStyle = ( key === currentChat ) ? styles.currentSideMenuItem : styles.sideMenuItem;

            return (
                <Pressable 
                    style={ THEME.SIDE_MENU_PRESSABLE_STYLE( itemStyle ) } 
                    key={ key }
                    onPress={ () => dispatch( setCurrentChatAction( key ) ) }
                >
                    <View style={ styles.sideMenuInfo } >
                        <Image style={ styles.messageIconImage } source = { chatIcons[ element ] } />
                        <View style={ styles.sideMenuText }>                       
                            <Text style={ styles.chatNameText }>
                                { chatsSettings[ element ].chatName }
                            </Text>
                            <Text style={ styles.firstMessageText }>
                                { showFirstMessage( key ) }
                            </Text>
                        </View>
                    </View>
                    <View style={ styles.trashIconContainer }>
                        <Icon 
                            name={ 'trash-outline' } 
                            color={ THEME.TEXT_COLOR } 
                            size={ 32 } 
                            onPress={ () => { 
                                dispatch( deleteChatAction( key ) );
                                props.forceUpdate();
                            }}
                        />
                    </View>
                </Pressable>
            )
        })

        return (
            <View style={ styles.sideMenuItems }>
                { items }
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
                    { displayChatsList() }
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
        marginTop: hp('2%'),
        marginLeft: 5,
        marginRight: 5
    },
    sideMenuItem: {
        borderRadius: wp('3%'),
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    currentSideMenuItem: {
        borderRadius: wp('3%'),
        marginBottom: 5,
        borderColor: THEME.SIDE_MENU_CURRENT_ITEM_BORDER_COLOR,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    sideMenuInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sideMenuText: {
        marginLeft: 10
    },
    messageIconImage: {
        width: wp('10%'),
        height: wp('10%'),
    },
    chatNameText: {
        color: THEME.MESSAGE_NAME_COLOR,
        fontWeight: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
    },
    firstMessageText: {
        color: THEME.SIDE_MENU_FIRST_MESSAGE_TEXT_COLOR,
        fontSize: THEME.FONT22,
        fontWeight: THEME.FONT_LIGHT,
    },
    trashIconContainer: {
        alignSelf: 'center',
    },
    sideMenuOverlay: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.3,
        backgroundColor: '#000',
        opacity: 0
    }
})

export default forwardRef(SideMenu);