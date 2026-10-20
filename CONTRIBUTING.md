# Contributing ASCII art

New entries are proposed through pull requests that update `db.json`. The GitHub Actions workflow checks the JSON format, required fields, IDs, names and aliases, duplicate tags, and TypeScript build. A maintainer reviews the content and its rights before merging.

## Add an entry

1. Fork the repository and create a branch.
2. Add one object to the array in `db.json`.
3. Choose an unused positive integer `id`. Names and aliases must be unique across the whole database, ignoring case.
4. Use `tipo: "ascii"` or `tipo: "unicode"`. Keep the art as a JSON string; escape backslashes as `\\` and newlines as `\n` where needed.
5. Run `npm run validate:data` and `npm run build` locally.
6. Open a pull request and fill in the contribution checklist.

Include the source or author of the art and its license in the pull request description. Do not submit material unless you created it or have permission to redistribute it under the project's MIT license. Maintainers may ask for attribution or decline entries whose rights are unclear.

## Example entry

```json
{
  "id": 7,
  "nombre": "small_star",
  "aliases": ["star"],
  "categoria": "symbols",
  "tags": ["simple", "night_sky"],
  "tipo": "ascii",
  "art": "  *  \n *** \n*****"
}
```
