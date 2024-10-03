const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt; // Get the token from cookies
    if (!token) return res.status(403).send('Token required');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};
