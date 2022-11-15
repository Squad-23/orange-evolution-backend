import userService from "../services/user.service.js";
import trailService from "../services/trail.service.js";
import moduleService from "../services/module.service.js";

const subscribeUserInTrail = async (req, res) => {
    try {
        const { id } = req.params;
        const { idTrail } = req.body;

        if (!idTrail) {
            return res.status(400).json({ message: "Trail Id is missing" });
        }

        const user = await userService.findByIdUserService(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const trail = await trailService.findByIdTrailService(idTrail);

        if (!trail) {
            return res.status(404).json({ message: "Trail not found" });
        }

        user.trails.push(idTrail);
        const response = await userService.updateUserService(user.id, user);

        return res.status(200).json({
            message: "User subscribed successfully",
            trail,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getUserSubscribedTrails = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userService.getUserSubscribedTrails(id);

        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        }

        const trails = await Promise.all(
            user.trails.map(async (trail) => {
                if (trail) {
                    let modules =
                        await moduleService.findByTrailIdModuleService(
                            trail._id
                        );

                    modules = modules.map((module) => {
                        let subjects;

                        // Getting distincts subjects
                        subjects = Array.from(
                            new Set(
                                module.contents.map(
                                    (content) => content.subject
                                )
                            )
                        );

                        // Returning subjects as Objects
                        subjects = subjects.map((subject) => {
                            if (subject) {
                                const contents = module.contents
                                    .filter(
                                        (content) => content.subject === subject
                                    )
                                    .map((content) => ({
                                        id: content._id,
                                        subject: content.subject,
                                        title: content.title,
                                        fileType: content.fileType,
                                        link: content.link,
                                        time: content.time,
                                        completed: user.completeds.includes(
                                            content._id
                                        ),
                                    }));

                                const completeds = contents.filter(
                                    (content) => content.completed
                                );

                                return {
                                    title: subject,
                                    progress: {
                                        max: contents.length,
                                        completed: completeds.length,
                                    },
                                    contents,
                                };
                            }
                        });

                        return {
                            id: module._id,
                            title: module.title,
                            description: module.description,
                            imageURL: module.imageURL,
                            progress: {
                                max: subjects.length,
                                completed: subjects.filter(
                                    ({ progress }) =>
                                        progress.max &&
                                        progress.completed === progress.max
                                ).length,
                            },
                            subjects,
                        };
                    });

                    return {
                        id: trail._id,
                        title: trail.title,
                        area: trail.area,
                        description: trail.description,
                        duration: trail.duration,
                        progress: {
                            max: modules.length,
                            completed: modules.filter(
                                ({ progress }) =>
                                    progress.max &&
                                    progress.completed === progress.max
                            ).length,
                        },
                        modules,
                    };
                }
            })
        );

        res.json({
            name: user.name,
            email: user.email,
            password: user.password,
            completeds: user.completeds,
            thisADM: user.thisADM,
            trails,
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default {
    subscribeUserInTrail,
    getUserSubscribedTrails,
};
