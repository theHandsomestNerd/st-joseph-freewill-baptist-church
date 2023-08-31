import React, {FunctionComponent, useContext} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography} from '@material-ui/core'
import PageContext from "../page-context/PageContext";
import MediaQueriesContext from "../media-queries-context/MediaQueriesContext";
import firebaseAnalyticsClient from "../../utils/firebase/FirebaseAnalyticsClient";
import {HeadlineCTASectionType} from "../BlockContentTypes";
import digitalResumeTheme from "../../theme/DigitalResumeTheme";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '430px',
        // backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(5)
    },
    contentBullets: {
        // border: "1px solid black"
        marginBottom: theme.spacing(5)
    }
}))


interface IProps {
    sectionData: HeadlineCTASectionType
}

const HeadlineCTASection: FunctionComponent<IProps> = (props) => {
    const mediaQueriesContext = useContext(MediaQueriesContext)

    const pageContext = useContext(PageContext);



    return (
        <Grid container item>
            <Grid container justifyContent={mediaQueriesContext.smDown ? 'center' : "flex-start"} alignItems='center'
                  alignContent='center' item
                  style={{paddingLeft: !mediaQueriesContext.smDown ? "32px" : "0px",paddingTop: mediaQueriesContext.smDown ? "32px" : "0px"}} md={8}>
                <Typography variant={'h3'}>
                    {props.sectionData.contentText}
                </Typography>
            </Grid>
            <Grid container item justifyContent={mediaQueriesContext.smDown ? 'center' : 'flex-end'} alignItems='center'
                  alignContent='center' md={4} style={{padding: "40px"}}>
                <Button variant='contained'
                        style={{
                            backgroundColor: !props.sectionData.ctaButtonText.includes("Givelify")?digitalResumeTheme.palette.text.primary:"#ef5322",
                            color: !props.sectionData.ctaButtonText.includes("Givelify")?"black":"#F8f8f8"
                }}
                        onClick={() => {
                            firebaseAnalyticsClient.ctaClick(props.sectionData.slug.current + "-banner-section", props.sectionData.ctaButtonText, pageContext.analyticsId,)
                        }}
                        href={props.sectionData.ctaButtonLink ?? ""}>
                    <Typography variant='button'
                                >{props.sectionData.ctaButtonText}</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default HeadlineCTASection