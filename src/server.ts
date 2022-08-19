import { TwitterService } from './service/TwitterService';
import { MEAL_AND_LOCALE } from './enum/localeMenu'
import { getMenuDate } from './service/FormatMenu'
import { format } from 'date-fns'
const scheduler = require ('./service/scheduler/index')

const { RecurrenceJob } = scheduler;

const init = async (period = MEAL_AND_LOCALE.alegre.almoco) => {
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
  } catch (error) {
    console.error('Não foi possível buscar o cardápio de hoje!😢🍽️\nConsulte o site: https://ru.alegre.ufes.br/cardapio/')
  }
}

const HOUR = 0
const MINUTES = 10
const job = new RecurrenceJob()
  .executeJob("getInformationsPage", init())
  .every(1)
  .day()
  .hour(HOUR)
  .minute(MINUTES)


  scheduler.newJob(job);