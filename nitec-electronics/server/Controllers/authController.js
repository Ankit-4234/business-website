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
    return errorResponse;
  }
};
