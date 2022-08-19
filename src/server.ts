import { TwitterService } from './service/TwitterService';
import { MEAL_AND_LOCALE } from './enum/localeMenu'
import { getMenuDate } from './service/FormatMenu'
import { format } from 'date-fns'
const scheduler = require ('./service/scheduler')

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

const HOUR_AM = 0
const MINUTES_AM = 24

const HOUR_PM = 0
const MINUTES_PM = 25

const jobAlmoco = new RecurrenceJob()
  .executeJob("getInformationsPage", () => init( MEAL_AND_LOCALE.alegre.almoco))
  .every(1)
  .day()
  .hour(HOUR_AM)
  .minute(MINUTES_AM)

  const jobJantar = new RecurrenceJob()
  .executeJob("getInformationsPage", () => init( MEAL_AND_LOCALE.alegre.jantar))
  .every(1)
  .day()
  .hour(HOUR_PM)
  .minute(MINUTES_PM)


  scheduler.newJob(jobAlmoco);
  scheduler.newJob(jobJantar);