// Debug script to see how tokens are generated
import { tokenize } from './src/interpreter/lexer.js';

const testCode = `elementSize <-- SIZE_OF(INTEGER)`;

console.log('Testing tokenization of: elementSize <-- SIZE_OF(INTEGER)');
console.log('');

const tokens = tokenize(testCode);

tokens.forEach((token, index) => {
  console.log(`${index}: Type="${token.type}", Value="${token.value}", Line=${token.line}, Column=${token.column}`);
});