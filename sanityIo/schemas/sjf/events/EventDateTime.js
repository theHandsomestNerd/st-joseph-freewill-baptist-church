export default {
    name: 'EventDateTime',
    title: 'Event Date Time',
    type: 'object',
    fields: [

        {
            name: 'eventDay',
            title: 'Event Day',
            type: 'string',
        },
        {
            name: 'eventTime',
            title: 'Event Time',
            type: 'string',
        },
        {
            name: 'eventLocation',
            title: 'Event Location',
            type: 'string'
        },
    ],
    preview: {
        select: {
            title: 'eventDay',
        },
    },
}



