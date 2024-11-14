import http from 'http'
import compression from 'http-compression'
import { handler } from './build/handler.js'

const compress = compression()

console.log('listening on port 80 ...')

http
  .createServer((req, res) => {
    if (req.url === '/health') {
        // Health check endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ok' }))
        return
    }
    compress(req, res, () => {
      handler(req, res, err => {
        if (err) {
          res.writeHead(500)
          res.end(err.toString())
        } else {
          res.writeHead(404)
          res.end()
        }
      })
    })
})
.listen(80)