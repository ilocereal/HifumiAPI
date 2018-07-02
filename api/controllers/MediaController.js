const hashids = require('hashids');
const hasher = new Hashids('hifumi', 8);

/**
 * MediaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	upload: async (req, res) => {
	    const user = req.header('user');
	    if (!user){
	        return res.badRequest({message: "Missing 'user' header", result: "Error", code: 400});
        }
	    await Media.create({
            key: 'wae',
            user: user,
            date: new Date()
        });
	    req.file('media').upload({
            adapter: require('skipper-s3'),
            key: process.env.BUCKET_KEY, // process.env.BUCKET_KEY,
            secret: process.env.BUCKET_SECRET,
            bucket: 'hifumicdn'
        }, (err, filesUploaded) => {
	        if (err){
	            res.serverError(err);
            }
            return res.ok({
                files: filesUploaded,
                textParams: req.allParams()
            })

        })
    }

};
