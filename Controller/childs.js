const childSchema = require("../Model/childModel");
const classSchema = require("../Model/classModel");

exports.getChilds = (req , res  ,next) => {
    childSchema.find({})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};

exports.getChildById = (req , res ,next) => {
    childSchema.findOne({ _id: req.params.id })
    .then((object)=>{
        if (!object) {
            throw new Error("Child Not Found");
        }
        res.status(200).json({ object });
    })
    .catch((error) => next(error));
};

exports.addChild = (req , res , next) => {
    let object = new childSchema(req.body);
    object
    .save()
    .then((data) => {
        res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateChild = (req , res , next) => { 
    childSchema.updateOne({
        _id:req.params.id
    },{
        $set:{
            fullName:req.body.fullName,
            email:req.body.email,
            password:req.body.password
        }
    }).then(data=>{
        if(data.matchedCount==0)
            next(new Error("Child Not Found"));
        else
            res.status(200).json({data});
    })
    .catch(error=>next(error));
};

exports.deleteChild = (req , res , next) => {
    childSchema.deleteOne({
        _id:req.params.id
    }).then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>next(error));
};