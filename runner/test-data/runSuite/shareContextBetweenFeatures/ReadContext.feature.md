---
needs:
  - Update Context
exampleContext:
  randomString: some value
---

# Read Context

## Scenario that reads the updated context

Then `${randomString}` should not be empty

And it should be replaced in this JSON

```json
{
  "aStringParameter": "${randomString}"
}
```
