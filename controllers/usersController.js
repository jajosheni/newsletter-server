const User = require('../models/user');

module.exports = {
    //return all Users
    list_users : async function(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        let users = await User.find().sort({user:1}).skip(0, function(err, usr) {
            if (err) console.log(err);
            // object of all the users
            return usr;
        });
        res.send(users);
    },

    //create new user
    create_user : async function(req, res, next) {
        let user = req.body.user;

        // user model
        const newUser = User({
            user: user
        });

        User.find({user: user}, function (err, usr) {
            if (err) console.log(err);

            //check if user exists
            if(!usr.length){
                // save the user
                newUser.save(function(err) {
                    if (err) console.log(err);
                    res.json(usr);
                    console.log('User created!');
                });
            }else{
                res.send('Exists!');
            }

        });
    },
};