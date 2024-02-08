import React from "react";
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import THEME from "../styles/theme";

const AddNewChatModal = ({ isVisible, setIsVisible }) => {
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
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        width: wp('80%'),
        height: hp('85%'),
    },
})


export default AddNewChatModal;