var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../webpack.config');
var dao=require('./dao');
var app = express();
var compiler = webpack(config);
var fs = require('fs');
var bodyParser=require('body-parser');
var ExpressReactRouter = require('express-react-router-views');


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));




app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});
/*app.get('/checkout/cart', function(req, res) {
  res.redirect('/checkout/cart');
});*/
app.get('/test',function(req, res){
    console.log("hello World");
	res.send("Hello World");
});
app.put('/updateProduct',function(req,res){
    res.send(dao.updateData(req.body));
});
app.post('/deleteProductFromCart',function(req,res){
    res.send(dao.deleteProductFromCart(req.body));
});
app.get('/allProducts',function(req,res){
  res.send(dao.getData());
});
app.get('/getCartState',function(req,res){
    res.send(dao.getCartData());
});

app.post('/handlePayment',function(req,res){
    console.log(req.body);
    res.send(req.body);
});

app.get('/getCartValue',function(req,res){
    const cartTotal=dao.getCartTotal();
    res.status(200).json({code: 'success', message:cartTotal});
})
app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});