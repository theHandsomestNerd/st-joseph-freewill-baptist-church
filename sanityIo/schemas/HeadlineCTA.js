
export default {
    name: 'HeadlineCTASection',
    title: "Headline + CTA Section",
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'contentText',
            title: 'Content Text',
            type: 'text',
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
        }
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
}



