const Post = require('../init').db.Post;
const Like = require('../init').db.Like;
const sequelize = require("sequelize");


const getAllPost = async (req, res) => {
    const result = await Post.sequelize.query(`SELECT "Post".id,
       "Post"."post",
       "Post"."created_at",
       "Likes"."user_id",
       "Likes"."post_id"
        FROM "posts" AS "Post"
        LEFT OUTER JOIN "likes" AS "Likes" ON "Post"."id" = "Likes"."post_id" AND "Likes".user_id = 1 ORDER BY "Post"."created_at" DESC`);

    const posts = [];

    result[0].forEach(element => {
        posts.push(element);
    })

    res.status(201).json(posts);
}

module.exports = {getAllPost}