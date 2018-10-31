const express = require("express");
const app = express();
const mainRouter = require('../router/mainRouter');
const userRouter = require('../router/userRouter');
const morgan=require("morgan");
const helmet=require("helmet");
const config=require("config");
const debug=require("debug");
const appDebugger=debug("app:appDebugger");
const dbDebugger=debug("app:dbDebugger");
/*To enable the debugger set the DEBUG variable in environment 
like set DEBUG=app:* or set DEBUG=app:dbDebugger */

const port = process.env.PORT || 3000;

module.exports={
    express,
    app,
    mainRouter,
    userRouter,
    morgan,
    helmet,
    config,
    appDebugger,
    dbDebugger,
    port
}