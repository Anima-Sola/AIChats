import React, { useState, useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import THEME from '../styles/theme';

const MainChatScreen = () => {
    const [ inputHeight, setInputHeight ] = useState( 46 );

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync( THEME.MAIN_BACKGROUND_COLOR );
    })

    return (
        <View style={ styles.container } >
            <StatusBar translucent backgroundColor="transparent" />
            <View style={ styles.header }>
                <Icon style={ styles.icon } name={ 'menu' } color={ THEME.TEXT_COLOR } size={ 40 }/>
                <Icon style={ styles.icon } name={ 'settings-outline' } color={ THEME.TEXT_COLOR  } size={ 40 }/>
            </View>
            <ScrollView>

            </ScrollView>
            <View style={ styles.inputContainer }>
                <View style={ styles.input }>
                    <TextInput
                        style={{ ...styles.textInput, height: inputHeight }}
                        multiline={ true }
                        onContentSizeChange={( event ) => {
                            setInputHeight( event.nativeEvent.contentSize.height );
                        }}
                    />
                    <Icon style={ styles.sendIcon } name={ 'send' } color={ THEME.TEXT_COLOR  } size={ 30 }/>
                </View>
                <Icon style={ styles.microfonIcon } name={ 'mic-circle' } color={ THEME.TEXT_COLOR  } size={ 55 }/>
            </View>
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
        paddingLeft: wp('3%'),
        paddingRight: wp('3%'),
        height: hp('12%'),
    },
    icon: {
        alignSelf: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: hp('1%'),
        alignItems: 'center',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('80%'),
        borderRadius: hp('3%'),
        marginLeft: wp('3%'),
        backgroundColor: THEME.INPUT_COLOR,
        minHeight: hp('6%')
    },
    sendIcon: {
        paddingRight: wp('3%')
    },
    textInput: {
        fontSize: THEME.FONT28,
        color: THEME.TEXT_COLOR,
        width: wp('70%'),
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
    },
    microfonIcon: {
        marginLeft: wp('2%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontSize: THEME.FONT50
    }
})

export default MainChatScreen;