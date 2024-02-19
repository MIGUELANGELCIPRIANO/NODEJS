import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())

app.get('/', (req, res) => {
	res.send('Hello world!')
})

app.listen(3000)
console.log(`Server listening on port 3000`)
