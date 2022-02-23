const Like = require('../init').db.Like;

const setLike = async (req, res) => {
    const likePost = await Like.create({
        user_id: 1, //Replace teh user id
        post_id: req.body.postId,
    })

    res.status(201).json({
        like: likePost
    });
}

const dislike = async (req, res) => {
    await Like.destroy({
        where: {
            user_id: 1, //Replace teh user id
            post_id: req.body.postId,
        },
    });

    res.status(202).json({
        msg: 'Success',
    })
}

const checkLike = async (req, res) => {
    const like = await Like.findAll({
        where: {
            post_id: req.params.id,
            user_id: 1,
        }
    })

    if (like.length !== 0) {
        res.json({status: true});
    } else {
        res.send({status: false});
    }
}

module.exports = {setLike, dislike, checkLike}