import React, {ChangeEvent, FunctionComponent, useState} from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles"
import {Grid, TextField, Typography, useTheme} from '@material-ui/core'
import LoadingButton from "../../loading-button/LoadingButton";
import {ButtonGroupMemberEnum} from "../../loading-button/ButtonGroupMemberEnum";
import isEmail from "validator/lib/isEmail";
import {useQuery} from "react-query";
import leadClient from "./under-construction-page/leadClient";
import DigitalResumeTheme from "../../../theme/DigitalResumeTheme";
import useCustomStyles from "../../mackenzies-mind/pages/Styles";
import FirebaseAnalyticsClient from "../../../utils/firebase/FirebaseAnalyticsClient";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {},
}))

interface IProps {
    emailFieldText: string
    emailButtonText: string
    subscribeText: string
}

const SubmitEmail: FunctionComponent<IProps> = (props: IProps) => {
    const theme = useTheme()
    const classes = useCustomStyles(DigitalResumeTheme)
    const [email, setEmail] = useState("")

    const {isLoading, isError, data, refetch} = useQuery(
        ['createLead'],
        () => {
            if ((!data && !isError) && email && email.length > 0) {
                return leadClient.createLead({email, source: "Coming Soon Page"});
            }
            return undefined
        }
    );

    const createLead = async (e: any): Promise<any> => {
        FirebaseAnalyticsClient.ctaClick('coming-soon-page', 'Submit Email')
        return refetch()
    }

    const getHelperText = () => {
        if ((data || isError) && !isEmail(email)) {
            return <Typography style={{color: theme.palette.error.main}} variant='subtitle1'>This is not a
                valid email address.</Typography>
        }

        if (data) {
            return <Typography style={{color: theme.palette.success.main}} variant='subtitle1'>Thank you for
                your submission!</Typography>
        }
        if (isError) {
            return <Typography style={{color: theme.palette.error.main}} variant='subtitle1'>Please Try your
                submission again later or contact hello@thehandsomestnerd.com.</Typography>
        }

        return <Typography variant='subtitle1'>&nbsp;</Typography>
    }


    return (<Grid container item>
        <Grid item container justifyContent='center'>
            <Typography color='primary' gutterBottom variant='body2'
                        align='center'
                        style={{marginBottom: theme.spacing(2)}}>{props.subscribeText}</Typography>
        </Grid>
        <Grid item container>
            <TextField fullWidth
                       label={props.emailFieldText}
                       variant='filled'
                       type='email'
                       value={email}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => {
                           setEmail(event.target.value)
                       }}
                       className={classes.endAdornedInput}
                       InputProps={{
                           endAdornment:
                               <LoadingButton
                                   width={130}
                                   isLoading={isLoading}
                                   groupiness={ButtonGroupMemberEnum.RIGHT}
                                   disabled={!!(data || isError || (email && (email.length > 0) && !isEmail(email)))}
                                   clickHandler={createLead}
                                   color='primary'
                                   variant='contained'>{props.emailButtonText}</LoadingButton>
                           ,
                       }}/>
        </Grid>
        <Grid item container justifyContent='center' className={classes.spacer}>
            {getHelperText()}
        </Grid></Grid>)
}

export default SubmitEmail