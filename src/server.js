import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/postcookie', (req, res) => {
	res.cookie('NodeJS-Cookie', 'MyFirstCookie!', {
		maxAge: 10000, // Maximum expiration time
		// expires: new Date('YYYY/MM/DD'), // Expiration date
		httpOnly: true, // Access via request
		secure: true, // Important to activate access through https:// in production
		sameSite: 'lax', // 'lax' allows the cookie to be sent in some cross-site requests, while 'strict' never allows the cookie to be sent in a cross-site request
	})
	res.json({ message: 'Cookie set successfully' })
	console.log('Cookie set successfully')
})

app.get('/getcookie', (req, res) => {
	res.send(req.cookies)
	console.log(req.cookies)
})

app.get('/deletecookie', (req, res) => {
	res.clearCookie('NodeJS-Cookie')
	res.json({ message: 'Cookie successfully deleted' })
	console.log('Cookie successfully deleted')
})

app.listen(3000)
console.log(`Server listening on port 3000`)
