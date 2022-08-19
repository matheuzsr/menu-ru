import express from 'express'

const app = express();

app.get("/", (_, res) => {
  return res.json({ message: "Tudo ok!😎", date: new Date() });
})

app.listen(process.env.PORT);
