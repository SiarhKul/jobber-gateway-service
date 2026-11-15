import { Application } from "express";
import { healthRoutes } from "./routes/health";

export const appRouts = (app: Application)=>{

app.use('', healthRoutes.routes())

}