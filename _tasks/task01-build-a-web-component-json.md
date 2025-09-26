# Add web components to the project - to be recognized

# Part 1 - read the documentation
https://www.npmjs.com/package/custom-element-jet-brains-integration

# Part 2 - Understanding the web-types JSON schema

The `web-types.json` file in this project defines a schema for describing your web components so that IDEs (such as JetBrains IDEs) can provide advanced support like autocompletion, documentation, and navigation.

## Key properties in the schema
- **name**: The name of your component library.
- **version**: The version of your library.
- **framework**: (Optional) The framework your components are built for.
- **contributions**: The main section where you describe your HTML tags, CSS, and JS symbols.

## Example: Adding a custom element
To document a custom element, add it under `contributions.html.tags` in your `web-types.json` file. For example:

```json
{
  "contributions": {
    "html": {
      "tags": [
        {
          "name": "my-element",
          "description": "A custom element for demonstration.",
          "attributes": [
            {
              "name": "label",
              "description": "Label for the element."
            }
          ]
        }
      ]
    }
  }
}
```

This describes a custom element `<my-element>` with a `label` attribute.

# Part 3 - Document your own components

1. Open `web-types.json` in the `_tasks` folder.
2. Under `contributions.html.tags`, add an entry for each custom element in your project (e.g., `card-component`, `big-card-component`).
3. For each element, provide a name, description, and list of attributes (if any).
4. Save the file and reload your IDE to see the improved support.

Refer to the [official documentation](https://www.npmjs.com/package/custom-element-jet-brains-integration) for more advanced options.
