function OperatorOverload(call){
            this.call = call;
            return this;
      }

OperatorOverload.prototype ['>>']  = function (operand){
            this.call(operand);
            return this;
      }

var cout = $.global.cout = new OperatorOverload(function (str){
            $.writeln(str);
      });

