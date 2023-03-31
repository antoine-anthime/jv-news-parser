var express = require('express');
var router = express.Router();
const Sources = require('../sources.json')
const Fetcher = require('../composables/fetcher')
router.get('/available-sources', function(req, res, next) {
  res.send(Sources)
});

router.get('/source/:id', function(req, res, next) {
    let source = Sources.find(source => source.id === parseInt(req.params.id))
    if (source) {
        res.send(source)
    } else {
        res.status(404).send('Source not found')
    }
});

router.get('/source/:id/news', async function(req, res, next) {
    let source = Sources.find(source => source.id === parseInt(req.params.id))
    if (source) {
        let news = await Fetcher.rssFetcher(source)
        res.send(news)
    } else {
        res.status(404).send('Source not found')
    }
})

module.exports = router;
