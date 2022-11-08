/* eslint-disable import/extensions */
import trailService from '../services/trail.service.js';

const createTrailController = async (req, res) => {
    try {
        const {
            title, area, description,
        } = req.body;

        if (!title || !area || !description) {
            return res.status(400).send({ message: 'Fill in all fields' });
        }

        const trailRes = {
            title,
            area,
            description,
            duration: 0,
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
                duration: 0,
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
        const { trail } = req;

        const trailUpdate = {
            id: trail.id,
            title: !req.body.title ? trail.title : req.body.title,
            area: !req.body.area ? trail.area : req.body.area,
            description: !req.body.description ? trail.description : req.body.description,
            duration: trail.duration,
        };

        await trailService.updateTrailService(trailUpdate);

        return res.send({
            message: 'trail update successfully',
            trail: {
                id: trailUpdate.id,
                title: trailUpdate.title,
                area: trailUpdate.area,
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
    findTrailByAreaController,
    updateTrailController,
    deleteTrailController,
};
