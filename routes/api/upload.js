const router = require('koa-router')()
const multer = require('koa-multer')
const config = require('../../configs/index')
const fs = require('fs')
const path = require('path')

var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, config.imagePath)  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})

var upload = multer({ storage: storage })

router.put('/upimage',upload.single('file'),async (ctx,next) =>{
	try {
		// console.log(ctx.req.file)
	    ctx.body = {
	      status: true,
	      path: ctx.req.file.filename,
	    }
	} catch (err) {
	    ctx.body = {
	      status: false,
	      info: err.message,
	    }
	  }

})


router.post('/deleteimage',async (ctx,next) =>{
	try {
		let file = path.join(config.imagePath,ctx.request.body.file)
		await new Promise((resolve,reject)=>{
			fs.unlink(file,(err,data)=>{
				resolve(data)
			})
		})

		ctx.body = {
			status:true,
		}
	} catch(e) {
		// statements
		ctx.body = {
			status:false,
		}
	}
})
module.exports = router
