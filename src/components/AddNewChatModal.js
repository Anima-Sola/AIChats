import React from "react";
import { View, Modal, StyleSheet, Pressable, Image, Text, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@rneui/themed";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import THEME from "../styles/theme";
import { getChatsSettings } from "../store/selectors";
import { addNewChatAction } from "../store/actions";

import ChatGPTIcon from '../assets/ChatIcons/ChatGPTicon.png';
import GigaChatIcon from '../assets/ChatIcons/GigaChatIcon.png';
import YandexGPTIcon from '../assets/ChatIcons/YandexGPTIcon.png';

const AddNewChatModal = ({ isVisible, setIsVisible }) => {
    const dispatch = useDispatch();
    const chatsSettings = useSelector( getChatsSettings );

    const displayModelList = () => {
        const chatsIcons = [ ChatGPTIcon, ChatGPTIcon, GigaChatIcon, YandexGPTIcon ];

        const items = chatsSettings.map(( element, key ) => {
            return (
                <Pressable 
                    style={ THEME.ADD_NEW_CHAT_MODAL_ITEM_PRESSABLE_STYLE( styles.item ) } 
                    key={ key }
                    onPress={ () => {
                        dispatch( addNewChatAction( key ));
                        setIsVisible( false );
                    }}
                >
                    <Image style={ styles.itemIconImage } source = { chatsIcons[ key ]} />
                    <Text style={ styles.itemIconText }> { element.chatName } </Text>
                </Pressable>
            )
        })

        return (
            <>{ items }</>
        )
    }

    return(
        <Modal
            visible={ isVisible }
            animationType="fade"
            transparent={ true }
            statusBarTranslucent={ true }
            onRequestClose={ () => setIsVisible( false ) }
        >
            <Pressable 
                style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]}
                onPress={ () => setIsVisible( false ) } 
            />
            <View style={ styles.container }>
                <View style={ styles.window }>
                    { displayModelList() }
                    <Button
                        title={ 'Закрыть' }
                        containerStyle={ styles.closeButtonContainerStyle }
                        onPress={ () => setIsVisible( false ) }
                        color={ THEME.OWN_MESSAGE_NAME_COLOR }
                        titleStyle={ styles.closeButtonTitleStyle }
                    />  
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.5
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.52
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    window: {
        backgroundColor: THEME.ADD_NEW_CHAT_MODAL_BACKGROUND_COLOR,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 15,
        width: wp('80%'),
    },
    item: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    itemIconImage: {
        width: wp('12%'),
        height: wp('12%')
    },
    itemIconText: {
        paddingLeft: 10,
        alignSelf: 'center',
        fontSize: THEME.FONT35,
    },
    closeButtonContainerStyle: {
        width: '90%',
        marginLeft: '5%',
        marginTop: 15,
        backgroundColor: THEME.OWN_MESSAGE_NAME_COLOR,
        borderRadius: 5
    },
    closeButtonTitleStyle: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT25
    }
})


export default AddNewChatModal;