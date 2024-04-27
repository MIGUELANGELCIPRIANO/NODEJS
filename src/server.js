import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/postmite', (req, res) => {
	res.cookie('Mite', 'Skrelv', {
		maxAge: 10000, // Maximum expiration time
		// expires: new Date('YYYY/MM/DD'), // Expiration date
		httpOnly: true, // Access via request
		secure: true, // Important to activate access through https:// in production
		sameSite: 'lax', // 'lax' allows the cookie to be sent in some cross-site requests, while 'strict' never allows the cookie to be sent in a cross-site request
	})
	res.json({ message: 'Mite successfully created!' })
	console.log('Mite successfully created!')
})

app.get('/getmite', (req, res) => {
	res.send(req.cookies)
	console.log(req.cookies)
})

app.get('/deletemite', (req, res) => {
	if (req.cookies.Mite) {
		res.clearCookie('Mite')
		res.json({ message: 'Mite successfully deleted' })
		console.log('Mite successfully deleted')
	} else {
		res.json({ message: 'No mites found to delete' })
		console.log('No mites found to delete')
	}
})

app.listen(3000)
console.log(`Server listening on port 3000`)
