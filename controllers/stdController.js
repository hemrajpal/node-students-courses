const db = require('../models')

exports.create = async(req, res) => {
    const {name, email} = req.body;

    const data = await db.Student.create({name: name, email: email});

    res.status(201).json({success: true, data: data, message: "Student created successfully"});
}

exports.get = async(req, res) => {

    const data = await db.Student.findAll();

    res.status(200).json({success: true, data: data});
}

exports.getSingle = async(req, res) => {

    const data = await db.Student.findByPk(req.params.id, {
        include: [
            { 
                model: db.Course, as: 'courses', 
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

    const {name, email} = req.body;

    const data = await db.Student.findByPk(req.params.id);

    if(data){
        await data.update({name, email});
        return res.status(201).json({success: true, data: data, message: 'Update success'});
    }
    
    return res.status(404).json({success: false, message: 'failed'});

}

exports.delete = async(req, res) => {

    const data = await db.Student.findByPk(req.params.id);

    if(data){
        await data.destroy();
        return res.status(201).json({success: true, message: 'Delete success'});
    }

    return res.status(404).json({success: false, message: 'failed'});

}

exports.enroll = async(req, res) => {
    try {
        const { course_ids } = req.body;
        const student = await db.Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        await student.addCourses(course_ids); 

        const data = {
            enrolledCourses: course_ids,
            student_id: req.params.id
        }

        res.status(201).json({ success: true, data: data, message: "Enrolled successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

exports.dropEnroll = async(req, res) => {
    const { studentId, courseId } = req.params;

    const student = await db.Student.findByPk(studentId);
    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    await student.removeCourse(courseId);

    res.status(200).json({ 
        success: true, 
        message: `Successfully dropped course ${courseId} for student ${studentId}` 
    });

}


