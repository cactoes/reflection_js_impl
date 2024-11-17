# reflection-ui
JS header for [https://github.com/cactoes/reflection](https://github.com/cactoes/reflection)

## Installation
```powershell
PS> npm install reflection_ui
```

## Usage
[!] Important, this library does not take care of the windows message loop <br>
you will have to do that yourself, see [example](./example/example.ts#L8)

### Initialization
Make sure before calling any other reflection function that init_reflection() has been called
```javascript
import * as reflection from "reflection_ui";
// or const reflection = require("reflection_ui");

// initialize the dll & load the library
reflection.init_reflection();
```

## Docs
## init_reflection
Sets up the dll environment

### Syntax
```typescript
function init_reflection(lib_path: string): void;
```

### Params
`lib_path` <br>
Type: **string** <br>
This argument is optional and only needs to be set if you have a custom build of reflection

## The rest
* [browser_window](./docs/browser_window.md#browser_window)
* [component](./docs/component.md#component)
    * [label](./docs/label.md#label)
    * [button](./docs/button.md#button)
    * [checkbox](./docs/checkbox.md#checkbox)
    * [selector](./docs/selector.md#selector)
    * [slider](./docs/slider.md#slider)
    * [image](./docs/image.md#image)
    * [folder_selector](./docs/folder_selector.md#folder_selector)
    * [list](./docs/list.md#list)