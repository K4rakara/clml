import emoji from 'node-emoji';

const replacements: { [key: string]: string; } =
{
	'reset': '\u001B[0m',
	'black': '\u001B[30m',
	'blue': '\u001B[34m',
	'cyan': '\u001B[36m',
	'green': '\u001B[32m',
	'magenta': '\u001B[35m',
	'red': '\u001B[31m',
	'white': '\u001B[37m',
	'yellow': '\u001B[33m',
	'black-bg': '\u001B[40m',
	'blue-bg': '\u001B[44m',
	'cyan-bg': '\u001B[46m',
	'green-bg': '\u001B[42m',
	'magenta-bg': '\u001B[45m',
	'red-bg': '\u001B[41m',
	'white-bg': '\u001B[47m',
	'yellow-bg': '\u001B[43m',
	'invert': '\u001B[7m',
	'bold': '\u001B[1m',
	'blink': '\u001B[5m',
	'clear': '\u001B[2J',
	'clear-line': '\u001B[K',
	'save': '\u001B[s',
	'restore': '\u001B[u',
};

export function clml(strings: TemplateStringsArray, ...args: string[]): string
{
	let output: string = '';
	strings.forEach((string: string, i: number): void =>
	{
		output += string;
		output += args[i] || '';
	});

	// Do all replacements.
	Object.keys(replacements).forEach((key: string): void =>
	{
		const val: string = replacements[key];
		output = output.replace(new RegExp(`<${key}>`, 'gmi'), val);
	});

	// Do all special mutations.

	// 255-color tag
	output = output.replace(/<255(?:-bg)? (?:\d\d?\d?)>/gmi, (substring: string): string =>
		`\u001B[${(substring.includes('-bg')) ? '48' : '38'};5;${substring.match(/(?<=<255(?:-bg)? )\d+(?=>)/gmi)?.toString()}m`);
	
	// rgb-color tag
	output = output.replace(/<rgb(?:-bg)? (?:\d\d?\d?) (?:\d\d?\d?) (?:\d\d?\d?)>/gmi, (substring: string): string =>
		`\u001B[${(substring.includes('-bg')) ? '48' : '38'};2;${
				substring.match(/(?<=<rgb(?:-bg)? )(?:\d\d?\d?)/gmi)?.toString()
			};${
				substring.match(/(?<=<rgb(?:-bg)? (?:\d\d?\d?) )(?:\d\d?\d?)/gmi)?.toString()
			};${
				substring.match(/(?<=<rgb(?:-bg)? (?:\d\d?\d?) (?:\d\d?\d?) )(?:\d\d?\d?)/gmi)?.toString()
			}m`);
	
	// Cursor movement tags
	output = output.replace(/<to \d+ \d+>/gmi, (substring: string): string =>
		`\u001B[${
			substring.match(/(?<=<to )\d+/gmi)?.toString()
		};${
			substring.match(/(?<=<to \d+ )\d+/gmi)?.toString()
		}H`);
	output = output.replace(/<up \d+>/gmi, (substring: string): string =>
		`\u001B[${substring.match(/(?<=<up )\d+/gmi)?.toString()}A`);
	output = output.replace(/<down \d+>/gmi, (substring: string): string =>
		`\u001B[${substring.match(/(?<=<down )\d+/gmi)?.toString()}B`);
	output = output.replace(/<forward \d+>/gmi, (substring: string): string =>
		`\u001B[${substring.match(/(?<=<forward )\d+/gmi)?.toString()}C`);
	output = output.replace(/<backward \d+>/gmi, (substring: string): string =>
		`\u001B[${substring.match(/(?<=<backward )\d+/gmi)?.toString()}D`);

	// Emoji tags
	output = output.replace(/<:[a-z0-9\-]+:>/gmi, (substring: string): string =>
		emoji.emojify(substring.substring(1, substring.length - 1).toLowerCase()));


	return output;
}

export default clml;