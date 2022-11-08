/* eslint-disable import/extensions */
import contentService from '../services/content.service.js';

const createContentController = async (req, res) => {
    try {
        const {
            subject, title, fileType, link, time,
        } = req.body;

        if (!subject || !title || !fileType || !link || !time) {
            return res.status(400).send({ message: 'Fill in all fields' });
        }

        const contentRes = {
            subject,
            title,
            fileType,
            link,
            time,
        };

        const content = await contentService.createContentService(contentRes);

        if (!content) {
            return res.status(400).send({ message: 'Error creating content' });
        }

        return res.status(201).send({
            message: 'Content created successfully',
            content: {
                id: content.id,
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
        const { subject } = req.params;

        const content = await contentService.findContentBySubjectService(subject);

        if (!content) {
            return res.status(400).send({ message: 'Subject not found' });
        }

        return res.send(content);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const updateContentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req;

        console.log('aaaa', req.body.title);
        console.log('oiii', content.title);

        const contentUpdate = {
            id,
            subject: !req.body.subject ? content.subject : req.body.subject,
            title: !req.body.title ? content.title : req.body.title,
            fileType: !req.body.fileType ? content.fileType : req.body.fileType,
            link: !req.body.link ? content.link : req.body.link,
            time: !req.body.time ? content.time : req.body.time,
        };

        await contentService.updateContentService(contentUpdate);

        return res.send({
            message: 'Content update successfully',
            content: {
                id: contentUpdate.id,
                subject: contentUpdate.subject,
                title: contentUpdate.title,
                fileType: contentUpdate.fileType,
                link: contentUpdate.link,
                time: contentUpdate.time,
            },
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default {
    createContentController,
    findAllContentController,
    findContentBySubjectController,
    updateContentController,
};
