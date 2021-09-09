const { addPost,checkIfPostExists,removePost } = require("../../DAL/dbPosts");

module.exports = {
    add: async (req,res) =>{
        const {imageurl,lat,lan,tags,date,username} = req.body;
        console.log("went into addpost at add posts controllers");
        const isAdded = await addPost(imageurl,lat,lan,tags,date,username);
        res.status(200).json({
            message:isAdded ? `added successfully`: `didnt add`,
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

