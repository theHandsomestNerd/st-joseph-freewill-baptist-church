import {TextField, withStyles} from "@material-ui/core";
import DigitalResumeTheme from "../../theme/DigitalResumeTheme";

const StyledTextField = withStyles({
    root: {
        transition: "all 0.3s ease-in-out",
        "& label": {
            // display: "inline-block",
            // fontSize: "16px",
            // fontWeight: 700,
            position: "relative",
            top: "8px",
            left: "-14px",
        },
        "& legend": {
            maxWidth: "0px"
        },
        "& input": {
            zIndex: 2
        },
        "& textarea": {
            zIndex: 2
        },
        "& fieldset": {
            backgroundColor: "#292929",
        },
        "& .MuiOutlinedInput-root": {
            borderColor: `${DigitalResumeTheme.palette.primary.main} !important`,
            "&.Mui-focused": {
                borderColor: `${DigitalResumeTheme.palette.primary.main} !important`,
                "&:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${DigitalResumeTheme.palette.primary.main} !important`
                    }
                }
            },
            "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: `#212121 !important`
                }
            }
        }
    }
})(TextField);

export default StyledTextField;