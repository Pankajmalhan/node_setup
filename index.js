const { express, app, mainRouter, userRouter, morgan, helmet,
    config, port, appDebugger, dbDebugger, cors, socket, http,server } = require("./util/imports");
const multer = require('multer')();
const io=require('./socket/socket');

/*Check for the jwt environment variable */
if (!config.get("jwtPrivateKey")) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

/*Custom Middleware */
app.use(cors);
/*Custom Middleware */

/*Built in MiddleWare */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer.array());
app.use(express.static('public'))
app.use((error, req, res, next) => {
    res.status(400).send(error);
});
process.on('uncaughtException', function (err) {
    console.log(err);
    process.exit(1);
});
process.on('unhandledRejection', function (err) {
    console.log(err);
    process.exit(1);
})
/**Built in MiddleWare */

/*Third Party Middleware */
app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('dev'));
}
/*Third Party Middleware */


/*Application Routers */
app.use('/api/user', userRouter);
app.use('/api', mainRouter);
/*Application Routers */

/*Server configuration */
app.get('**', (req, res) => {
    res.status(404).send("OOPS! this end point doesn't exist");
});
server.listen(port, () => {
    console.log(`Server has been running on port ${port}`);
});
/*Server configuration */