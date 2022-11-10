/* eslint-disable import/extensions */
import contentService from '../services/content.service.js';

const createContentController = async (req, res) => {
    try {
        const {
            idModule, subject, title, fileType, link, time,
        } = req.body;

        // if (!idModule || !subject || !title || !fileType || !link || !time) {
        //     return res.status(400).send({ message: 'Fill in all fields' });
        // }
        if (!subject || !title || !fileType || !link || !time) {
            return res.status(400).send({ message: 'Fill in all fields' });
        }
        const contentReq = {
            // idModule,
            subject,
            title,
            fileType,
            link,
            time,
        };

        const content = await contentService.createContentService(contentReq);

        if (!content) {
            return res.status(400).send({ message: 'Error creating content' });
        }

        return res.status(201).send({
            message: 'Content created successfully',
            content: {
                id: content.id,
                idModule,
                subject,
                title,
                fileType,
                link,
                time,
            },
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findAllContentController = async (req, res) => {
    try {
        const content = await contentService.findAllContentService();

        if (content.length === 0) {
            return res.status(400).send({
                message: 'There are no registered content',
            });
        }
        return res.send(content);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findContentBySubjectController = async (req, res) => {
    try {
        const search = req.params.subject;

        const content = await contentService.findContentBySubjectService(search);

        if (!content) {
            return res.status(400).send({ message: 'Subject not found' });
        }

        return res.send(content);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findContentByTitleController = async (req, res) => {
    try {
        const search = req.params.title;

        const content = await contentService.findContentByTitleService(search);

        if (!content) {
            return res.status(400).send({ message: 'Title not found' });
        }

        return res.send(content);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const updateContentController = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            subject, title, fileType, link, time,
        } = req.body;

        const content = await contentService.updateContentService(id, req.body);

        if (!content) {
            return res.status(400).json({ message: 'Error updating content' });
        }

        return res.send({
            message: 'Content update successfully',
            content: {
                id,
                subject,
                title,
                fileType,
                link,
                time,
            },
        });
        // return res.send({
        //     message: 'Content update successfully',
        //     content: {
        //         id: contentUpdate.id,
        //         subject: contentUpdate.subject,
        //         title: contentUpdate.title,
        //         fileType: contentUpdate.fileType,
        //         link: contentUpdate.link,
        //         time: contentUpdate.time,
        //     },
        // });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const deleteContentController = async (req, res) => {
    try {
        const { id } = req.params;

        const content = await contentService.deleteContentService(id);

        if (!content) {
            return res.status(400).json({ message: 'Error deleting content' });
        }

        return res.status(200).json({ message: 'Content deleted' });
    } catch (err) {
        console.log('entrei no erro');
        return res.status(500).json({ message: err.message });
    }
};

export default {
    createContentController,
    findAllContentController,
    findContentBySubjectController,
    findContentByTitleController,
    updateContentController,
    deleteContentController,
};
