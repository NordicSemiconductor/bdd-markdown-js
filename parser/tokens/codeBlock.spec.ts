import assert from 'assert/strict'
import { describe, it } from 'node:test'
import { testData } from '../test-data/testData.js'
import { codeBlock } from './codeBlock.js'

const l = testData(import.meta.url)

describe('codeBlock()', () => {
	it('should parse a one-line code block', () =>
		assert.deepEqual(codeBlock(l('generic')), {
			code: '{ "foo": "bar" }',
		}))
	it('should parse a one-line code block with language specifier', () =>
		assert.deepEqual(codeBlock(l('json')), {
			language: 'json',
			code: '{ "foo": "bar" }',
		}))
	it('should parse multi-line code blocks', () =>
		assert.deepEqual(codeBlock(l('json-multiline')), {
			language: 'json',
			code: JSON.stringify(
				{
					dev: {
						v: {
							modV: 'mfw_nrf9160_1.3.1',
							brdV: 'nrf9160dk_nrf9160',
							appV: '${appVersion}-upgraded',
						},
					},
				},
				null,
				2,
			),
		}))
	it('should parse code blocks with blank lines at the end', () =>
		assert.deepEqual(codeBlock(l('blankLineAtEnd')), {
			code: [
				`HTTP/1.1 200 OK`,
				`Content-Type: application/octet-stream`,
				`Content-Length: 1160`,
				``,
			].join('\n'),
		}))
})
