//const fetch = require('node-fetch');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchAndStoreAnimeInformation (callback) {
    const animeInfoDict = {};
    const pages = [1]; // Adjust the number of pages as needed
    let pageCount = 0;

    for (const page of pages) {
        const url = `https://api.jikan.moe/v4/top/anime?q=&page=${page}`;

        try {
            const response = await fetch(url);

            if (response.status === 200) {
                const data = await response.json();
                const animeEntries = data.data;

                for (const animeData of animeEntries) {
                    const animeId = animeData.mal_id;
                    animeInfoDict[animeId] = animeData; // Store anime info in the dictionary
                }

                pageCount++;

                if (pageCount % 5 === 0) {
                    console.log(`Processed ${pageCount} pages. Waiting for 30 seconds...`);
                    await delay(30000); // Wait for 30 seconds
                }
            } else {
                console.log(`Failed to fetch anime information for page ${page}`);
            }
        } catch (error) {
            console.error(`Error fetching data for page ${page}: ${error.message}`);
        }
    }

    // Save the anime information to a JSON file with each entry organized by ID
    return JSON.stringify(animeInfoDict, null, 2);
    //fs.writeFileSync('anime_info.json', JSON.stringify(animeInfoDict, null, 2));
}

// Call the function to fetch anime information and store it in a JSON file
//fetchAndStoreAnimeInformation();

module.exports = {
    fetchAndStoreAnimeInformation
};
