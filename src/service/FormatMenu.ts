import convert from 'xml-js'
import { getMenuXml } from '../service/InformationRSS'
import { separateText } from '../utils/separateWordsMenu'

const getMenuBySlug = (mealAndLocale: string, menuJson: { rss: { channel: { item: any[] } } }): { description: string, date: string} => {
  const item = menuJson
  .rss
  .channel
  .item
  .find((item: { title: { _text: string } }) => item.title._text === mealAndLocale)

  return {
    description: item.description._text,
    date: item.pubDate._text,
  }
}


export const getMenuDate = async (mealAndLocale: string, date?: string) => {
  try {
    const response = await getMenuXml(date)
    const config = convert.xml2json(response.data, { compact: true, spaces: 2 })
    const menuJson = JSON.parse(config)
  
    const menuDescription = getMenuBySlug(mealAndLocale, menuJson)
    
    return { menu: separateText(menuDescription.description), date: menuDescription?.date }
  
    
  } catch (error) {
    console.error(`{function: getMenuDate | service:FormatMenu} Não foi possível pegar a refeição ${date} - ${mealAndLocale}`)
  }
}
