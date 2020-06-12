# CLML
###### Command line markup language

CLML is a markup language intended to make developing command line applications easier.

### Example

```js
import clml from 'clml';

const message = clml`<bold><:wave:> Hello world!<reset>
This is an example for <invert>CLML<reset>, a markup language for CLI tools.`;
```

### Reference

##### Tags
 - `<reset>`: Removes any styles from any text after the tag.
 - Colors: Colorizes any text after the tag. To remove the colorization, use a `<reset>` tag.
   - `<black>`
   - `<blue>`
   - `<cyan>`
   - `<green>`
   - `<magenta>`
   - `<red>`
   - `<white>`
   - `<yellow>`
   - `<256 n>` -- Not supported by all terminals. Use with caution.
   - `<rgb x y z>` -- Not supported by all terminals. Use with caution.
 - Background Colors: Colorizes the background of any text after the tag. To remove the colorization, use a `<reset>` tag.
   - `<black-bg>`
   - `<blue-bg>`
   - `<cyan-bg>`
   - `<green-bg>`
   - `<magenta-bg>`
   - `<red-bg>`
   - `<white-bg>`
   - `<yellow-bg>`
   - `<256-bg n>` -- Not supported by all terminals. Use with caution.
   - `<rgb-bg x y z>` -- Not supported by all terminals. Use with caution.
 - `<bold>`: Makes any text after the tag bold. To make the text normal again, use a `<reset>` tag.
 - `<blink>`: Makes any text after the tag blink. Not supported by all terminals. To make the text normal again, use a `<reset>` tag.
 - `<invert>`: Inverts any text after the tag. To make the text normal again, use a `<reset>` tag.
 - `<clear>`: Clears the entire display. Note that this can be considered a destructive action, and it should be used minimally.
 - `<clear-line>`: Clears all characters after the cursor on the current line.
 - `<to x y>`: Moves the cursor to the specified position.
 - `<up n>`: Moves the cursor up `n` lines.
 - `<down n>`: Moves the cursor down `n` lines.
 - `<forward n>`: Moves the cursor forward `n` characters.
 - `<backward n>`: Moves the cursor backward `n` characters.
 - `<save>`: Saves the cursors position, so it can be used as a restore point later.
 - `<restore>`: Restores the cursors position to a previous point.
 - Emoji: Emoji can be used through the `<:name:>` syntax, where `name` is one of [these](https://www.webfx.com/tools/emoji-cheat-sheet/) emoji names.