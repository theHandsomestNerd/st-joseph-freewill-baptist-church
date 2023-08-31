import React, {FunctionComponent, useContext} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography} from '@material-ui/core'
import PageContext from "../page-context/PageContext";
import MediaQueriesContext from "../media-queries-context/MediaQueriesContext";
import firebaseAnalyticsClient from "../../utils/firebase/FirebaseAnalyticsClient";
import {
    EventDateTime,
    EventsSectionType,
    HeadlineCTASectionType,
    ThreeColumnImagesSectionType
} from "../BlockContentTypes";
import {urlFor} from "../block-content-ui/static-pages/cmsStaticPagesClient";

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
    sectionData: EventsSectionType
}

const EventsSection: FunctionComponent<IProps> = (props) => {
    const classes = useStyles()
    const mediaQueriesContext = useContext(MediaQueriesContext)

    const pageContext = useContext(PageContext);

    return (
        <Grid container item style={{padding: "40px"}}>
            <Grid container justifyContent={'center'} alignItems='center' alignContent='center' item
            >
                <Typography color='secondary' variant={'h2'} align='center'>
                    {props.sectionData.contentTitle}
                </Typography>
            </Grid>
            <Grid item container justifyContent='center'>
                <Grid item container xs={12} md={9}>
                    <img src={urlFor(props.sectionData.eventsList[0].imageSrc).url() ?? ""} width='100%'/>
                </Grid>
                <Grid item container justifyContent='center'>
                    <Typography  color='secondary' variant='h5'>{props.sectionData.eventsList[0].contentTitle}</Typography>
                </Grid>
                <Grid item container justifyContent='center'>
                    <Typography  color='secondary' variant='h6'>{props.sectionData.eventsList[0].eventLocation}</Typography>
                </Grid>
                <Grid item container justifyContent='center'>
                    {props.sectionData.eventsList[0].eventTimes?.length !== 1 ? props.sectionData.eventsList[0].eventTimes?.map((theEventTime, index) => {
                        return <Typography key={index}  color='secondary' variant='body2'>{theEventTime.eventDay}{theEventTime.eventTime ? '@' + theEventTime.eventTime : ""}</Typography>
                    }) : <Grid item>
                        <Typography  color='secondary' variant='body2'>{props.sectionData.eventsList[0].eventTimes[0].eventDay}</Typography>
                        <Typography  color='secondary' variant='body2'>{props.sectionData.eventsList[0].eventTimes[0].eventTime}</Typography>
                    </Grid>

                    }
                </Grid>
            </Grid>
            <Grid container spacing={2} item justifyContent={'center'} alignItems='center' alignContent='center'
                  style={{padding: "40px"}}>
                {
                    props.sectionData.eventsList.slice(1).map((featuredEvent, index2) => {
                        return <Grid item xs={11} md={4} key={index2}  justifyContent='center'>
                            <Grid item container>
                                <img src={urlFor(featuredEvent.imageSrc).url() ?? ""} width='100%'/>
                            </Grid>
                            <Grid item container  justifyContent='center'>
                                <Typography color='secondary' variant='h6'>{featuredEvent.contentTitle}</Typography>
                            </Grid>
                            <Grid item container justifyContent='center'>
                                <Typography color='secondary'variant='body2' >{featuredEvent.eventLocation ? featuredEvent.eventLocation :props.sectionData.eventsList[0].eventLocation}</Typography>
                            </Grid>
                            <Grid item container justifyContent='center'>
                                {featuredEvent.eventTimes?.length !== 1 ? featuredEvent.eventTimes?.map((theEventTime, index) => {
                                    return <Grid item container justifyContent='center' key={index}><Typography variant='body1'  color='secondary'>{theEventTime.eventDay}{theEventTime.eventTime ? '@' + theEventTime.eventTime : ""}</Typography></Grid>
                                }) : <Grid item>
                                    <Typography color='secondary'  variant='body1'>{featuredEvent.eventTimes[0].eventDay}</Typography>
                                    <Typography  color='secondary' variant='body1'>{featuredEvent.eventTimes[0].eventTime}</Typography>
                                </Grid>

                                }
                            </Grid>
                        </Grid>
                    })
                }
            </Grid>
        </Grid>
    )
}

export default EventsSection