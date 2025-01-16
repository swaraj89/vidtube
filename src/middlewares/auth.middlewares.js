import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw new ApiError(401, "Unauthorized");
      }

      const user = await User.findById(decoded.id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(404, "Unauthorized");
      }

      req.user = user;

      next();
    });
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized");
  }
});
