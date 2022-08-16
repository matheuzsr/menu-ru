import axios from "axios"

export const getMenuXml = async (date?: string) => {
  return axios.get(`http://www.ru.alegre.ufes.br/cardapio/rss/${date}`)
}
