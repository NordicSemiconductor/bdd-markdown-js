import { TokenStream } from '../tokenStream.js'

export const line = (s: TokenStream): string | null => {
	const lineTokens = []
	while (true) {
		lineTokens.push(s.char())
		s.next()
		if (s.isEoL()) {
			if (!s.isEoF()) s.next() // skip EOL
			break
		}
	}
	return lineTokens.length > 0 ? lineTokens.join('') : null
}
