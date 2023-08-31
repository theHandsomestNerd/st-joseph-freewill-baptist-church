export default {
    name: 'EventItem',
    title: 'Event Item',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'imageSrc',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'imageSrcAltText',
            title: 'Image Alt Text',
            type: 'string',
        },
        {
            name: 'contentTitle',
            title: 'Content Title',
            type: 'string',
        },
        {
            name: 'contentText',
            title: 'Content Text',
            type: 'text'
        },
        {
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string'
        },
        {
            name: 'ctaButtonLink',
            title: 'CTA Button Link',
            type: 'string'
        },
        {
            name: 'ctaSubtitle',
            title: 'CTA Subtitle',
            type: 'string'
        },

        {
            name: 'eventTimes',
            title: 'Event Day and times',
            type: 'array',
            of: [
                {type: "EventDateTime"}]
        },
        {
            name: 'eventLocation',
            title: 'Event Location',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength:
                    96,
            },
        },],
    preview: {
        select: {
            title: 'name',
            media: 'imageSrc',
        },
    },
}



