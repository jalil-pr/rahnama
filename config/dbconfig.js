var path=require("path");
var multer=require("multer");
let storage=multer.diskStorage({
	destination:'./public/uploads',
	filename:(req,file,cb)=>{
		cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
	}
});

//   MULTER FOR STORING THE IMAGES
let upload=multer(
{
	storage:storage
}).array('images');

module.exports=upload;