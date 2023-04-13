import sanityClient from "@sanity/client";

// console.log("NODE.ENV", process.env)

export default sanityClient({
    projectId: "23jjdrsp",
    dataset: process.env.REACT_APP_SANITY_DB,
    apiVersion: "2021-03-25",
    useCdn: true,
});