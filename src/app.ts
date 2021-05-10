import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import { container } from '../config/inversify'
import * as type from '../config/types'
import { HttpMethods } from './domain/entity/request/HttpMethods'
import { BaseRoute } from './infra/routes/impl/BaseRoute'
import { IRoute } from './infra/routes/IRoute'
import express from 'express'
import mongoose from 'mongoose'
import { BaseException } from './domain/entity/exceptions/BaseException'
import helmet from 'helmet'
import cors from 'cors'

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`)

const routes = container.getAll<BaseRoute<unknown>>(type.IRoute)
const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
for(const route of routes){
	const expressHandler = async(req:express.Request, res:express.Response, next:express.NextFunction) => {
		try{
			route.prepareRequest(req.body,req.query,req.params)
			for(const middleware of route.middlewares){
				middleware.execute(route.request)	
			}
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
app.use((err:any, req:express.Request,res:express.Response,next:express.NextFunction)=>{
	console.log(err)
	try{
		return res.status(err.statusCode).send(err.body)
	}catch(error){
		return res.status(500).send({
			status:500,
			message:'Internal Server error'
		})
	}
})

app.listen(8080,()=>{
	console.log('App running!')
})
