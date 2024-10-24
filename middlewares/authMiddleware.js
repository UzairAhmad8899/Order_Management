import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log("Token", token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access from auth' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Invalid token from auth', error: error.message });
        }

        req.user = decoded;
        next();
    });
};

export const authorize = (roles) => {
    return (req, res, next) => {
        const { role_id } = req.user;
        if (!roles.includes(role_id)) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
        }
        next();
    };
};

