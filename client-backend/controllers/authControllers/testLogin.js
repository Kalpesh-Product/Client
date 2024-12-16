const User = require("../../models/User"); // Adjust path as needed

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email }).populate("role", "roleTitle modulePermissions");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify the password directly
        if (password !== "123") {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Exclude sensitive data like password from the response
        const { password: _, ...userWithoutPassword } = user._doc;

        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { login };
