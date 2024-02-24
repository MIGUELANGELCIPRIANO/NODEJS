import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())

app.get('/', (req, res) => {
	res.send('Landing')
})

app.get('/setcookies', (req, res) => {
	res.cookie('Cookie name', 'My cookie!', {
		maxAge: 10000, // Maximum expiration time
		// expires: new Date('YYYY/MM/DD'), // Expiration date
		httpOnly: true, // Access via request
		secure: true, // Access via https://
		sameSite: 'lax', // 'lax' allows the cookie to be sent in some cross-site requests, while 'strict' never allows the cookie to be sent in a cross-site request
	})
	res.send('Set Cookie')
})

app.get('/getcookies', (req, res) => {
	console.log(req.cookies)
	res.send('Read cookies')
})

app.get('/deletecookies', (req, res) => {
	console.log(req.cookies)
	res.clearCookie('My cookie!')
	res.send('Cookie deleted')
})

app.listen(3000)
console.log(`Server listening on port 3000`)
