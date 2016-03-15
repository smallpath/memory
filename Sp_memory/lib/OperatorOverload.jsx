function OperatorOverload(call,operator){
            var meta = [
                                    //Unary operator
                                    '+','-','~',
                                    //Binary operator
                                    '*','/','%','^','<','<=','==','<<','>>','>>>','&','|','==='
                              ];
            var toObject = function (){
                                          for(var i =0;i<arguments.length;i++)
                                                this[arguments[i]] = true;
                                          return this;
                                    }
            var metaObj = toObject.apply({},meta);
            if(!metaObj.hasOwnProperty (operator))    
                   return alert('Operator not supported.');
            
            this.call = call;
            this [operator] = function(operand,rev){
                        this.call(operand,rev);
                        return this;
                  }
            return this;
      }

var cout = $.global.cout = new OperatorOverload(function (operand,rev){
            if(!rev)
                  $.writeln(operand);
            else
                  alert(operand);
      },'<<');








