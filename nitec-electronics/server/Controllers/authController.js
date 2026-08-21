import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, "User already exists with this username");
    }
    const user = await User.create({ name, email, phone, password });
    return successResponse(res, 201, "Account created successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: "Admin" });
    if (user && (await user.matchPassword(password))) {
      return successResponse(res, 200, "Admin login successful", {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }
    return errorResponse(res, 401, "Invalid email or password");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: "Admin" });
    if (user && (await user.matchPassword(password))) {
      return successResponse(res, 200, "Admin login successful", {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }
    return errorResponse(res, 401, "Invalid admin credentials");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return errorResponse(res, 404, "User not found");
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    if (req.body.address)
      user.address = { ...user.address, ...req.body.address };
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();
    return successResponse(res, 200, "Profile updated", {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
