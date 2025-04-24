const express = require('express')
const router = express.Router()
const { uploadImages } = require('../middlewares/uploadCloudinary')
const {
  createImage,
  getImagesByContentId,
  deleteImages
} = require('../controllers/ImageController')

router.post('/', uploadImages, createImage)
router.delete('/', deleteImages)
router.get('/by-content/:contentId', getImagesByContentId)

module.exports = router
/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API for managing images
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageCreate:
 *       type: object
 *       properties:
 *         content_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *
 *     Image:
 *       type: object
 *       properties:
 *         image_id:
 *           type: string
 *           format: uuid
 *         public_id:
 *           type: string
 *         url:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         content_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *
 *     ImageDeleteInput:
 *       type: object
 *       required: [imageIds]
 *       properties:
 *         imageIds:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách các ID ảnh cần xóa
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload images
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/ImageCreate'
 *               - type: object
 *                 properties:
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: binary
 *     responses:
 *       201:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *       400:
 *         description: Upload failed
 */

/**
 * @swagger
 * /images:
 *   delete:
 *     summary: Delete multiple images
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageDeleteInput'
 *     responses:
 *       200:
 *         description: Images deleted successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /images/by-content/{contentId}:
 *   get:
 *     summary: Get images by content ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nội dung
 *     responses:
 *       200:
 *         description: List of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *       400:
 *         description: Invalid content ID
 */
