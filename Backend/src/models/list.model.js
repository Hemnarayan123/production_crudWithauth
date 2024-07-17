import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    users: [
        {
        type : mongoose.Types.ObjectId,
        ref: "User",
        required : true
        }
      ]
});

const List = mongoose.model("List", listSchema);

export { List };