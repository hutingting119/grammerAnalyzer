var fs = require('fs');
function control() {
    var terminator = ['+', '*', 'i', '<', '>', '#'];
    var nonterminator = ['E', 'T', 'K', 'F', 'M'];
    var analysisTable = [['error', 'error', 'TK', 'TK', 'error', 'error'], ['error', 'error', 'FM', 'FM', 'error', 'error'],
        ['+TK', 'error', 'error', 'error', '$', '$'], ['error', 'error', 'i', '<E>', 'error', 'error'],
        ['$', '*FM', 'error', 'error', '$', '$']];
    var stack = '#E';

    fs.readFile('test', 'UTF-8', function (err, data) {

            var inputs = data.toString().split('');
            while (stack.length != 0) {
                if (inputs[0] === stack[stack.length - 1] && inputs[0] === '#') {
                    console.log('Accept');
                    return;
                } else if (inputs[0] === stack[stack.length - 1]) {
                    console.log(stack, inputs.join(''), inputs[0] + '匹配成功');
                    stack = stack.slice(0, stack.length - 1);
                    inputs = inputs.slice(1, inputs.length);
                } else {
                    var col = nonterminator.indexOf(stack[stack.length - 1]);
                    var row = terminator.indexOf(inputs[0]);
                    var tag = analysisTable[col][row];
                    if (tag === 'error') {
                        console.log('error');
                        return
                    } else if (tag === '$') {
                        console.log(stack, inputs.join(''), '$');
                        stack = stack.slice(0, stack.length - 1);
                    } else {
                        console.log(stack, inputs.join(''), tag);
                        stack = stack.slice(0, stack.length - 1);
                        for (var j = tag.length - 1; j >= 0; j--) {
                            stack += tag[j];
                        }
                    }
                }
            }
        }
    )
}
control();