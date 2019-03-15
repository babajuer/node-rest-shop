const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        /**
         authorization is:
         Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZiajIyQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVjOGJhYTE3ZjEzNGFhMTVlMzYyYmRhYyIsImlhdCI6MTU1MjY2NzEzMywiZXhwIjoxNTUyNjcwNzMzfQ.Nt6oVib6MnWYFBsp0pg3WfT1sLwFIaFuurLm5rDa-xA
         so need to split to get the token
         */
        const token = req.headers.authorization.split(" ")[1];
        console.log(`***** token:`, token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed middleware'
        });
    }
}