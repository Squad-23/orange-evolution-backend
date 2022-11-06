import { connect } from 'mongoose';

const connectDatabase = () => {
    console.log('Wait connecting to the database...');

    connect('mongodb+srv://squad23:ZrJNN5CReguqZV84@cluster0.0e70y9v.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('MongoDB Atlas Connected!'))
        .catch((err) => console.log(`Error connecting to MongoDB Atlas: ${err}`));
};

export default connectDatabase;
