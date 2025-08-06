// middleware/authorize.js

module.exports = function permittedRoles(...roles) {
  return (req, res, next) => {
    // auth middleware (which should run before this) should set req.user
    console.log(req.user);    
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient rights' });
    }
    next();
  };
};
