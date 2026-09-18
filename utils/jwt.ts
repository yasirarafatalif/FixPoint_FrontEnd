import jwt from "jsonwebtoken";

const verifyToken = (token :string,screct: string )=>{
    const userToken= jwt.verify(token, screct)
    return userToken;

};

export const jwtUtils = {
  verifyToken,
};
