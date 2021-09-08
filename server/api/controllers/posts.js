const { addPost,checkIfPostExists,removePost } = require("../../DAL/dbPosts");

module.exports = {
    add: async (req,res) =>{
        const {imageurl,lat,lan,tags,date,username} = req.body;
        const isAdded = await addPost(imageurl,lat,lan,tags,date,username);
        const add = await checkIfPostExists(imageurl,lat,lan,tags,date,username);
        res.status(200).json({
            message:add ? `added successfully`: `didnt add`,
        });
    },
    remove: async (req,res) => {
        const {imageurl} = req.body;
        const remove = await removePost(imageurl)
        res.status(200).json({
            message:remove ? `remove successfully`: `didnt remove`,
        });
    }
    
};

