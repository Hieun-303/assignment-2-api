const User = require("../models/user");

const toClient = (doc) => {
const obj = doc.toObject();
obj.id = obj._id;
delete obj._id;
delete obj.__v;
return obj;
};

exports.addUser = async (req, res) => {
try {
const user = await User.create({
    ...req.body,
    created: new Date(),
    updated: new Date(),
});

res.status(201).json({
    success: true,
    message: "User added successfully.",
    data: toClient(user),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getAllUsers = async (req, res) => {
try {
const users = await User.find();
res.json({
    success: true,
    message: "Users list retrieved successfully.",
    data: users.map(toClient),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.getUserById = async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) {
    return res.status(404).json({
    success: false,
    message: "User not found.",
    });
}

res.json({
    success: true,
    message: "User retrieved successfully.",
    data: toClient(user),
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.updateUser = async (req, res) => {
try {
const updated = await User.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updated: new Date(),
});

if (!updated) {
    return res.status(404).json({
    success: false,
    message: "User not found.",
    });
}

res.json({
    success: true,
    message: "User updated successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};

exports.deleteUser = async (req, res) => {
try {
const deleted = await User.findByIdAndDelete(req.params.id);
if (!deleted) {
    return res.status(404).json({
    success: false,
    message: "User not found.",
    });
}

res.json({
    success: true,
    message: "User removed successfully.",
});
} catch (err) {
res.status(500).json({ success: false, message: err.message });
}
};