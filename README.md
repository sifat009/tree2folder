# tree2folder

Create files and folders from a simple ASCII tree diagram.

Demo
----

Watch how easy it is to create folder structures from ASCII diagrams using tree2folder!

![tree2folder demo](./assets/demo.gif)


Usage
-----

You can use tree2folder in two ways:

### Using npx (no installation required)

To run tree2folder without installing:

```bash
npx tree2folder <file-name> [<directory>]
```

- `<file-name>`: Path to the text file containing the directory tree diagram.
- `[<directory>]`: (Optional) Target directory where the structure will be created. Defaults to the current working directory.

### Global Installation

Install globally using npm:

```bash
npm install -g tree2folder
```

After installation, you can use it directly:

```bash
tree2folder <file-name> [<directory>]
```

Examples
--------

1) Basic example (create structure in current directory)

Create `diagram.txt` with this content:

```text
project
├─ bin/
│  └─ start.sh
├─ src/
│  ├─ index.js
│  └─ helpers.js
└─ README.md
```

**Or**

```text
project
    bin/
        start.sh
    src/
        index.js
        helpers.js
    README.md
```

Then run:

```bash
npx tree2folder diagram.txt
```

Result: a `project` folder containing the described files and folders.

2) Create into a specific directory

```bash
npx tree2folder diagram.txt ./output-folder
```

This creates the tree inside `./output-folder` (it will be created if it doesn't exist).


Supported input
-----------------------

✅ ASCII-tree structure:

```text
project
├─ bin/
│  └─ start.sh
├─ src/
│  ├─ index.js
│  └─ helpers.js
└─ README.md
```
✅ Indentation-based structure:

```text
project
    bin/
        start.sh
    src/
        index.js
        helpers.js
    README.md
```

Behavior & tips
---------------

- Lines ending with `/` are treated as directories. Indentation (spaces) defines nesting.
- Tree characters like `├─`, `└─`, and `│` are ignored, so you can paste output from `tree` or similar utilities and it will still work.
- Files are created empty by default. If a path already exists, behavior depends on the CLI implementation (it may skip, warn, or overwrite). Test in a temporary folder if you are unsure.

Contributing
------------

Contributions that improve examples, parser robustness, and helpful CLI flags are welcome.

Small ways to contribute:

- Add examples that show edge cases (spaces in names, many indent levels).
- Add a `--dry-run` flag to preview what will be created without making changes.
- Add `--force` to overwrite existing files and a `--yes` flag to skip prompts.
- Improve the README with platform-specific tips or CI-compatible examples.

License
-------

MIT — see the `LICENSE` file.
