/* eslint-disable import/extensions */
import trailService from '../services/trail.service.js';

const validTrail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const trail = await trailService.findByIdTrailService(id);

        if (!trail) {
            return res.status(400).send({ message: 'trail not found' });
        }

        req.id = id;
        req.trail = trail;

        return next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default { validTrail };
