import React, {FunctionComponent, useContext} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid, Typography} from '@material-ui/core'
import ImageWIthButtonOverlay from "../image-with-button-overlay/ImageWithButtonOverlay";
import MediaQueriesContext from "../media-queries-context/MediaQueriesContext";
import {RemoveRedEye} from "@material-ui/icons";
import bgImage from './shutterstock_1345205486.jpg'
import DigitalResumeTheme from '../../theme/DigitalResumeTheme';
import { TeamSectionType } from '../BlockContentTypes';
export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: '521px',
        backgroundColor: "white",
        // backgroundImage: `url(${bgImage})`,
        backgroundSize:"cover",
        width:"100%",
        // padding:0
        // paddingLeft: -theme.spacing(-5),
    },
    contentBullets: {
        // border: "1px solid black"
        marginBottom: theme.spacing(5)
    }
}))


interface IProps {
    sectionData: TeamSectionType
}

const TeamSection: FunctionComponent<IProps> = (props) => {
    const classes = useStyles(DigitalResumeTheme)
    const mediaQueriesContext = useContext(MediaQueriesContext)

    const [onHover, setOnHover] = React.useState<number>(-1)
    return (
        <Grid container item className={classes.root} xs={12}
              style={mediaQueriesContext.xsOnly ? {paddingBottom: 32, paddingTop: 32} : {
                  paddingBottom: DigitalResumeTheme.spacing(10),
                  paddingTop: DigitalResumeTheme.spacing(10),
              }}>
            <Grid container item alignContent='center' justifyContent='center'
                  style={{
                      paddingBottom: mediaQueriesContext.xsOnly ? DigitalResumeTheme.spacing(3) : DigitalResumeTheme.spacing(2)
                  }}>
                <Typography variant='h4' align='center' style={{color:"black"}}>{props.sectionData.contentTitle}</Typography>
            </Grid>
            <Grid container item justifyContent='space-around' spacing={2}
                // style={{padding: MixedFeelingsByTTheme.spacing(2, 4)}}
            >
                {
                    props.sectionData.leadershipTeamList.map((teamMember, index) => <Grid key={"leadership-member-" + index} container item
                                                                                     xs={12} sm={6} alignContent='center'
                                                                                     justifyContent='center'
                                                                                     style={{color: "black"}}>
                        <Grid container item justifyContent='center' alignContent='center'>
                            <Grid container  item justifyContent='center' alignContent='center' style={{width: "260px", height:260}} onMouseEnter={() => {
                                setOnHover(index)
                            }} onMouseLeave={() => {
                                setOnHover(-1)
                            }}>
                                <Grid container item justifyContent='center' alignContent='center'>

                                    <ImageWIthButtonOverlay height={250} isSquare={true}
                                                                                                    imageSrc={teamMember.image}></ImageWIthButtonOverlay>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent='center' style={{marginBottom: "-8px"}} onMouseEnter={() => {
                            setOnHover(index)
                        }} onMouseLeave={() => {
                            setOnHover(-1)
                        }}>
                            <Typography variant={'body1'}
                                        color={index === onHover ? 'primary' : "inherit"}>{teamMember.title}</Typography>
                        </Grid>
                        <Grid item container spacing={1} justifyContent='center' onMouseEnter={() => {
                            setOnHover(index)
                        }} onMouseLeave={() => {
                            setOnHover(-1)
                        }}>
                            <Grid item> <Typography variant={'h6'}
                                                    color={index === onHover ? 'primary' : "inherit"}>{teamMember.firstName}</Typography>
                            </Grid>
                            <Grid item><Typography variant={'h6'}
                                                   color={index === onHover ? 'primary' : "inherit"}>{teamMember.lastName}</Typography></Grid>

                        </Grid>

                    </Grid>)
                }
            </Grid>
            <Grid container item justifyContent='space-around' spacing={2}
                  // style={{padding: MixedFeelingsByTTheme.spacing(2, 4)}}
            >
                {
                    props.sectionData.ministersList.map((teamMember, index) => <Grid key={"member-" + (index +10)} container item
                                                                                xs={12} sm={4} alignContent='center'
                                                                                justifyContent='center'
                                                                                style={{color: "black"}}>
                        <Grid container item justifyContent='center' alignContent='center'>
                            <Grid container  item justifyContent='center' alignContent='center' style={{width: "260px", height:260}} onMouseEnter={() => {
                                setOnHover(index+10)
                            }} onMouseLeave={() => {
                                setOnHover(-1)
                            }}>
                                <Grid container item justifyContent='center' alignContent='center'>

                                    <ImageWIthButtonOverlay height={250} isSquare={true}
                                                                imageSrc={teamMember.image}></ImageWIthButtonOverlay>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent='center' style={{marginBottom: "-8px"}} onMouseEnter={() => {
                            setOnHover(index+10)
                        }} onMouseLeave={() => {
                            setOnHover(-1)
                        }}>
                            <Typography variant={'body1'}
                                        color={index+10 === onHover ? 'primary' : "inherit"}>Minister</Typography>
                        </Grid>
                        <Grid item container spacing={1} justifyContent='center' onMouseEnter={() => {
                            setOnHover(index+10)
                        }} onMouseLeave={() => {
                            setOnHover(-1)
                        }}>
                            <Grid item> <Typography variant={'h6'}
                                                    color={index+10 === onHover ? 'primary' : "inherit"}>{teamMember.firstName}</Typography>
                            </Grid>
                            <Grid item><Typography variant={'h6'}
                                                   color={index+10 === onHover ? 'primary' : "inherit"}>{teamMember.lastName}</Typography></Grid>

                        </Grid>
                        <Grid item container justifyContent='center' style={{marginBottom: "-8px"}} onMouseEnter={() => {
                            setOnHover(index+10)
                        }} onMouseLeave={() => {
                            setOnHover(-1)
                        }}>
                            <Typography variant={'body1'}
                                        color={index+10 === onHover ? 'primary' : "inherit"}>{teamMember.title}</Typography>
                        </Grid>
                    </Grid>)
                }
            </Grid>
        </Grid>
    )
}

export default TeamSection