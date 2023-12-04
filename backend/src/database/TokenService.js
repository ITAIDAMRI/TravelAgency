import jwt from "jsonwebtoken";

/* 
    Create an auth token for the object, 
    Expiration in 2h
    NOTE: for tokenization, a random string is given ("abcd")
*/
export const createToken = async (requestObject) => {
	return jwt.sign(requestObject, "abcd", { expiresIn: "2h" });
};
