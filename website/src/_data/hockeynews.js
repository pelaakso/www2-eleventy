const axios = require("axios");

/* The response from endpoint be like:

{
    "_doc": "Simulate endpoint data for static sites, to be used during site generation",
    "newsfeed": [
        {
            "authorName": "Curtis Conklin",
            ...
        },
        {
            "authorName": "Trent Burrows",
            ...
        }
    ]
}
*/

module.exports = async function() {
    try {
        const response = await axios.get('http://static-site-data.petey952.be.s3-website.eu-central-1.amazonaws.com/newsfeed.json');
        return response.data.newsfeed;
    }
    catch (error) {
        console.error(`Failed to get hockey news: ${error}`);
        throw error;
    }
}
