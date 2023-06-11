import { StatusBar, PixelRatio } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const fontScale = PixelRatio.getFontScale();

const THEME = {
    MAIN_BACKGROUND_COLOR: "#343541",
    HEADER_BACKGROUND_COLOR: '#202123',
    INPUT_COLOR: '#40414f',
    TEXT_COLOR: '#fff',
    STATUSBAR_HEIGHT: StatusBar.currentHeight,
    FONT22: hp('2.2%') / fontScale,
    FONT25: hp('2.5%') / fontScale,
    FONT28: hp('2.8%') / fontScale,
    FONT30: hp('3%') / fontScale,
    FONT35: hp('3.5%') / fontScale,
    FONT40: hp('4%') / fontScale,
    FONT45: hp('4.5%') / fontScale,
    FONT50: hp('5%') / fontScale,
}

export default THEME;