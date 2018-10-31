const { express, app, mainRouter,userRouter,morgan,helmet,
        config,port,appDebugger,dbDebugger}=require("./util/imports");

/*Built in MiddleWare */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use((error,req, res,next) => {
    res.status(400).send(error);
});
process.on('uncaughtException', function (err) {
    console.log(err);
});
/**Built in MiddleWare */

/*Third Party Middleware */
app.use(helmet());
if(app.get('env')==='development'){
    app.use(morgan('dev'));
    appDebugger("this is pankaj Kumar choudhary");
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
app.listen(port, () => {
    console.log(`Server has been running on port ${port}`);
});
/*Server configuration */