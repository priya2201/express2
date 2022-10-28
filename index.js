const Joi=require('@hapi/joi');
const express=require('express');
const app= express();
app.use(express.json())
const teachers=[
    {name:'sunanda',subject:'marathi'},
{name:'pinky',subject:'drawing'}]
app.get('/info',(req,res)=>{
    res.send(teachers)
})
app.get('/info/:name',(req,res)=>{
    let teacher=teachers.find(n=>n.name === req.params.name);
    if(!teacher) return res.status(400).send("The following Name of teacher is not there");
    res.send(teacher);
})
app.post('/info',(req,res)=>{
    // let{error}= validateTeacher(req.body)
    // if(error)
    //     return res.status(400).send(error.details[0].message);
        
    

let teacher={
   name:req.body.name,
   subject:req.body.subject
};
teachers.push(teacher);
res.send(teacher);
})
app.put('/info/:name',(req,res)=>{
    let teacher=teachers.find(n=>n.name === req.params.name);
    if(!teacher) return res.status(400).send("The following Name of teacher is not there");
    let{error}= validateTeacher(req.body)
    if(error)
    return res.status(400).send(error.details[0].message);
    
teacher.subject=req.body.subject;
res.send(teacher)

});
function validateTeacher(teacher){
    let schema={
        subject:Joi.string().min(3).required()
    };
    return Joi.validate(teacher,schema);
    // let schema1={
    //     subject:Joi.string().min(3).required()
    // };
    // return Joi.validate(teacher,schema1);
}

app.delete('/info/:name',(req,res)=>{
    let teacher=teachers.find(n=>n.name === req.params.name);
    if(!teacher) return res.status(400).send("The following Name of teacher is not there");
    
    const index=teachers.indexOf(teacher);
    teachers.splice(index, 1);

    res.send(teacher);
})

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server listening on port:${port}...`))


