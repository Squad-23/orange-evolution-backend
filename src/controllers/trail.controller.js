import trailService from '../services/trail.service.js';
import moduleService from '../services/module.service.js';
import contentService from '../services/content.service.js';

const createTrailController = async (req, res) => {
    try {
        const {
            title, area, description, duration
        } = req.body;

        if (!title || !area || !description) {
            return res.status(400).send({ message: 'Fill in all fields' });
        }

        const trailRes = {
            title,
            area,
            description,
            duration
        };

        const trail = await trailService.createTrailService(trailRes);

        if (!trail) {
            return res.status(400).send({ message: 'Error creating trail' });
        }

        return res.status(201).send({
            message: 'Trail created successfully',
            trail: {
                id: trail.id,
                title,
                area,
                description,
                duration
            },
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findAllTrailController = async (req, res) => {
    try {
        const trails = await trailService.findAllTrailService();

        if (trails.length === 0) {
            return res.status(400).send({
                message: 'There are no registered trails',
            });
        }
        return res.send(trails);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findTrailByIdController = async (req, res) => {
    try {
        return res.send(req.trail);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findTrailByIdWithRelationsController = async (req, res) => {
    try {
        const { id } = req.params;

        const trail = await trailService.findByIdTrailService(id);

        if(!trail) {
            res.status(404).json({
                message: "Trail not found"
            })
        }

        let modules = await moduleService.findByTrailIdModuleService(id);

        modules = modules.map(module => {
            let subjects;

            // Getting distincts subjects
            subjects = Array.from(new Set(module.contents.map(content => content.subject)));

            subjects = subjects.map(subject => {
                if (subject) {
                    return {
                        title: subject,
                        contents: module.contents.filter(content => content.subject === subject)
                    }
                }
            })

            console.log(subjects)

            return ({
                title: module.title,
                description: module.description,
                imageURL: module.imageURL,
                subjects,
            })
        })

        res.json({
            _id:  trail._id,
            area:  trail.area,
            description:  trail.description,
            duration:  trail.duration,
            modules
        });

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findTrailByTitleController = async (req, res) => {
    try {
        const { title } = req.params;

        const trail = await trailService.findByTitleTrailService(title);

        if (!trail) {
            return res.status(400).send({ message: 'Incorrect data' });
        }

        return res.send(trail);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findTrailByAreaController = async (req, res) => {
    try {
        const { area } = req.params;

        const trail = await trailService.findByAreaTrailService(area);

        if (!trail) {
            return res.status(400).send({ message: 'Incorrect data' });
        }

        return res.send(trail);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const updateTrailController = async (req, res) => {
    try {
        const { id } = req.params;
        const { trail } = req;

        const trailUpdate = {
            id: trail.id,
            title: !req.body.title ? trail.title : req.body.title,
            area: !req.body.area ? trail.area : req.body.area,
            description: !req.body.description ? trail.description : req.body.description,
            duration: trail.duration ? trail.duration : req.body.duration,
        };

        await trailService.updateTrailService(id, req.body);

        return res.send({
            message: 'trail update successfully',
            trail: {
                id: trailUpdate.id,
                title: trailUpdate.title,
                area: trailUpdate.area,
                description: trailUpdate.description,
                duration: trailUpdate.duration,
            },
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const deleteTrailController = async (req, res) => {
    try {
        await trailService.deleteTrailService(req.id);
        return res.status(204).send({ message: 'Trail deleted' });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default {
    createTrailController,
    findAllTrailController,
    findTrailByIdController,
    findTrailByTitleController,
    findTrailByIdWithRelationsController,
    findTrailByAreaController,
    updateTrailController,
    deleteTrailController,
};
