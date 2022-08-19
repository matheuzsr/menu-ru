import TwitterApi from 'twitter-api-v2'

export class TwitterService {

  public async sendMessage(message: string) {
    const requestClient = new TwitterApi({
      appKey: process.env.CONSUMER_KEY as string,
      appSecret: process.env.CONSUMER_SECRET as string,
      accessToken: process.env.ACCESS_TOKEN as string,
      accessSecret: process.env.ACCESS_TOKEN_SECRET as string,
     })

     requestClient.appLogin()

      try {
        await requestClient.v2.post('tweets', { text: message })
      } catch (error) {
        console.error(`{function: sendMessage | service:TwitterService} Não publicar o twit`)
      }  
    }
}
