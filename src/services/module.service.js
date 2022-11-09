import Module from '../models/Module.js';

const createModuleService = (body) => Module.create(body);

const findByTrailIdModuleService = (idTrail) => Module.find({ idTrail });

const findByIdModuleService = (id) => Module.findById(id);

const updateModuleService = (id, data) => Module.findByIdAndUpdate(id, data);

const deleteModuleService = (id) => Module.findByIdAndDelete(id);

export default {
    createModuleService,
    findByTrailIdModuleService,
    findByIdModuleService,
    updateModuleService,
    deleteModuleService,
};
