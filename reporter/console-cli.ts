import { consoleReporter } from './consoleReporter.js'

const onlyFailed = process.argv.includes('--only-failed')
const withTimestamps = process.argv.includes('--with-timestamps')

const chunks: string[] = []

process.stdin.on('data', (data) => {
	chunks.push(data.toString())
})

process.stdin.on('end', () => {
	const report = JSON.parse(chunks.join(''))
	consoleReporter(report, console.log, { onlyFailed, withTimestamps })
	if (report.ok !== true) process.exit(1)
})
