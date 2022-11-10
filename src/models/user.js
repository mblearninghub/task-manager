const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('emails is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlenght: 7,
        trim: true,
        validate(value) {
            if(value.includes( "password")) {
                throw new Error("password cant contain password")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
        if (value < 0) {
            throw new Error('Age must be positive')
        }
        }
    },
    tokens: [{
        token:{
            type: String,
            requiredi: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
    
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.generateAuthToken = async function () {
    const user =this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token})
    await user.save()

    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email})

    if(!user) {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('unable to login')
    }

    return user
}
// hash before saving
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model('User', userSchema)

// delete user tasks after user deleted

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.delete({ owner: user._id})
    next()
})

/*const me = new User({
    name: 'Marta',
    email: 'marta@gmail.com',
    age: 32,
    password: 'mypass999'
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})*/

module.exports = User