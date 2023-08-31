import {Select, withStyles} from "@material-ui/core";
import DigitalResumeTheme from "../../theme/DigitalResumeTheme";

const StyledSelectField = withStyles({
    root: {
        transition: "all 0.3s ease-in-out",
        "& label": {
            // display: "inline-block",
            // fontSize: "16px",
            // fontWeight: 700,
            zIndex: 1,
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
        "& .MuiSelect-root": {
            "& fieldset": {
                backgroundColor: "#292929",
                zIndex: 1
            },
            borderColor: `${DigitalResumeTheme.palette.primary.main} !important`,
            "& .MuiSelect-outlined": {

                backgroundColor: "#292929",
            },
            "&.Mui-focused": {
                top: "8px",
                left: "-14px",
                borderColor: `${DigitalResumeTheme.palette.primary.main} !important`,
                "&:hover": {
                    "& .MuiSelect-outline": {
                        borderColor: `${DigitalResumeTheme.palette.primary.main} !important`
                    }
                }
            },
            "&:hover": {
                "& .MuiOutlinedSelect-notchedOutline": {
                    borderColor: `#212121 !important`
                }
            }
        }
    }
})(Select);
export default StyledSelectField;