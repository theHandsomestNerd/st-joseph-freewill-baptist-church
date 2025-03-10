const MENUGROUP = `
          title,
          _type,
          slug,
          menuGroupTitle,
          "links":links[]->{
            _type,
            displayText,
            url,
            isOutlinedButton,
            isContainedButton,
            isModalButton,
            modalRef->{
                name,
                title,
                slug,
                backgroundImageSrc,
                iconOverlayImageSrc,
                "contentText":contentText[],
                "notes":notes[],
                ctaButtonTitle,
                ctaButtonLink
            }
          },
          displayText,
          url,
          isOutlinedButton,
          isContainedButton,
`;

const MENUGROUPCONTAINER = `
          title,
          slug,
          displayText,
          "subMenus":subMenus[]->{
            ${MENUGROUP}
          },
          logoImageSrc,
          logoImageAltText
`;

const SERVICE =
    `name,
        imageSrc,
        imageSrcAltText,
        contentTitle,
        contentText,
        ctaButtonText,
        ctaButtonLink,
        learnMoreLink,
        learnMoreText,
        educationPageTitle,
        educationPageSlimHeroImage,
        extendedDescriptions,
        benefitsOfServiceTitle,
        benefitsOfServiceContents,
        benefitsOfServiceBullets,
        "serviceAmenities": serviceAmenities[]->,
        slug,`;


const HOMEPAGE = `_type,
          title,
          isUnderConstruction,
          releaseDate,
          slug,
          address,
          email,
          phone,
          description,
          businessCardImageSrc,
          bookAppointmentLink,
          bookAppointmentQrCode,
          website,
          websiteQrCode,
          metaImage,
          headerContent {
            "content": content[]->{
                ...,
                headerMenuRef->{
                 ${MENUGROUPCONTAINER}
               },
            }
          },
          footerContent {
            "content": content[]->{
                ...,
                footerMenuRef->{
                 ${MENUGROUPCONTAINER}
               },
            }
          },
          pageContent {
            "content": content[]->{
                ...,
                "servicesList": servicesList[]->{
                    ${SERVICE}
                },
                "eventsList": eventsList[]->{
                    ...,
                    "eventTimes": eventTimes[]
                },
                "ministersList": ministersList[]->,
                "leadershipTeamList": leadershipTeamList[]->,
                "serviceAmenities": serviceAmenities[]->,
                "skillsets": skillsets[]{
                    ...,
                    "skills": skills[]->{
                        _id,
                        name,
                        title,
                    },
                }, 
                "experiences": experiences[]->{
                    ...,
                    "skillsUsed": skillsUsed[]->
                },
                "educationExperiences": educationExperiences[]->,
                "feedbackEntries": feedbackEntries[]->,
                "portfolioEntries": portfolioEntries[]->{
                    ...,
                    "skillsHighlighted": skillsHighlighted[]->,
                    "imageGallery": imageGallery[]
                },
                "resumeFile": resumeFile.asset->,
                "cvFile": cvFile.asset->
            }
          },
          "servicesAvailable": servicesAvailable[]->{
            ${SERVICE}
          },
          underConstructionPageRef,
          structuredData,
          facebook,
          facebookIconSrc{
            asset->{
              _id,
              url,
              altText
             }
          },
          twitter,
          twitterIconSrc{
            asset->{
              _id,
              url,
              altText
             }
          },
          instagram,
          linkedIn,
          github,
          instagramIconSrc{
            asset->{
              _id,
              url,
              altText
             }
          }
`;
// const MENUGROUP = `
//           title,
//           slug,
//           logoImage,
//           menuGroupTitle,
//           "links": links[]->{title, displayText, url, isOutlinedButton, isContainedButton}
// `


enum SANITY_TYPES_ENUM {
    SERVICE="transformServiceItem"
}

const defaultObj = {HOMEPAGE, MENUGROUPCONTAINER, MENUGROUP, SERVICE, SANITY_TYPES_ENUM};


export default defaultObj;
