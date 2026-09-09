import { findActiveSessionUser } from "../repositories/sessionRepository.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization ?? "";

    if (!authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authorization token is required");
    }

    const token = authHeader.slice(7);
    const user = await findActiveSessionUser(token);

    if (!user) {
      res.status(401);
      throw new Error("User not found for this token");
    }

    req.user = user;
    req.sessionToken = token;

    next();
  } catch (error) {
    if (!res.statusCode || res.statusCode < 400) {
      res.status(401);
    }

    next(error);
  }
};

export default protect;
