import express from 'express'
import render from '#server/ejs'

const router = express.Router()

router.route('/').get(render)
router.route('/page').get(render)

export default router
