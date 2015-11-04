var eval_button = document.getElementById('eval');
eval_button.onclick = function() {
  var textfield = document.getElementById('textfield');
  var text = textfield.value;
  textfield.value = '';

	var tokens = text.trim().split(' ');
  var result = evaluate(tokens);
	var resultItem = document.createElement('li');
	var input = document.createElement('span');
	input.classList.add('user_input');
	input.textContent = text;
	resultItem.appendChild(input);

	var resultSpan = document.createElement('span');
	resultSpan.textContent = result;
	resultItem.appendChild(resultSpan);

	var resultList = document.getElementById('result');
	resultList.firstElementChild
	resultList.insertBefore(resultItem, resultList.firstElementChild);
}

function get_type(token) {
  if (is_term(token) && !is_op(token)) {
    return token + '.type = terminal\n';
  }
  else if (!is_term(token) && is_op(token)) {
    return token + '.type = operator\n';
  }
  else {
    return token + ' type unknown\n'
  }
}

function parse_type(text) {
  var tokens = text.split(' ');
  //var stack = [];

  var types = '';
  for (var i = 0; i < tokens.length; ++i) {
    types += get_type(tokens[i]);
  }
  return types;
}

function is_term(token) {
  if (!isNaN(Number(token))) {
    return true;
  }
  return false;
}

function is_op(token) {
  var ops = ['+', '-', '*', '/', '%', '^'];
  if (ops.indexOf(token) != -1) {
    return true;
  }
  return false;
}

// Evaluation:
var ops = {
  '+': {
		symbol: '+',
		arity: 2,
		perform: function (a) { return a[1] + a[0]; }
	},
  '*': {
		symbol: '*',
		arity: 2,
		perform: function (a) { return a[1] * a[0]; }
	},
	'-': {
		symbol: '-',
		arity: 2,
		perform: function (a) { return a[1] - a[0]; }
	},
	'/': {
		symbol: '/',
		arity: 2,
		perform: function (a) { return a[1] / a[0]; }
	},
	'%': {
		symbol: '%',
		arity: 2,
		perform: function (a) { return a[1] % a[0]; }
	},
	'^': {
		symbol: '^',
		arity: 2,
		perform: function (a) { return Math.pow(a[1],a[0]); }
	}
}

function evaluate(tokens) {
	var stack, op, arity, result, args;
	stack = [];
	for (var i = 0; i < tokens.length; i++) {
		if (is_term(tokens[i])) {
			stack.push(Number(tokens[i]));
		}
		else if (is_op(tokens[i])) {
			op = ops[tokens[i]];
			args = [];
			for (var j = 0; j < op.arity; j++) {
				var tmp = stack.pop();
				console.log('argument ' + j + ' is '  + tmp);
				if (!isNaN(Number(tmp))) {
					args[j] = tmp;
				}
				else {
					return 'Too few arguments for ' + op.symbol +  ' operator.\n' +
					'Expected ' + op.arity + ', got ' + j + '.';
				}
			}
			console.log('args is:')
			console.log(args);
			result = op.perform(args);
			stack.push(result);
		}
		else {
			return '"' + tokens[i] + '" is not a valid token.';
		}
		console.log(stack);
	}
	if (stack.length == 1) {
		return stack.pop();
	}
	else {
		return 'Invalid expression, evaluation ended with ' + stack.length +
		' items on stack.';
	}
}
