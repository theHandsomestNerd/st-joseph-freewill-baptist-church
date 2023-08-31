import {FormControl, withStyles} from "@material-ui/core";

const StyledInputFormControl = withStyles({
    root: {

        "& .MuiInputLabel-shrink": {
            top: "12px !important",
            left: "-16px !important",
            // marginBottom: "10px"
        },
        // "& .MuiInputBase-root": {
        // },
        "& .MuiInputLabel-formControl": {
            left: -8,
            top: 20,
            // zIndex: 10,
            minWidth: 120,
            color: "white"
        }
    }
})(FormControl);
export default  StyledInputFormControl;