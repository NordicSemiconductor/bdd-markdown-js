import { TokenStream } from '../tokenStream'

export const readWord = (s: TokenStream): string | null => {
	const wordTokens = []
	while (true) {
		if (!/[a-z]/i.test(s.char())) break
		wordTokens.push(s.char())
		if (s.eof()) break
		s.next()
	}
	const word = wordTokens.join('')
	return word.length > 0 ? word : null
}
