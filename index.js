const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
      req.on('aborted', () => {
        const fullPath = path.join('uploads', fileName)
        console.log('abort fullPath', fullPath)
        fs.unlinkSync(fullPath)
      })
    }
  })
  
  const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024*1024*2
    // },
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype === 'image/png') {
    //         cb(null,true)
    //     } else {
    //         cb(new Error('not allow other files without image/png'), false)
    //     }
    // }
  })

const port = '8000'

const app =  express()
app.use(cors())

app.post('/upload', upload.single('test'), (req, res) => {
    res.json({message: 'Done'})
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})