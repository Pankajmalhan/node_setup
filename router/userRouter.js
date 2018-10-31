var router=require('express').Router();

router.get('/',(req,res)=>{
    res.status(200).send({
        data:'Request Getted successfully'
    })
});

router.post('/',(req,res)=>{
    console.log(req.body);
    res.status(200).send({
        data:'Request Posted successfully'
    })
});

router.delete('/',(req,res)=>{
    res.status(200).send({
        data:'Request Deleted successfully'
    })
});

module.exports=router;