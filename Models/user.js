require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
// the bounder
const userSchema = new mongoose.mongoose.Schema({
    name: String,
    email: String,
    password: String
})
// updates null password to hash'd password and await users password
userSchema.pre('save', async function(next) {
    if(this.isModified('password'))  {
        this.password = await bcrypt.hash(this.password, 8)//8 is the number of times the codes hashed
    }
    next()//saying next function
})

userSchema.methods.generativeAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User