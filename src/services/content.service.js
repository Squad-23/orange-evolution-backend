/* eslint-disable import/extensions */
import Content from '../models/Content.js';

const createContentService = (body) => Content.create(body);
const findAllContentService = () => Content.find();
const findContentBySubjectService = (subject) => Content.find({ subject });
const updateContentService = (id, content) => Content.findByIdAndUpdate(id, content);
const deleteContentService = (id) => Content.findByIdAndDelete(id);

export default {
    createContentService,
    findAllContentService,
    findContentBySubjectService,
    updateContentService,
    deleteContentService,
};
