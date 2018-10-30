const axios = require('axios');
const wiki_url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const reddit_url = 'https://www.reddit.com';

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// scraping static site
exports.getPresidents = async function(){
    try {
        const { data } = await axios.get(wiki_url);
        const $ = cheerio.load(data);

        const presidents = [];
        const names = [];

        $('big a').each(function () {
            let a = $(this).text().split(' ');
            presidents.push( 'https://en.wikipedia.org/wiki/' + a[0] + '_' + a[1] );
            names.push($(this).text());
        });

        return { presidents, names };
    }catch(err){
        console.log(err.message);
    }
};

// scrapping dynamic site
exports.getRedditPage = async function(){
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const response = await page.goto(reddit_url);
        const html = await page.content();

        // console.log(response);
        // console.log(html);

        const $ = cheerio.load(html);
        const posts = [];
        const links = [];

        $('.SQnoC3ObvgnGjWt90zD9Z').each( function(){
           links.push( reddit_url + $(this).attr('href') );
        });

        $('.cIujan').each( function(){
             posts.push( $(this).text() );
        });

        console.log("posts ==> ", posts);
        console.log("links ==> " + links);

        return { posts, links };

    } catch(err){
        console.log(err.message);
    }

};