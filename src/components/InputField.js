import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import THEME from '../styles/theme';

const InputField = ({ sendMessageToChat, clearChat, isReplyArrived }) => {
    const [ message, setMessage ] = useState('');
    const [ inputHeight, setInputHeight ] = useState( 46 );

    const opacity = ( !isReplyArrived ) ? 0.3 : 1;

    return (
        <View style={{ ...styles.inputContainer, opacity: opacity }}>
            <View style={{ ...styles.clearChatIcon, height: inputHeight }}>
                <Icon 
                    name={ 'close-outline' } 
                    color={ THEME.ICON_COLOR  } 
                    size={ 35 }
                    onPress={ () => clearChat( message ) }
                    disabled={ !isReplyArrived }
                />
            </View>
            <View style={{ ...styles.input, height: inputHeight }}>
                <TextInput
                    style={{ ...styles.textInput, height: inputHeight }}
                    multiline={ true }
                    onContentSizeChange={( event ) => {
                        setInputHeight( event.nativeEvent.contentSize.height );
                    }}
                    onChangeText={ setMessage }
                    value={ message }
                    readOnly={ !isReplyArrived }
                />
            </View>
            <View style={{ ...styles.sendTextVoice, height: inputHeight }} >
                <Icon 
                    name={ 'send' } 
                    color={ THEME.ICON_COLOR  } 
                    size={ 25 }
                    disabled={ !isReplyArrived } 
                    onPress={ () => {
                        sendMessageToChat( message );
                        setInputHeight(46);
                        setMessage('');
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: THEME.INPUT_LINE_BACKGROUND_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearChatIcon: {
        width: wp('10%'),
        minHeight: THEME.MIN_INPUT_FIELD_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('80%'),
        minHeight: THEME.MIN_INPUT_FIELD_HEIGHT
    },
    textInput: {
        width: '100%',
        fontSize: THEME.FONT28,
        color: THEME.INPUT_LINE_TEXT_COLOR,
    },
    sendTextVoice: {
        width: wp('10%'),
        minHeight: THEME.MIN_INPUT_FIELD_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default InputField;

