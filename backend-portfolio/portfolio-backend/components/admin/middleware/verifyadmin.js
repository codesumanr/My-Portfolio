// components/admin/middleware/verifyadmin.js

// This is a placeholder! You need to implement actual authentication/authorization logic.
// Typically, this involves checking if req.session.user is valid and has admin privileges,
// or verifying a JWT token.

const verifyadmin = (req, res, next) => {
    console.log("Executing verifyadmin middleware..."); // Log execution

    // --- EXAMPLE: Session-based check ---
    if (req.session && req.session.user && req.session.user.isAdmin) {
        console.log("Admin verified via session:", req.session.user.username);
        return next(); // User is authenticated and is an admin, proceed
    }

    // --- EXAMPLE: Add JWT check here if using tokens ---
    // const token = req.headers.authorization?.split(' ')[1];
    // if (token) {
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         if (decoded.isAdmin) { // Check if JWT payload indicates admin
    //              req.user = decoded; // Attach user info to request object
    //              console.log("Admin verified via JWT:", decoded.username);
    //              return next();
    //         }
    //     } catch (err) {
    //         console.error("JWT verification failed:", err.message);
    //         // Fall through to unauthorized response
    //     }
    // }


    // If neither session nor token verification passed:
    console.warn("Admin verification failed.");
    return res.status(401).json({ success: false, message: "Unauthorized: Admin access required." });
};

module.exports = verifyadmin;