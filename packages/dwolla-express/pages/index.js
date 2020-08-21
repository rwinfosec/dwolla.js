const hbs = require("hbs");
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
const superagent = require('superagent')
const port = 4040

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "hbs");

app.get('/', function(req, res) {
    res.status(200).render(`landing`, {});
});

app.get('/upload-document', function(req, res) {
    res.status(200).render(`document`, {});
});

app.get('/dwolla-components.js', function(req, res) {
    var component = path.join(__dirname + '../../dwolla-components/dist/dwolla-components.js');
    console.log(component);
    res.sendFile('/Users/nschulze/dev/dwolla.js/packages/dwolla-components/dist/dwolla-components.js');
});

app.get('/dwolla.js', function(req, res) {
    var component = path.join(__dirname + '../../dwolla-components/dist/dwolla-components.js');
    console.log(component);
    res.sendFile('/Users/nschulze/dev/dwolla.js/packages/dwolla/dist/dwolla.js');
});

app.get('/main.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/styles/main.css'));
});

app.get('/code.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/styles/code.css'));
});

function generateHeaders() {
    return {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.dwolla.v1.hal+json',
        'Content-Type': 'application/json'
    };
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
