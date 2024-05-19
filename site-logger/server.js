const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/log', (req, res) => {
    const userLog = {
        name: req.body.name,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        timestamp: new Date().toISOString()
    };
    console.log(userLog); // For demonstration, logs to the console
    res.send('Log received');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});