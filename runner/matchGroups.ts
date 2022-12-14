import { Static, TSchema } from '@sinclair/typebox'
import { validateWithJSONSchema } from './validateWithJSONSchema.js'

export class MatchError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'MatchError'
	}
}
const convert = (
	groups: Record<string, string>,
	converters: Record<string, (v: string) => string>,
): Record<string, unknown> =>
	Object.entries(groups).reduce(
		(converted, [k, v]) => ({
			...converted,
			[k]: converters[k]?.(v) ?? v,
		}),
		{},
	)
/**
 * Helper function to match, convert and validate an input string.
 *
 * Returns the matched and validate groups, or null in case the RegExp did not match.
 */

export const matchGroups =
	<Schema extends TSchema>(
		/**
		 * The schema to validate the output against.
		 */
		schema: Schema,
		/**
		 * Optional converters to apply to the capture groups.
		 */
		converters?: {
			[P in keyof Static<typeof schema>]?: (v: string) => unknown
		},
	) =>
	(
		/**
		 * The regular expression to match the input against.
		 * Must define capture groups.
		 */
		regExp: RegExp,
		/**
		 * The input string.
		 */
		input: string,
	): null | Static<typeof schema> => {
		const matches = regExp.exec(input)
		if (matches === null) return null // No matches
		if (matches.groups === undefined)
			throw new MatchError(
				`RegExp ${regExp.toString()} matched "${input} but does not contain capture groups."`,
			)
		const converted =
			converters !== undefined
				? convert(
						matches.groups,
						converters as Record<string, (v: string) => string>,
				  )
				: matches.groups
		const valid = validateWithJSONSchema(schema)(converted)
		if ('errors' in valid)
			throw new MatchError(
				`Result '${JSON.stringify(
					converted,
				)}' matched from '${input}' is not valid: ${valid.errors
					.map(({ instancePath, message }) => `${instancePath}: ${message}`)
					.join(', ')}!`,
			)
		return valid.value
	}
