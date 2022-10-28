import { Router } from "express";
import userController from "./userController.js"

const router = Router()

router.get('/', (req, res) => {
  res.json({
    status: "API is working",
    message: 'Welcome to my web app!'
  })
})

router.route('/users')
  .get(userController.getAll)
  .post(userController.create)
  .delete(userController.removeAll)

router.route('/users/:name')
  .get(userController.getByName)
  .patch(userController.updateByName)
  .put(userController.updateByName)
  .delete(userController.removeByName)

export default router
