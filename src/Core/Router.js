import routes from '../../routes';
import nodeUrl from 'url'
import {resource} from '../../config.js';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types'
import Validator from './Validator';

class Router {
    constructor(app) {
        this.app = app;
    }

    dispatch(request) {
        const response = this.app.container.get('response')

        if ((resource.resourceFiles).test(request.url)) {
            const filePath = path.join(resource.resourcePath, request.url)

            return new Promise((resolve, reject) => fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(err)
                    return reject(err)
                }

                response.writeHead(200, {
                    'Content-Type': mime.lookup(filePath),
                    'Content-Length': stats.size
                });
                const readStream = fs.createReadStream(filePath);

                resolve(readStream.pipe(response));
            }))
        } else {
            const { method, url } = request
            const urlParams = nodeUrl.parse(url, true);
            request.query = urlParams.query

            const { pathname } = urlParams

            const dispatcher = routes.filter((route) => {
                return route.path === pathname && route.method === method
            }).pop();

            return new Promise(async (resolve, reject) => {
                const buffers = [];
                try {
                    const controller = new dispatcher.controller(this.app);
                    for await (const chunk of request) {
                        buffers.push(chunk);
                    }

                    const data = Buffer.concat(buffers).toString();

                    request.params = data && JSON.parse(data)

                    if (dispatcher.validator){
                        request.validated = Validator.apply(this.app, [request, dispatcher.validator()])
                    }

                    if(dispatcher.middleware) {
                        resolve(dispatcher.middleware(request, response, (request) => controller[dispatcher.action](request)))
                        return
                    }

                    resolve(controller[dispatcher.action](request));
                }catch (e) {
                    reject(e)
                }
            });
        }
    }
}

export default Router