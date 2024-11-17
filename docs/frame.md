## frame
A frame component

* [add_frame](#add_frame)
* [add_label](#add_label)
* [add_button](#add_button)
* [add_checkbox](#add_checkbox)
* [add_selector](#add_selector)
* [add_slider](#add_slider)
* [add_input](#add_input)
* [add_image](#add_image)
* [add_folder_selector](#add_folder_selector)
* [add_list](#add_list)

## add_frame
Adds a frame to the frame

### Syntax
```typescript
public add_frame(name: string, frame_options: { is_tab_list: boolean, outline: boolean, layout: frame_layout_t, max_size: boolean, align: frame_align_t, overflow: boolean, border: boolean }): frame | null;
```

### Parameters
`name` <br>
Type: **string** <br>
Name of the frame, can be empty <br>
<br>
`frame_options` <br>
Type: **object** <br>
An object describing what the frame looks like or does <br>

### Return value
Type: **frame** | **null** <br>
If it fails it will return a **null** which is impossible <br>
else it will return a class / pointer to the new frame

### Remarks
If the parent is a tab list the name will be the tab name. <br>
<br>
If the frame is a tab list it requires at least 1 frame to be added before adding other components

## add_label
Adds a label to the frame

### Syntax
```typescript
public add_label(text: string): label | null;
```

### Parameters
`text` <br>
Type: **string** <br>
The text that the label should display <br>

### Return value
Type: **label** | **null** <br>
If the parent is a tab list it will return null, otherwise a label

## add_button
Adds a button to the frame

### Syntax
```typescript
public add_button(name: string, callback: button_callback_t, options: { disabled: boolean, full_width: boolean }): button | null;
```

### Parameters
`name` <br>
Type: **string** <br>
Text to display on the button <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when the button is clicked <br>
<br>
`options` <br>
Type: **object** <br>
An object describing what the button looks like or does <br>

### Return value
Type: **button** | **null** <br>
If the parent is a tab list it will return null, otherwise a button

## add_checkbox
Adds a checkbox to the frame

### Syntax
```typescript
public add_checkbox(name: string, state: boolean, callback: checkbox_callback_t): checkbox | null;
```

### Parameters
`name` <br>
Type: **string** <br>
Text to display next to the checkbox <br>
<br>
`state` <br>
Type: **boolean** <br>
The initial state of the checkbox <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when the checkbox is clicked <br>

### Return value
Type: **checkbox** | **null** <br>
If the parent is a tab list it will return null, otherwise a checkbox

## add_selector
Adds a selector to the frame

### Syntax
```typescript
public add_selector(text: string, items: string[], active: number[], callback: selector_callback_t, options: { is_multi: boolean }): selector | null;
```

### Parameters
`text` <br>
Type: **string** <br>
This does nothing, qq <br>
<br>
`items` <br>
Type: **string[]** <br>
A list of options to choose from <br>
<br>
`active` <br>
Type: **number[]** <br>
A list of active items <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when an item is clicked <br>
<br>
`options` <br>
Type: **object** <br>
An object describing what the selector looks like or does <br>

### Return value
Type: **selector** | **null** <br>
If the parent is a tab list it will return null, otherwise a selector

## add_slider
Adds a slider to the frame

### Syntax
```typescript
public add_slider(name: string, min: number, max: number, current: number, callback: slider_callback_t, options: { show_ticks: boolean, tick_name_left: string, tick_name_right: string }): slider | null;
```

### Parameters
`name` <br>
Type: **string** <br>
This does nothing, qq <br>
<br>
`min` <br>
Type: **number** <br>
Minimum of the range <br>
<br>
`max` <br>
Type: **number** <br>
Maximum of the range <br>
<br>
`current` <br>
Type: **number** <br>
Initial value of the range <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when the slider is released <br>
<br>
`options` <br>
Type: **object** <br>
An object describing what the slider looks like or does <br>

### Return value
Type: **slider** | **null** <br>
If the parent is a tab list it will return null, otherwise a slider

## add_input
Adds a input to the frame

### Syntax
```typescript
public add_input(text: string, callback: input_callback_t, options: { submit_button_text: string }): input | null;
```

### Parameters
`text` <br>
Type: **string** <br>
Default text of the input <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when the input loses focus, or the submit button was pressed <br>
<br>
`options` <br>
Type: **object** <br>
An object describing what the input looks like or does <br>

### Return value
Type: **input** | **null** <br>
If the parent is a tab list it will return null, otherwise a input

## add_image
Adds a image to the frame

### Syntax
```typescript
public add_image(path_: string, width: number, height: number, callback: image_callback_t): image | null;
```

### Parameters
`path_` <br>
Type: **string** <br>
Path to the image <br>
<br>
`width` <br>
Type: **number** <br>
Width of the image <br>
<br>
`height` <br>
Type: **number** <br>
Height of the image <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when the image was pressed <br>

### Return value
Type: **image** | **null** <br>
If the parent is a tab list it will return null, otherwise a image

## add_folder_selector
Adds a folder selector to the frame

### Syntax
```typescript
public add_folder_selector(name: string, default_path: string, callback: folder_selector_callback_t): folder_selector | null;
```

### Parameters
`name` <br>
Type: **string** <br>
This does nothing, qq <br>
<br>
`default_path` <br>
Type: **string** <br>
Default path for the folder selector <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when the folder selector dialogue gets closed <br>

### Return value
Type: **folder_selector** | **null** <br>
If the parent is a tab list it will return null, otherwise a folder_selector

## add_list
Adds a list to the frame

### Syntax
```typescript
public add_list(name: string, items: string[], callback: list_callback_t): list | null;
```

### Parameters
`name` <br>
Type: **string** <br>
This does nothing, qq <br>
<br>
`items` <br>
Type: **string[]** <br>
List of items in the list <br>
<br>
`callback` <br>
Type: **function** <br>
Callback function that gets called when an items in the list gets clicked <br>

### Return value
Type: **list** | **null** <br>
If the parent is a tab list it will return null, otherwise a list