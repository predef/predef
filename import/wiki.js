const fetch = require("node-fetch");
const fs = require('fs-extra')

async function downJSON(url) {
    let response = await fetch(url, {
        'method': 'GET'
    })
    return await response.json()
}

async function downWiki(url) {
    console.log(url)
    let content = await downJSON(url)
    let text = content.text
    content.text = undefined
    console.log(JSON.stringify(content, null, 2))
    return text
}

async function downPages(rootUrl) {
    let pagesContent = await downJSON(rootUrl)
    console.log(JSON.stringify(pagesContent.pages))
    for (let page of pagesContent.pages) {
        let content = await downWiki(rootUrl + '/' + page)
        await fs.writeFile('wiki/' + page + '.md', content)
    }
}

let rootUrl = 'https://sourceforge.net/rest/p/predef/wiki'

downPages(rootUrl)
