
function FlexBuffer(){
    this.originalArgs = arguments
    this.buffer = Buffer.call(this,arguments)
    this.length = this.buffer.length
    this.tail = 0
}

FlexBuffer.prototype.rewind = function(){
    this.tail = 0
}

FlexBuffer.prototype.reset = function(){
    this.buffer = Buffer.call(this,this.originalArgs)
    this.length = this.buffer.length
    this.tail = 0
}

FlexBuffer.prototype.resizeBuffer = function(minLen){
    if(this.lenth == 0){
        this.length = 1
    }
    this.length = (this.length + minLen) * 2
    var oldBuffer = this.buffer
    this.buffer = new Buffer(this.length)
    oldBuffer.copy(this.buffer,0)
}

FlexBuffer.prototype.write = function(arg){
    if(!arg)
        return;
    if(!arg.length){
        arg = String(arg)
    }
    var len = arg.length
    if(this.tail+len >= this.length)
        this.resizeBuffer(len)
    if(Buffer.isBuffer(arg)){
        arg.copy(this.buffer,this.tail)
    }else{
        if(typeof arg === "string")
            this.buffer.write(arg,this.tail)
        else
            this.buffer.write(String(arg),this.tail)
    }
    this.tail+=len
   
}

FlexBuffer.prototype.getBufferReference = function(){
    return this.buffer.slice(0,this.tail)
}

FlexBuffer.prototype.getBuffer = function(){
    var buff = this.buffer.slice(0,this.tail)
    var b = new Buffer(buff.length)
    buff.copy(b)
    return b
}

module.exports.FlexBuffer = FlexBuffer

