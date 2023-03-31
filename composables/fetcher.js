const Parser = require('rss-parser');
const rssFetcher = async (source) => {
    let parser = new Parser();
    let feed = await parser.parseURL(source.url);
    let allNews = []
    feed.items.forEach(item => {
        allNews.push({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: source.title,
            categories: item.categories ? item.categories : ['news'],
            creator: item['dc:creator'] ? item['dc:creator'] : 'unknown',
        })
    });
    return allNews
}

module.exports = {
    rssFetcher
}
