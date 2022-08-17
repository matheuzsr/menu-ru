import express from 'express'

const app = express();

app.get("/", (_, res) => {
  return res.json({ message: "Tudo ok!😎" });
})

app.listen(3000);
