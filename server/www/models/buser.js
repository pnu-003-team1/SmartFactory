var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buserSchema = new Schema ({
   email : {type : String, required : true,unique : true, index : true},
   bname : String,
   pw : {type : String, required : true},
   tel : {type : String, required : true},
   addr : {type : String, required : true},
   full : {type : Boolean, default: false}
});

buserSchema.statics.fullCheck = function(email,payload){
	return this.findOneAndUpdate({email}, payload,
	{new : true});
};

buserSchema.statics.addbuser = function (payload) {
   // this === Model
   console.log("Buser connect");
   const user = new this(payload);
   return user.save();
};

buserSchema.statics.checkbid = function (email){
	console.log("email: ", email);
    return this.find({email});
};
buserSchema.statics.checkEmail = function(email) {
	return this.find({email});
};
buserSchema.statics.checkbpw = function (pw){
   return this.find({pw});
};

buserSchema.statics.findAll = function() {
	return this.find({});
};

buserSchema.statics.deleteAll = function (payload){
   return this.remove({});
};

buserSchema.statics.deleteEmail = function (email) {
  return this.remove({ email });
};

buserSchema.statics.buserlogin = function (email,pw) {
	//console.log("ok");
	return this.find({email,pw});
		
};

buserSchema.statics.getBusersInfo = function (payload) {
	console.log("DB getBusersInfo");
	return this.find({}).select("-_id bname tel addr full");
};
	
module.exports = mongoose.model('Buser', buserSchema);

