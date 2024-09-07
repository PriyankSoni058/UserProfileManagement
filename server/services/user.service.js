const usersModel = require("../models/user.model");
class users {
  async add(req, res) {
    try {
      const { firstName, lastName, userName, email, bio } = req.body;
      const userPayload = {
        firstName,
        lastName,
        userName,
        email,
        bio,
      };

      if (req.file) {
        const proPic = req.file.filename;
        userPayload.proPic = proPic;
      }
      const users = await usersModel.create(userPayload);
      return res
        .status(200)
        .json({ message: "User added successfully", data: users });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", data: {} });
    }
  }
  async list(req, res) {
    try {
      const users = await usersModel.find({});
      return res
        .status(200)
        .json({ message: "Users fetched successfully", data: users });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", data: {} });
    }
  }

  async details(req, res) {
    try {
      const userId = req.params.id;
      const users = await usersModel.find({ _id: userId });
      return res
        .status(200)
        .json({ message: "User details fetched successfully", data: users });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", data: {} });
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.id;
      const updates = {};

      // List of fields to update if they exist in the request body
      const fields = ["firstName", "lastName", "userName", "email", "bio"];

      fields.forEach((field) => {
        if (req.body[field]) {
          updates[field] = req.body[field];
        }
      });

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No valid fields to update." });
      }

      if (req.file) {
        const proPic = req.file.filename;
        updates.proPic = proPic;
      }

      const updatedUser = await usersModel.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }
      return res
        .status(200)
        .json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", data: {} });
    }
  }
}

module.exports = new users();
