import { Animated, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimIcon = Animated.createAnimatedComponent( Icon );

const AnimatedIcon = ({ name, color, size, onPressFunc }) => {
    const [ spinAnim, setSpinAnim ] = useState( new Animated.Value(0) );
    const [ iconPressed, setIconPressed ] = useState( false );
    const spin = spinAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '20deg', '0deg'],
    });

    function rotate() {
        Animated.spring(spinAnim, {
            toValue: iconPressed ? 0 : 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    }

    const animIcon = () => {
        onPressFunc();
        setIconPressed( !iconPressed );
        rotate();
    }

    return (
        <Pressable onPress={ animIcon } style={ styles.iconWrapper }>
            <Animated.View style={{transform: [{rotate: spin}]}}>
                <Icon
                    name={ name }
                    size={ size }
                    color={ color }
                />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconWrapper: {
        paddingRight: 15
    }
});

export default AnimatedIcon;