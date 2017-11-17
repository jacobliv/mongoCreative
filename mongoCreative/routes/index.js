var express = require('express');
var router = express.Router();
 var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/imageDB', { useMongoClient: true });
var imageSchema=mongoose.Schema({
  Name: String,
  Img: String
});

var Image = mongoose.model('Image', imageSchema);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log('Connected to Mongo Database');
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/img',function(req,res,next){
  var img = new Image(req.body);
  img.save(function(err,img){
      if(err) return next(err);

      res.sendStatus(200)
  })

})
router.get('/img', function(req,res,next){
  Image.find(function(err,images){
    if(err) return next(err);

    res.json(images)
  })
})

module.exports = router;
