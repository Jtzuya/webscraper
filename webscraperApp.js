require('dotenv').config()
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const PORT = 8000

const url = process.env.SECRET_DATA
const productArr = []

axios(url)
.then(response => {
    const siteData = response.data;
    const buzz = cheerio.load(siteData)

    /*
        ================================================================
                                FOR SHOPIFY
        ================================================================
    */
    buzz('#CollectionSection .grid__item', siteData).each(function(){
            const mainUrl = process.env.SECRET_MAINURL
            const title = buzz(this).find('.grid-product__title').text()

            // URL configuration
            const slug = buzz(this).find('.grid-product__link').attr('href')
            const url = mainUrl.concat(slug)
            
            // Price configuration
            const price = buzz(this).find('.grid-product__price span').text()

            // Image configuration
            // const images = buzz(this).find('[data-srcset]').attr('src')

            productArr.push({
                title,
                url,
                price
            })
        })
    }).catch((error) => console.log('zz'))

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))