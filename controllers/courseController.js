const db = require('../models')

exports.create = async(req, res) => {
    const {title, description, duration} = req.body;

    const data = await db.Course.create({title, description, duration});

    res.status(201).json({success: true, data: data, message: "Create successful"});
}

exports.get = async(req, res) => {

    const data = await db.Course.findAll();

    res.status(200).json({success: true, data: data});
}

exports.getSingle = async(req, res) => {

    const data = await db.Course.findByPk(req.params.id, {
        include: [
            { 
                model: db.Student, as: 'students', 
                through: { 
                    attributes: [] 
                } 
            },
        ]
    });

    if(!data){
        res.status(404).json({success: false, message: "not found"});
    }

    res.status(200).json({success: true, data: data});
}

exports.update = async(req, res) => {

    const {title, description, duration} = req.body;

    const data = await db.Course.findByPk(req.params.id);

    if(data){
        await data.update({title, description, duration});
        return res.status(201).json({success: true, data: data, message: 'Update success'});
    }
    
    return res.status(404).json({success: false, message: 'failed'});

}

exports.delete = async(req, res) => {

    const data = await db.Course.findByPk(req.params.id);

    if(data){
        await data.destroy();
        return res.status(201).json({success: true, message: 'Delete success'});
    }

    return res.status(404).json({success: false, message: 'failed'});

}


