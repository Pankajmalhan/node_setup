var router=require('express').Router();

router.get('/categoryList',(req,res,next)=>{
    res.status(200).send({
        statusCode:200,
        data:[{
            id:1,name:'School',
            id:2,name:'pankaj'
        }],
        errorMessgae:{},
    })
})

module.exports=router;