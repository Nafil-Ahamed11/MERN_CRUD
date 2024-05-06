const isAdminLoggedIn = (req, res, next) => {
    try {
        const isAdminLoggedIn = req.session.isAdminLoggedIn;
        if (isAdminLoggedIn) {
            next();
        } else {
            res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { isAdminLoggedIn };

