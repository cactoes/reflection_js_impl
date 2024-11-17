## browser_window
This is the main window class it handles creation of the window and browser

* [constructor](#constructor)
    * [start](#start)
    * [get_frame](#get_frame)
    * [is_ready](#is_ready)
    * [register_event_handler](#register_event_handler)
    * [set_icon](#set_icon)
    * [set_color](#set_color)
    * [close](#close)

## constructor
Initializes a browser window

### Syntax
```typescript
constructor(
    window_options: {
        width: number,
        height: number,
        name: string
    },
    frame_options: {
        is_tab_list: boolean,
        outline: boolean,
        layout: frame_layout_t,
        max_size: boolean,
        align: frame_align_t,
        overflow: boolean,
        border: boolean
    }
)
```

### Parameters
`window_options` <br>
Type: **object** <br>
An object that contains options for window creation <br>
<br>
`frame_options` <br>
Type: **object** <br>
An object that contains options for frame creation <br>

## start
Starts the browsers initialization and rendering

### Syntax
```typescript
public start(): void;
```

### Remarks
This will not work properly unless the window message loop is also active

## get_frame
Gets the browsers main frame

### Syntax
```typescript
public get_frame(): component.frame;
```

### Return value
Type: **class** <br>
This will return a class "pointer" to a frame 

## is_ready
Returns a bool to check if the browser is ready

### Syntax
```typescript
public is_ready(): boolean;
```

### Return value
Returns a boolean value indicating the ready state of the browser

## register_event_handler
Registers an event handler to a specific event

### Syntax
```typescript
public register_event_handler(event: event_t, handler: event_handler_t): void;
```

### Parameters
`event` <br>
Type: **enum** <br>
An enum value (number) indicating an event <br>
<br>
`handler` <br>
Type: **function** <br>
A function to execute when the event is triggered <br>

### Remarks
Multiple handlers can be assigned to a single event

## set_icon
Updates the window icon to the given icon from the .rc file

### Syntax
```typescript
public set_icon(resource_id: number): void;
```

### Parameters
`resource_id` <br>
Type: **number** <br>
The number indicating the resource id of the wanted icon <br>

### Remarks
This function is called by default on [start()](#start)

## set_color
Updates the window theme color by hex code

### Syntax
```typescript
public set_color(color: string): void;
```

### Parameters
`color` <br>
Type: **string** <br>
A hex code with the desired color (#728ab3) <br>

### Remarks
This function is called by default on [start()](#start)

## close
Closes the browser and the window

### Syntax
```typescript
public close(): void;
```