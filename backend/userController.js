import User from './userModel.js'


// Route: /users
const getAll = async (req, res) => {
  try {
    const data = await User.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const create = async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password
  })

  try {
    const result = await user.save();
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })    
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany()
    res.send("All users have been deleted")
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Route: /users/:id
const getByName = async (req, res) => {
  try {
    const user = await User.find({ name: req.params.name }).exec()

    if (user.length == 0) {
      res.status(404).json({ message: "User not found" })
    }

    res.json(user[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateByName = async (req, res) => {
  try {
    const user = await User.find({ name: req.params.name })
    const id = user[0].id
    const newData = req.body
    const options = { new: true }

    const result = await User.findByIdAndUpdate(
      id, newData, options
    )

    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeByName = async (req, res) => {
  try {
    const user = await User.find({ name: req.params.name })
    const id = user[0].id
    const deletedUser = await User.findByIdAndDelete(id)
    res.send(`User ${deletedUser.name} has been deleted`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export default { getAll, create, removeAll, getByName, updateByName, removeByName }
