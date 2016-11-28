var fs = require('fs');
function control() {
    var terminator = ['+', '*', 'i', '<', '>', '#'];
    var nonterminator = ['E', 'T', 'K', 'F', 'M'];
    var analysisTable = [['error', 'error', 'TK', 'TK', 'error', 'error'], ['error', 'error', 'FM', 'FM', 'error', 'error'],
        ['+TK', 'error', 'error', 'error', '$', '$'], ['error', 'error', 'i', '<E>', 'error', 'error'],
        ['$', '*FM', 'error', 'error', '$', '$']];
    var stack = '#E';

    fs.readFile('test', 'UTF-8', function (err, data) {

            var text = data.toString().split('');

            for (var i = 0; i < text.length - 1 || stack.length > 0;) {

                if (stack[stack.length - 1] === text[i] && text[i] === '#') {

                    console.log('accept');
                    return

                } else if (stack[stack.length - 1] === text[i]) {
                    console.log(stack, 1, text[i] + '匹配成功')
                    stack = stack.slice(0, stack.length - 1);
                    i++;

                } else {

                    var col = nonterminator.indexOf(stack[stack.length - 1]);
                    var row = terminator.indexOf(text[i]);
                    var tig = analysisTable[col][row];

                    if (tig === 'error') {

                        console.log('error')
                        return

                    } else if (tig === '$') {

                        console.log(stack, 1, '$')
                        stack = stack.slice(0, stack.length - 1);

                    } else {

                        console.log(stack, 1, tig);
                        stack = stack.slice(0, stack.length - 1);
                        for (var j = tig.length - 1; j >= 0; j--) {
                            stack += tig[j];

                        }
                    }
                }
            }
        }
    )
}
control();