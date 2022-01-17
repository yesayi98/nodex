import http from 'http';
import App from './src/Core/App';
import fs from 'fs';
import path from 'path';
import {resource} from "./config";

const runServer = () => {
    console.log('Starting Server...')
    const server = http.createServer((request, response) => {
        try {
            if ((resource.resourceFiles).test(request.url)) {
                const filePath = path.join(resource.resourcePath, request.url)

                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    response.writeHead(200, {
                        'Content-Type': stats.type,
                        'Content-Length': stats.size
                    });
                    const readStream = fs.createReadStream(filePath);

                    readStream.pipe(response);
                })
            } else {
                const app = App.getInstance();

                response.write(app.start(request) ?? 'nothing to show')
            }
        } catch (e) {
            console.log(e.message)
            response.write(e)
        }

        response.end();
    })
    const port = process.env.PORT ?? 8080;

    server.listen(port, () => {
        console.log(`Server running at port ${port}`)
    })

    server.timeout = process.env.TIMEOUT ?? 10000
}

export default runServer