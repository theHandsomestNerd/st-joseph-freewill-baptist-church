import {FormControl, withStyles} from "@material-ui/core";

const StyledSelectFormControl = withStyles({
    root: {
        "& .MuiInputLabel-shrink": {
            top: "-24px !important",
            left: "0px !important",
            // marginBottom: "10px"
        },
        // "& .MuiInputLabel-root": {
        //     zIndex: 1,
        // },
        "& .MuiInputLabel-formControl": {
            left: 16,
            top: -14,
            minWidth: 120,
            color: "white"
        }
    }
})(FormControl);

export default StyledSelectFormControl;