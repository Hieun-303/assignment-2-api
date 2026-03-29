const Service = require("../models/service");

const toClient = (doc) => {
const obj = doc.toObject();
obj.id = obj._id;
delete obj._id;
delete obj.__v;
return obj;
};

exports.addService = async (req, res) => {
try {
const service = await Service.create(req.body);
res.status(201).json({
    success: true,
    message: "Service added successfully.",
    data: toClient(service),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getAllServices = async (req, res) => {
try {
const services = await Service.find();
res.json({
    success: true,
    message: "Services list retrieved successfully.",
    data: services.map(toClient),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getServiceById = async (req, res) => {
try {
const service = await Service.findById(req.params.id);
if (!service)
    return res.status(404).json({ success: false, message: "Service not found." });

res.json({
    success: true,
    message: "Service retrieved successfully.",
    data: toClient(service),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.updateService = async (req, res) => {
try {
const updated = await Service.findByIdAndUpdate(req.params.id, req.body);
if (!updated)
    return res.status(404).json({ success: false, message: "Service not found." });

res.json({
    success: true,
    message: "Service updated successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.deleteService = async (req, res) => {
try {
const deleted = await Service.findByIdAndDelete(req.params.id);
if (!deleted)
    return res.status(404).json({ success: false, message: "Service not found." });

res.json({
    success: true,
    message: "Service removed successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};