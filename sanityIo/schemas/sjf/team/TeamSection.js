
export default {
    name: 'TeamSection',
    title: "Team Section",
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'contentPreTitle',
            title: 'Pre Title',
            type: 'string',
        },
        {
            name: 'contentTitle',
            title: 'Large Title',
            type: 'string',
        },
        {
            name: 'contentTexts',
            title: 'Content Text',
            type: 'array',
            of: [{type: 'text'}]
        },
        {
            name: 'leadershipTeamList',
            title: 'The Leadership Team',
            type: 'array',
            of: [{type: 'reference', to: {type: 'TeamMember'}}]
        },
        {
            name: 'ministersList',
            title: 'The Ministers List Team',
            type: 'array',
            of: [{type: 'reference', to: {type: 'TeamMember'}}]
        }
    ]
}



