import React, {FunctionComponent, useContext} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography} from '@material-ui/core'
import {urlFor} from '../block-content-ui/static-pages/cmsStaticPagesClient'
import {SjfHeroContentSectionType} from "../BlockContentTypes";
import clsx from "clsx";
import PageContext from "../page-context/PageContext";
import useCustomStyles from "../mackenzies-mind/pages/Styles";
import firebaseAnalyticsClient from "../../utils/firebase/FirebaseAnalyticsClient";
import MediaQueriesContext from "../media-queries-context/MediaQueriesContext";
import DigitalResumeTheme from "../../theme/DigitalResumeTheme";

interface IProps {
    sectionData: SjfHeroContentSectionType
}

interface CSSProps {
    heroBaseImageUrl: string,
    heroOverlay?: string | null
}

export const useStyles = makeStyles((theme: Theme) => ({
    marketingBackground: (props: CSSProps) => ({
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url('${props.heroBaseImageUrl}'), url('${props.heroOverlay}')`,
        backgroundSize: 'cover, contain',
        minHeight: '521px',
        backgroundColor: 'transparent',
        backgroundPosition: "right",
        position: "relative"
    }),
    contentSection: {
        height: '510px',
        marginTop: '16px',
        backgroundColor: 'transparent',
    },
    contentBullets: {
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        paddingLeft: '26px',
    }
}))

const SjfHeroContentSection: FunctionComponent<IProps> = (props) => {
    let classParameters: CSSProps = {
        heroBaseImageUrl: urlFor(props.sectionData.heroImage).url() ?? '',
    }

    if (props.sectionData.heroImageBackground) {
        classParameters = {
            ...classParameters,
            heroOverlay: urlFor(props.sectionData.heroImageBackground).url()
        }
    }
    React.useEffect(() => {
        console.log(props.sectionData)
    }, [])

    const pageContext = useContext(PageContext)
    const mediaQueriesContext = useContext(MediaQueriesContext)

    const classes = useStyles(classParameters)
    const globalClasses = useCustomStyles({})
    return (
        <Grid container item className={classes.marketingBackground}>
            <Grid container item
                  // style={{zIndex: 1000}}
                  className={clsx(globalClasses.fullSection, globalClasses.fullscreenWhiteOverlay)}>
            </Grid>
            <Grid container direction='column' style={{position:"absolute"}}>
                <Grid item>
                    <Grid container className={classes.contentSection} item xs={9} sm={9} md={6}>
                        <Grid container direction='column' style={{paddingLeft: "40px", paddingTop: "80px"}}>
                            <Grid item style={{marginBottom: DigitalResumeTheme.spacing(.5)}}>
                                <Typography variant='subtitle1' color='textSecondary'
                                            >{props.sectionData.contentWelcomeMessage}</Typography>
                            </Grid>
                            <Grid item style={{marginBottom: "30px"}}  xs={3}container>
                                <Typography variant={mediaQueriesContext.xsOnly ? "h4" : 'h3'}
                                            style={{color: "black", fontSize: "32px"}}
                                            >{props.sectionData.contentTitle}</Typography>
                            </Grid>
                            <Grid container item className={classes.contentBullets}
                                  style={{marginBottom: "60px", minWidth: "312px"}}>
                                <Typography variant='body1'
                                            style={{color: "black"}}>{props.sectionData.contentText}</Typography>
                            </Grid>
                            <Grid container item>
                                <Button color='primary' variant='contained'
                                        onClick={() => {
                                            firebaseAnalyticsClient.ctaClick("hero-section", props.sectionData.ctaButtonTitle, pageContext.analyticsId,)
                                        }}
                                        href={props.sectionData.ctaButtonLink ?? ""}>
                                    <Typography variant='button'
                                                color='textSecondary'>{props.sectionData.ctaButtonTitle}</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    )
}

export default SjfHeroContentSection