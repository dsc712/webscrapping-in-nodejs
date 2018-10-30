const express = require('express');
const app     = express();
const scrap = require('./scrap');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
      const data = await scrap.getPresidents();
      res.render("index", {data});
});

app.get('/reddit', async (req, res) => {
    const data = await scrap.getRedditPage();
    res.render('reddit', {data} );
});

app.listen(8080, () => {
    console.log("app started on port number : " + 8080);
});