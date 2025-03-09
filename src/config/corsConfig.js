exports.corsOption={
    origin:function(origin,callback){
        const whiteList=[
            "http://localhost:8000",
            "http://127.0.0.1:8000"
        ];
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error("CORS politikası tarafından engellendiniz!!"));
        }
    },
    methods:["GET","POST","DELETE","PUT","OPTIONS"],
    allowed:["Content-Type","Authorization"],
    Credentials:true,
    maxAge : 86400,//24 saat
};
