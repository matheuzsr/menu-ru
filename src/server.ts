import { TwitterService } from './service/TwitterService';
import { MEAL_AND_LOCALE } from './enum/localeMenu'
import { getMenuDate } from './service/FormatMenu'
import { format } from 'date-fns'
import './routes'

const init = async () => {
  const period = MEAL_AND_LOCALE.alegre.jantar
  const dateFormatted = format(new Date(), 'yyyy-MM-dd')

  const menuInformation = await getMenuDate(period, dateFormatted)
  const twitterService = new TwitterService()
  try {

    if(!menuInformation) {
      twitterService.sendMessage(`
      Não foi possível buscar o cardápio de hoje!😢🍽️\nConsulte o site: https://ru.alegre.ufes.br/cardapio/
      `)
      return
    }

    const response = await twitterService.sendMessage(`
    ${period} - ${menuInformation?.date}\n
Entrada:
${menuInformation?.menu.entrada}\n
Prato Proteico:
  ${menuInformation?.menu.pratoPrincipal}\n
Opção:
  ${menuInformation?.menu.opcao}\n
Acompanhamento:
  ${menuInformation?.menu.acompanhamento}\n
Guarnição:
  ${menuInformation?.menu.guarnicao}\n
Sobremesa:
  ${menuInformation?.menu.sobremesa}`)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

init()