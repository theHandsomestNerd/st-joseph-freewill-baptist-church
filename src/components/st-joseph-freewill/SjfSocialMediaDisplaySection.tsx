import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid, IconButton, Link, Typography} from '@material-ui/core'
// import bgImage from "./Shutterstock_290377286 (1).png";
import {SjfSocialMediaConnectSectionType} from "../BlockContentTypes";
import {Facebook, Instagram, Twitter, YouTube} from "@material-ui/icons";
import {InstagramEmbed} from "react-social-media-embed";
import axios from 'axios';
import leadClient from "../transform-hw/pages/under-construction-page/leadClient";
import fromIG from './fromIG.png'
import {SanityImageAsset} from "@sanity/asset-utils";
import {urlFor} from "../block-content-ui/static-pages/cmsStaticPagesClient";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {

        padding: theme.spacing(6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(5, 2, 5)
        },
        position: "relative",
        // backgroundImage:`url("${bgImage}")`,
        minHeight: '500px',
        backgroundPosition: "bottom right",
        backgroundColor: 'white',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
    },
    contentBottom: {
        border: `1px solid ${theme.palette.secondary.main}`,
        padding: '20px'
    },
}))


interface IProps {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedIn?: string
    youtube?: string
    sectionData: SjfSocialMediaConnectSectionType
}

// const ImageHolder: FunctionComponent<{ imageData: Promise<any> }> = (props: { imageData: Promise<any> }) => {
//     const [theImage, setTheImage] = React.useState<any>()
//
//     React.useEffect(() => {
//
//         props.imageData.then((datastring) => {
//                 console.log(datastring)
//                 setTheImage(datastring.imageData)
//             }
//         )
//     }, [])
//
//     return theImage ?
//         <img src={`data:image/jpeg;base64,${theImage}`} alt="secret" width={250} height={250}/> : <>no image</>
//
// }

const SjfSocialMediaDisplaySection: FunctionComponent<IProps> = (props) => {
    const classes = useStyles()

    // const [imageSet, setImageSet] = React.useState<any[]>([])



    // React.useEffect(() => {
    //     const images = props.sectionData.instagramFeedLinks.map((igLink, index) => {
    //             return leadClient.getInstagramImage(igLink, index)
    //     });
    //
    //     setImageSet(images)
    // }, [])

    return (
        <Grid container item className={classes.root} xs={12} direction='column' alignItems='center'>
            {/*<Grid container item*/}
            {/*      className={clsx(globalClasses.fullSection, globalClasses.fullscreenWhiteOverlay)}>*/}
            {/*</Grid>*/}
            <Grid container item justifyContent='center'>
                <Grid item container>
                    <Typography variant='body1'
                                gutterBottom
                                style={{
                                    fontStyle: "italic",
                                    paddingBottom: 24
                                }}>{props.sectionData.contentPreTitle}</Typography>
                </Grid>
                <Grid xs={6} item container justifyContent='center'>
                    <Typography color='secondary'
                                variant='h4'
                                align='center'
                                gutterBottom
                                display='inline'
                                style={{
                                    zIndex: 10
                                    // color: "#444444"
                                    // backgroundColor: "#8a8989",
                                    // color: "transparent",
                                    // textShadow: "1px 1px 2px rgba(215, 215, 215,0.8)",
                                    // WebkitBackgroundClip: "text",
                                    // MozBackgroundClip: "text"
                                }}
                    >{props.sectionData.contentTitle}</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                {props.sectionData?.contentTexts?.map((segment: string, index: number) => (<Grid item key={index}>
                    <Typography variant='body1' gutterBottom>{segment}</Typography>
                </Grid>))}
            </Grid>
            <Grid item container>
                <Grid container item justifyContent='center'>
                    <Grid container item xs={8} sm={5}
                          spacing={1} justifyContent='space-around'>
                        {props.instagram && <Grid item>
                            <IconButton>
                                <Typography>
                                    <Link
                                        href={"http://instagram.com/" + props.instagram}><Instagram
                                        fontSize="large"/></Link>
                                </Typography>
                            </IconButton>
                        </Grid>}
                        {props.facebook && <Grid item>
                            <IconButton>
                                <Typography>
                                    <Link
                                        href={"http://facebook.com/" + props.facebook}><Facebook
                                        fontSize="large"/></Link>
                                </Typography>
                            </IconButton>
                        </Grid>}
                        {props.twitter && <Grid item>
                            <IconButton>

                                <Typography>
                                    <Link href={"http://twitter.com/" + props.twitter}><Twitter
                                        fontSize="large"/></Link>
                                </Typography>
                            </IconButton>
                        </Grid>}
                        {props.youtube && <Grid item>
                            <Typography>
                                <Link href={"http://youtube.com/" + props.youtube}><YouTube
                                    fontSize="large"/></Link>
                            </Typography>
                        </Grid>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item justifyContent='center'>
                <img src={fromIG}/>
            </Grid>
            <Grid item container justifyContent='center'>
                {props.sectionData.instagramFeedImages?.map((image:any, index: number) => (
                    <Grid container xs={12} sm={6} md={4} item key={index} justifyContent='space-around'
                          alignItems='center' alignContent='center'>
                        <Grid item>{image.url}<img src={urlFor(image).height(250).width(250).url() ?? ""} alt="secret" width={350} height={350}/></Grid>
                    </Grid>))}
            </Grid>
        </Grid>
    )
}


export default SjfSocialMediaDisplaySection