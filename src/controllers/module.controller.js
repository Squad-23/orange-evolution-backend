import moduleService from '../services/module.service.js';

const createModuleController = async (req, res) => {
    try {
        const { idTrail } = req.params;
        const { title, description, imageURL } = req.body;

        if (!title || !idTrail) {
            return res.status(400).json({ message: 'Fill in all fields' });
        }

        const moduleReq = {
            title,
            description,
            imageURL,
            idTrail
        };

        const module = await moduleService.createModuleService(moduleReq);

        if (!module) {
            return res.status(400).json({ message: 'Error creating module' });
        }

        return res.status(201).json({
            message: 'Module created successfully',
            module: {
                id: module.id,
                title,
                description,
                imageURL,
                idTrail
            },
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const findByTrailIdModuleService = async (req, res) => {
    try {
        const { idTrail } = req.params;

        const modules = await moduleService.findByTrailIdModuleService(idTrail);

        if (modules.length === 0) {
            return res.status(400).json({
                message: 'There are no registered modules in this Trail',
            });
        }
        return res.json(modules);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const findByIdModuleService = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await moduleService.findByIdModuleService(id);

        if (!module) {
            return res.status(404).json({
                message: 'There are no registered module with this id',
            });
        }
        return res.json(module);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateModuleController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imageURL } = req.body;

        const module = await moduleService.updateModuleService(id, req.body);

        if (!module) {
            return res.status(400).json({ message: 'Error Updating module' });
        }

        return res.json({
            message: 'Module update successfully',
            module: {
                id,
                title,
                description,
                imageURL
            },
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteModuleController = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await moduleService.deleteModuleService(id);

        if (!module) {
            console.log(module);
            return res.status(400).json({ message: 'Error deleting module' });
        }

        return res.status(200).json({ message: 'Module deleted' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export default {
    createModuleController,
    findByTrailIdModuleService,
    findByIdModuleService,
    updateModuleController,
    deleteModuleController
};
