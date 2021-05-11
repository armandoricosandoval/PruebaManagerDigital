const { TASKCLUSTER } = require('ci-info');
const express = require('express');
const router = express.Router();
const Client = require('../models/schemes')

router.get('/',async (req,res)=>{
    const clients= await Client.find()   
    res.json(clients)
});

router.get('/:id',async (req,res)=>{
    const clientOne = await Client.findById(req.params.id) 
    res.json(clientOne)
});

router.post('/', async (req,res)=>{
    const {name,cedula,phone,dir}=req.body
    const client= new Client({name,cedula,phone,dir})
    await client.save()    
    res.json({status:'client save'})
})


router.put('/:id', async (req,res)=>{    
    const {name,cedula,phone,dir}=req.body
    const newClient={name,cedula,phone,dir}    
    await Client.findByIdAndUpdate(req.params.id,newClient)      
    res.json({status:'client update'})
})


router.delete('/:id', async (req,res)=>{ 
    await Client.findByIdAndRemove(req.params.id)      
    res.json({status:'client delete'})
})


module.exports = router