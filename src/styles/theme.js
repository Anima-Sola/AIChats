import { StatusBar, PixelRatio, Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const fontScale = PixelRatio.getFontScale();

const THEME = {
    MAIN_BACKGROUND_COLOR: "#000000",
    HEADER_BACKGROUND_COLOR: '#232325',
    INPUT_LINE_BACKGROUND_COLOR: '#232325',
    INPUT_LINE_TEXT_COLOR: '#FFFFFF',
    ICON_COLOR: '#FFFFFF',
    NAV_BAR_COLOR: '#000000',
    OWN_MESSAGE_NAME_COLOR: '#605ba4',
    MESSAGE_NAME_COLOR: '#10a37f',
    INPUT_COLOR: '#40414f',
    TEXT_COLOR: '#fff',
    ADD_NEW_CHAT_MODAL_BACKGROUND_COLOR: '#fff',
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    SIDE_MENU_ITEMS_TEXT_COLOR: '#f6f6f6',
    SIDE_MENU_BACKGROUND_COLOR: '#242426',
    SIDE_MENU_ITEM_BORDER_COLOR: '#fff',
    SIDE_MENU_FIRST_MESSAGE_TEXT_COLOR: '#fff',
    STATUSBAR_HEIGHT: StatusBar.currentHeight,
    FONT22: hp('2.2%') / fontScale,
    FONT25: hp('2.5%') / fontScale,
    FONT28: hp('2.8%') / fontScale,
    FONT30: hp('3%') / fontScale,
    FONT35: hp('3.5%') / fontScale,
    FONT40: hp('4%') / fontScale,
    FONT45: hp('4.5%') / fontScale,
    FONT50: hp('5%') / fontScale,
    FONT_LIGHT: '200',
    FONT_SEMIBOLD: '500',
    SIDE_MENU_PRESSABLE_STYLE: ( itemStyles ) => {
        return (({ pressed }) => 
            [
                { 
                    backgroundColor: pressed ? '#4d3e3e': THEME.MESSAGE_BACKGROUND_COLOR,
                },
                itemStyles
            ]
        )
    },
    ADD_NEW_CHAT_MODAL_ITEM_PRESSABLE_STYLE: ( itemStyles ) => {
        return (({ pressed }) => 
            [
                { 
                    backgroundColor: pressed ? THEME.OWN_MESSAGE_NAME_COLOR: THEME.ADD_NEW_CHAT_MODAL_BACKGROUND_COLOR,
                    color: THEME.TEXT_COLOR
                },
                itemStyles
            ]
        )
    }
}

export default THEME;