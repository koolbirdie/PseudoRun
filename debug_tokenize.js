// Debug script to see how tokens are generated
import { tokenize } from './src/interpreter/lexer.js';
import { parse } from './src/interpreter/parser.js';

const testCode = `FOR i = 1 TO 5
    OUTPUT i
NEXT i`;

console.log('Testing FOR loop with NEXT:');
console.log('Code:');
console.log(testCode);
console.log('');

console.log('=== TOKENIZATION ===');
const tokens = tokenize(testCode);

tokens.forEach((token, index) => {
  console.log(`${index}: Type="${token.type}", Value="${token.value}", Line=${token.line}, Column=${token.column}`);
});

console.log('');
console.log('=== PARSING ===');
try {
  const ast = parse(tokens);
  console.log('Parse successful!');
  console.log('AST:');
  console.log(JSON.stringify(ast, null, 2));
} catch (error) {
  console.log('Parse failed:', error.message);
}