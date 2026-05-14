#!/usr/bin/env node

// Supports: addition (+), subtraction (-), multiplication (*), division (/)
// Operations supported: add, subtract, multiply, divide

function printHelp() {
  console.log(`Usage:
  node src/calculator.js <operation> <a> <b>
  node src/calculator.js --op <operation> --a <number> --b <number>

Operations:
  add       Add a and b
  subtract  Subtract b from a
  multiply  Multiply a by b
  divide    Divide a by b

Examples:
  node src/calculator.js add 2 3
  node src/calculator.js --op divide --a 10 --b 2

Returns the numeric result to stdout. On error prints a message to stderr and exits with a non-zero code.
`);
}

function errorExit(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

function parseFlags(argv) {
  const res = {};
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--help' || v === '-h') {
      res.help = true;
      continue;
    }
    if (v === '--op') {
      res.op = argv[++i];
      continue;
    }
    if (v === '--a') {
      res.a = argv[++i];
      continue;
    }
    if (v === '--b') {
      res.b = argv[++i];
      continue;
    }
  }
  return res;
}

function isNumber(n) {
  return typeof n === 'number' && Number.isFinite(n);
}

function toNumberOrError(val, name) {
  const n = Number(val);
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid number for ${name}: ${val}`);
  }
  return n;
}

function compute(op, a, b) {
  switch (op) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    printHelp();
    process.exit(0);
  }

  // If user passed a subcommand (positional)
  let op, aRaw, bRaw;

  if (!argv[0].startsWith('-')) {
    // positional form: <op> <a> <b>
    op = argv[0];
    aRaw = argv[1];
    bRaw = argv[2];
  } else {
    // flag form
    const flags = parseFlags(argv);
    if (flags.help) {
      printHelp();
      process.exit(0);
    }
    op = flags.op;
    aRaw = flags.a;
    bRaw = flags.b;
  }

  if (!op) {
    errorExit('No operation specified. Use --help for usage.');
  }

  if (aRaw === undefined || bRaw === undefined) {
    errorExit('Two operands are required. Example: node src/calculator.js add 2 3');
  }

  try {
    let a = toNumberOrError(aRaw, 'a');
    let b = toNumberOrError(bRaw, 'b');

    const validOps = ['add', 'subtract', 'multiply', 'divide'];
    if (!validOps.includes(op)) {
      // allow short symbols as convenience
      if (op === '+') op = 'add';
      else if (op === '-') op = 'subtract';
      else if (op === '*' || op === 'x' || op === 'X') op = 'multiply';
      else if (op === '/' || op === '÷') op = 'divide';
    }

    const result = compute(op, a, b);
    // Print result to stdout
    console.log(result);
  } catch (err) {
    // Map known errors to non-zero exit codes
    if (err && err.message && err.message.toLowerCase().includes('division by zero')) {
      errorExit('Error: Division by zero', 2);
    }
    errorExit(err.message || String(err), 1);
  }
}

// Export functions for unit testing
module.exports = { compute, toNumberOrError };

// Only run main when executed directly
if (require.main === module) {
  main();
}
