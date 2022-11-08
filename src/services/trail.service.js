/* eslint-disable import/extensions */
import Trail from '../models/Trail.js';

const createTrailService = (body) => Trail.create(body);

const findAllTrailService = () => Trail.find();

const findByIdTrailService = (idTrail) => Trail.findById(idTrail);

const findByAreaTrailService = (area) => Trail.find({ area });

const findByTitleTrailService = (title) => Trail.findOne({ title });

const updateTrailService = (trail) => Trail.updateOne(trail);

const deleteTrailService = (id) => Trail.findByIdAndDelete({ _id: id });

export default {
    findByAreaTrailService,
    findByTitleTrailService,
    createTrailService,
    findAllTrailService,
    findByIdTrailService,
    updateTrailService,
    deleteTrailService,
};
