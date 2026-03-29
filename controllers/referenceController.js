const Reference = require("../models/reference");

const toClient = (doc) => {
const obj = doc.toObject();
obj.id = obj._id;
delete obj._id;
delete obj.__v;
return obj;
};

exports.addReference = async (req, res) => {
try {
const reference = await Reference.create(req.body);
res.status(201).json({
    success: true,
    message: "Reference added successfully.",
    data: toClient(reference),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getAllReferences = async (req, res) => {
try {
const references = await Reference.find();
res.json({
    success: true,
    message: "References list retrieved successfully.",
    data: references.map(toClient),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getReferenceById = async (req, res) => {
try {
const reference = await Reference.findById(req.params.id);
if (!reference) {
    return res.status(404).json({
    success: false,
    message: "Reference not found.",
    });
}

res.json({
    success: true,
    message: "Reference retrieved successfully.",
    data: toClient(reference),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.updateReference = async (req, res) => {
try {
const updated = await Reference.findByIdAndUpdate(req.params.id, req.body);
if (!updated) {
    return res.status(404).json({
    success: false,
    message: "Reference not found.",
    });
}

res.json({
    success: true,
    message: "Reference updated successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.deleteReference = async (req, res) => {
try {
const deleted = await Reference.findByIdAndDelete(req.params.id);
if (!deleted) {
    return res.status(404).json({
    success: false,
    message: "Reference not found.",
    });
}

res.json({
    success: true,
    message: "Reference removed successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};