
export default {
    name: 'ThreeColumnImageSection',
    title: "Three Column Image Section",
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
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of:[{type:'image'}]
        },
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
}



