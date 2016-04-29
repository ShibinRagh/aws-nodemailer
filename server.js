var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    nodemailer        = require('nodemailer'),
    sesTransport      = require("nodemailer-ses-transport");

app.use(bodyParser());
app.get('/', function(req, res){
    res.sendfile(__dirname + '/client/index.html');
});

app.get('/send', function (req, res) {
    res.send("send");
});
 
var transport = nodemailer.createTransport(sesTransport({
    accessKeyId: "***",
    secretAccessKey: "***",
    rateLimit: 5, // do not send more than 5 messages in a second
    region: 'eu-west-1'
}));

app.post('/contact', function (req, res, next) {
    console.log(req.body.name);
    console.log(req.body.email);
    
    var mailOptions = {
        from: 'info@toobler.com', // sender address
        to: 'shibin@toobler.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: req.body.name, // plaintext body
        html: '<b>Hello world 🐴</b>' +  req.body.name+ '<br>' + req.body.email// html body
    };
    
    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log('error' + error);
            res.json(error)
        }else{
            console.log('Message sent: ' + info.response);
            res.json(info)
        }
        
    });
    
    
});


app.listen(3000);