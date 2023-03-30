const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
});


app.post("/",function (req,res) {
    const fn=req.body.firstn;
    const ln=req.body.lastn;
    const em=req.body.email;
    
    const data = {
        members: [
          {
            email_address: em,
            status: 'subscribed',
            merge_fields :{
              FNAME: fn,
              LNAME: ln
            }
          }
        ]
      };
    const jsonData=JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/dcc506d7";
    const options={
        method:"POST",
        auth:"s:5570aa12f35cb27b116f9aee91cfb67-11",
    }
    const request=https.request(url,options,function (response){
        if(response.statusCode===200){
            res.sendFile(__dirname+'/success.html');
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    });
    request.write(jsonData);
    request.end();

    
});


app.listen(3000,function () {
   console.log("server is running on port 3000"); 
});

