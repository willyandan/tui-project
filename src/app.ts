import 'reflect-metadata'
import { container } from '../config/inversify'
import * as type from '../config/types'
import { HttpMethods } from './domain/entity/request/HttpMethods'
import { BaseRoute } from './infra/routes/impl/BaseRoute'
import { IRoute } from './infra/routes/IRoute'
import express from 'express'
import mongoose from 'mongoose'

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`)

const routes = container.getAll<BaseRoute<unknown, unknown>>(type.IRoute)
const app = express()
app.use(express.json())
for(const route of routes){
	const expressHandler = async(req:express.Request, res:express.Response, next:express.NextFunction) => {
		try{
			route.parseRequest(req.query, req.body, req.params)
			route.validate()
			const response = await route.execute()
			res.status(response.statusCode).send(response.body)
		}catch(err){
			next(err)
		}
		
	}

	switch(route.method){
		case HttpMethods.GET:
			app.get(route.path,expressHandler)
			break
		case HttpMethods.POST:
			app.post(route.path,expressHandler)
		default:
			break

	}
}

app.listen(8080)
