import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, it } from 'node:test'
import { parseFeature } from './parseFeature'

describe('parseFeature()', () => {
	it('should parse a sample feature file', () => {
		const tree = parseFeature(
			readFileSync(path.join(process.cwd(), 'Example.feature'), 'utf-8'),
		)

		assert.deepEqual(tree, {
			keyword: 'Feature',
			shortDescription: 'Example feature',
			description: [
				'This is a description for the feature, which can span multiple lines.',
				'And single line-breaks should be allowed in the description.',
			],
			scenarios: [
				{
					keyword: 'Scenario',
					shortDescription: 'The first scenario',
					description: [
						'This is a description for the scenario, which can span multiple lines.',
						'And single line-breaks should be allowed in the description.',
					],
				},
			],
		})
	})
})
