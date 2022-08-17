export const separateText = (texto: string) => {
  const labels = [
    "Entrada",
    "Prato Proteico",
    "Opção",
    "Acompanhamento",
    "Guarnição",
    "Sobremesa",
  ]

  const getDelimiters = (string: string, text: string) => {
    const initiator = text.search(string)
    const end = initiator + string.length
    return [initiator, end]
  }

  const delimitadores: any[] = labels?.map((label) => {
    return getDelimiters(label, texto)
  })

  function getLabelText(texto:string, delimitador1: any, delimitador2 = []) {
    return texto.slice(delimitador1[1], delimitador2[0]).split("\n").join("")
  }

  if(!delimitadores) {
    return {}
  }
  
  return {
    entrada: getLabelText(texto, delimitadores[0], delimitadores[1]),
    pratoPrincipal: getLabelText(texto, delimitadores[1], delimitadores[2]),
    opcao: getLabelText(texto, delimitadores[2], delimitadores[3]),
    acompanhamento: getLabelText(texto, delimitadores[3], delimitadores[4]),
    guarnicao: getLabelText(texto, delimitadores[4], delimitadores[5]),
    sobremesa: getLabelText(texto, delimitadores[5], delimitadores[6]).split('*')[0],
  }
}