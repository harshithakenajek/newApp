
const validator = require('validator');
const mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    author: {
        type: String,
        require: true,
        minlength: 2
    },
    publishedBy:{
        type: String
    },
    publishedOn: {
        type: Date,
        default: Date.now
    }
   
    
});

// UserSchema.methods.generateAuthToken = function () {
//     var user = this;
//     var access = 'auth';
//     var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();
//     // user.tokens.push({access, token });
//     user.tokens = user.tokens.concat([{access, token}]);
//     return user
//         .save()
//         .then(() => {
//             return token;
//         }).catch((err) => {
//             console.log('ErroR:',err);
//         })
// };


// module.exports = {User};
module.exports = mongoose.model('book', BookSchema);