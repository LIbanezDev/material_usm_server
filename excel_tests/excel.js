const xlsx = require('xlsx')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request-promise')
const uris = require('./data/urls')
const {productsToExcel} = require('./excel')

const productsToExcel = productsList => {
    const path = 'books/products.xlsx'
    fs.existsSync(path) && fs.unlinkSync(path)
    const newWB = xlsx.utils.book_new()
    let newWS;
    for (let i = 0; i < productsList.length; i++) {
        newWS = xlsx.utils.json_to_sheet(productsList[i])
        xlsx.utils.book_append_sheet(newWB, newWS, productsList[i][0].TYPE)
    }
    xlsx.writeFile(newWB, 'products.xlsx')
}

const getProductsGeneralData = async () => {
    const base = 'https://www.solotodo.cl'
    let $;
    const productsList = []

    console.log(`Scraping ${base}`)
    console.time(1)

    for (let i = 0; i < uris.length; i++) {
        console.log(`Getting ${uris[i]}...`)
        $ = await request({
            uri: `${base}/${uris[i]}`,
            transform: body => cheerio.load(body)
        })
        const productName = $('h1').text()
        const newProducts = []
        insertGeneralProducts(newProducts, $, productName)

        let pagesAmount = parseInt($('.pagination').children().eq(-2).text())
        let responsePromises = []
        let finalResponses = []

        let responsePromise;
        for (let j = 2; j <= pagesAmount; j++) {
            console.log(`${base}/${uris[i]}?offer_price_usd&page=${j}`)
            responsePromise = request({
                uri: `${base}/${uris[i]}?offer_price_usd&page=${j}`,
                transform: body => cheerio.load(body)
            })
            responsePromises.push(responsePromise)
        }

        finalResponses = await Promise.all(responsePromises)
        for (let $ of finalResponses) {
            insertGeneralProducts(newProducts, $, productName)
        }

        responsePromises = []
        finalResponses = []

        for (let item of newProducts) {
            responsePromise = request({
                uri: item.URL,
                transform: body => cheerio.load(body)
            })
            responsePromises.push(responsePromise)
        }

        /*finalResponses = await Promise.all(responsePromises)
        for (let $ of finalResponses) {
            insertProducts(newProducts, $, productName)
        }*/

        productsList.push(newProducts)
        console.log('Ready!')
    }



    productsToExcel(productsList)
    console.log('Scraping completed in ')
    console.timeEnd(1)
}

const insertGeneralProducts = (product, $, TYPE) => {
    $('.category-browse-result').each(function (index, el) {
        const newProduct = {
            TYPE,
            NAME: $(this).children('h3').children('a').text(),
            URL: $(this).children('h3').children('a').attr('href')
        }
        product.push(newProduct);
    })
}

module.exports = {
    productsToExcel
}
