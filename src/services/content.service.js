import Content from '../models/Content.js';

const createContentService = (body) => Content.create(body);
const findAllContentService = () => Content.find();
const findContentBySubjectService = (search) => Content.find({ subject: new RegExp(search, 'i') });
const findContentByTitleService = (search) => Content.find({ title: new RegExp(search, 'i') });
const updateContentService = (id, content) => Content.findByIdAndUpdate(id, content);
const deleteContentService = (id) => Content.findByIdAndDelete(id);

export default {
    createContentService,
    findAllContentService,
    findContentBySubjectService,
    findContentByTitleService,
    updateContentService,
    deleteContentService,
};
