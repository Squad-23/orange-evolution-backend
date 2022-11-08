/* eslint-disable import/extensions */
import Content from '../models/Content.js';

const createContentService = (body) => Content.create(body);
const findAllContentService = () => Content.find();
const findContentBySubjectService = (subject) => Content.find({ subject });
const updateContentService = (content) => Content.updateOne(content);

export default {
    createContentService,
    findAllContentService,
    findContentBySubjectService,
    updateContentService,
};
