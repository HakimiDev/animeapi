require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const { fetchAndStoreAnimeInformation } = require('./src/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);
app.use(cors());

app.get('/anime', async (req, res) => {
    const json = await fetchAndStoreAnimeInformation();
    return res.status(200).json(json);
});

app.all('*', (req, res) => {
    return res.sendStatus(404);
});

const server = app.listen(process.env.PORT, () => console.log(`App is online with port ${server.address().port}`));
