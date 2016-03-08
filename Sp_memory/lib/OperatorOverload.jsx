function OperatorOverload(call,operator){
            this.call = call;
            this [operator] = function(operand){
                        this.call(operand);
                        return this;
                  }
            return this;
      }

var cout = $.global.cout = new OperatorOverload(function (str){
            $.writeln(str);
      },'>>');





