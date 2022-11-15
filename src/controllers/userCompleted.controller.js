import userService from "../services/user.service.js";
import trailService from "../services/trail.service.js";
import moduleService from "../services/module.service.js";

const toggleContentCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        const { idContent } = req.body;

        if (!idContent) {
            return res.status(400).json({ message: "Content Id is missing" });
        }

        const user = await userService.findByIdUserService(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.completeds.includes(idContent)) {
            user.completeds.push(idContent);
            await userService.updateUserService(user.id, user);

            return res.status(200).json({
                message: "Content marked as completed",
            });
        } else {
            user.completeds.pull(idContent);
            await userService.updateUserService(user.id, user);

            return res.status(200).json({
                message: "Content dismarked as completed",
            });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export default {
    toggleContentCompleted,
};
