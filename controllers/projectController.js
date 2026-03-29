const Project = require("../models/project");

const toClient = (doc) => {
const obj = doc.toObject();
obj.id = obj._id;
delete obj._id;
delete obj.__v;
return obj;
};

exports.addProject = async (req, res) => {
try {
const project = await Project.create(req.body);
res.status(201).json({
    success: true,
    message: "Project added successfully.",
    data: toClient(project),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getAllProjects = async (req, res) => {
try {
const projects = await Project.find();
res.json({
    success: true,
    message: "Projects list retrieved successfully.",
    data: projects.map(toClient),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getProjectById = async (req, res) => {
try {
const project = await Project.findById(req.params.id);
if (!project) {
    return res.status(404).json({
    success: false,
    message: "Project not found.",
    });
}

res.json({
    success: true,
    message: "Project retrieved successfully.",
    data: toClient(project),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.updateProject = async (req, res) => {
try {
const updated = await Project.findByIdAndUpdate(req.params.id, req.body);
if (!updated) {
    return res.status(404).json({
    success: false,
    message: "Project not found.",
    });
}

res.json({
    success: true,
    message: "Project updated successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.deleteProject = async (req, res) => {
try {
const deleted = await Project.findByIdAndDelete(req.params.id);
if (!deleted) {
    return res.status(404).json({
    success: false,
    message: "Project not found.",
    });
}

res.json({
    success: true,
    message: "Project removed successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};