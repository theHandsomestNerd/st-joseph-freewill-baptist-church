import React, {FunctionComponent, useContext} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography} from '@material-ui/core'
import PageContext from "../page-context/PageContext";
import MediaQueriesContext from "../media-queries-context/MediaQueriesContext";
import firebaseAnalyticsClient from "../../utils/firebase/FirebaseAnalyticsClient";
import {HeadlineCTASectionType, ThreeColumnImagesSectionType} from "../BlockContentTypes";
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
    sectionData: ThreeColumnImagesSectionType
}

const ThreeColumnImagesSection: FunctionComponent<IProps> = (props) => {
    const classes = useStyles()
    const mediaQueriesContext = useContext(MediaQueriesContext)

    const pageContext = useContext(PageContext);

    return (
        <Grid container item style={{ padding: "40px"}}>
            <Grid container justifyContent={'center'} alignItems='center' alignContent='center' item
                  >
                <Typography color='secondary' variant={'h3'} align='center'>
                    {props.sectionData.title}
                </Typography>
            </Grid>
            <Grid container spacing={2} item justifyContent={'center'} alignItems='center' alignContent='center' style={{ padding: "40px"}}>
                {
                    props.sectionData.images.map((featuredImage)=>{
                        return <Grid item xs={12} sm={4}>
                                <img src={urlFor(featuredImage).url() ?? ""} width='100%' />
                        </Grid>
                    })
                }
            </Grid>
        </Grid>
    )
}

export default ThreeColumnImagesSection