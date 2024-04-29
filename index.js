import express from 'express';

const app = express();
const port = 4843;


app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});
