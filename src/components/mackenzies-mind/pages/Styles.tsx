import {makeStyles} from "@material-ui/core";
import DigitalResumeTheme, {COLORS} from "../../../theme/DigitalResumeTheme";

const useCustomStyles = makeStyles({
    fullscreen: {
        width: 'calc(100vw)',
        height: 'calc(100vh)',
        position: "relative",
        overflowY: "scroll"
    },
    fullscreenPlus: {
        width: 'calc(100vw)',
        height: 'calc(100vh)',
        position: "relative"
    },
    transparentBacking: {
        borderLeft: `4px solid ${DigitalResumeTheme.palette.primary.main}`,
        borderRight: `4px solid ${DigitalResumeTheme.palette.primary.main}`,
        padding: DigitalResumeTheme.spacing(2,2),
        backgroundColor:"rgba(0,0,0,.5)"
    },
    endAdornedInput: {
        "& .MuiFilledInput-adornedEnd": {
            border: "1px solid white",
            paddingRight: 0,
            borderTopRightRadius: DigitalResumeTheme.shape.borderRadius,
            borderBottomRightRadius: DigitalResumeTheme.shape.borderRadius
        },
        "& .MuiOutlinedInput-adornedEnd": {
            border: "1px solid white",
            paddingRight: 0,
            borderTopRightRadius: DigitalResumeTheme.shape.borderRadius,
            borderBottomRightRadius: DigitalResumeTheme.shape.borderRadius
        },
        "& .MuiInputBase-input": {
            borderRightWidth: 0,
            "&:hover": {
                borderBottomColor: "white"
            },
        },
        "& .MuiButton-containedSecondary": {
            border: 0,
            borderLeft: '1px solid white'
        }
    },
    spacer: {
        marginBottom: "40px"
    },
    fullscreenOverlay: {
        position: "absolute",
        backgroundColor: `rgba(0, 0, 0, .5)`
    },
    fullscreenWhiteOverlay: {
        position: "absolute",
        backgroundColor: `rgba(255, 255, 255, 0.3)`
    },
    fullScreenImage: {
        position: "relative",
        backgroundImage: (props: any) => `url(${props.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: DigitalResumeTheme.palette.background.default
    },
    fullSection: {
        width: 'calc(100vw)',
        height: '100%',
        position: "relative",
        zIndex: 0
    },
    fullSectionOverlay: {
        position: "absolute",
        backgroundColor: `rgba(0, 0, 0, .4)`,
        minHeight: '512px',
        height: '100%',
        width: "100%",
        zIndex: 1
    },
    fullContainer: {
        width: '100%',
        height: '100%'
    },
    resumeSection: {
        borderBottom: `1px solid ${COLORS.LIGHTGRAY}`
    },
    iconOnButton:{
        marginRight: "8px"
    }
})

export default useCustomStyles