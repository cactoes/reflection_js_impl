import * as ffi from "ffi-napi";
import * as ref from "ref-napi";
import * as struct from "ref-struct-napi";
import * as path from "path";

export const window_options_t = struct({
    width: "int",
    height: "int",
    name: "string"
});

export enum frame_layout_t {
    fl_horizontal = 0,
    fl_vertical
};

export enum event_t {
    E_ON_RENDER_START = 0,
    E_ON_RENDER_FINISHED
};

export enum frame_align_t {
    fa_none = 0,
    fa_horizontal,
    fa_vertical,
    fa_center,
};

export const frame_options_t = struct({
    is_tab_list: "bool",
    outline: "bool",
    layout: "int",
    max_size: "bool",
    align: "int",
    overflow: "bool",
    border: "bool"
});

export const button_options_t = struct({
    disabled: "bool",
    full_width: "bool"
});

export const selector_options_t = struct({
    is_multi: "bool"
});

export const slider_options_t = struct({
    show_ticks: "bool",
    tick_name_left: "string",
    tick_name_right: "string"
});

export const input_options_t = struct({
    submit_button_text: "string"
});

export const unsafe_string_t = struct({
    string: "string",
    size: "int"
});

export const unsafe_int_array_t = struct({
    array: "string",
    size: "int"
});

type event_handler_t = (browser_handle: ref.Pointer<unknown>) => void;

type button_callback_t = (handle: ref.Pointer<unknown>) => void;
type checkbox_callback_t = (handle: ref.Pointer<unknown>, state: boolean) => void;
type selector_callback_t = (handle: ref.Pointer<unknown>, items: number[]) => void;
type slider_callback_t = (handle: ref.Pointer<unknown>, value: number) => void;
type input_callback_t = (handle: ref.Pointer<unknown>, value: string) => string;
type image_callback_t = (handle: ref.Pointer<unknown>) => void;
type folder_selector_callback_t = (handle: ref.Pointer<unknown>, value: string) => void;
type list_callback_t = (handle: ref.Pointer<unknown>, index: number) => void;

let g_library: {
    destroy_string: ffi.ForeignFunction<void, [ ref.Pointer<any> ]>;
    destroy_array: ffi.ForeignFunction<void, [ ref.Pointer<any> ]>;
    
    init_browser: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<any>, ref.Pointer<any> ]>;

    browser_window_start: ffi.ForeignFunction<void , [ ref.Pointer<unknown> ]>;
    browser_window_get_frame: ffi.ForeignFunction<ref.Pointer<unknown> , [ ref.Pointer<unknown> ]>;
    browser_window_is_ready: ffi.ForeignFunction<boolean , [ ref.Pointer<unknown> ]>;
    browser_window_register_event_handler: ffi.ForeignFunction<void , [ ref.Pointer<unknown>, number, ref.Pointer<unknown> ]>;
    browser_window_set_icon: ffi.ForeignFunction<void , [ ref.Pointer<unknown>, number ]>;
    browser_window_set_color: ffi.ForeignFunction<void , [ ref.Pointer<unknown>, string | null ]>;
    browser_window_close: ffi.ForeignFunction<void , [ ref.Pointer<unknown> ]>;

    component_set_target: ffi.ForeignFunction<void, [ ref.Pointer<unknown>, string | null ]>;
    component_set_id: ffi.ForeignFunction<void, [ ref.Pointer<unknown>, string | null ]>;
    component_set_name: ffi.ForeignFunction<void, [ ref.Pointer<unknown>, string | null ]>;
    component_get_id: ffi.ForeignFunction<ref.Pointer<any>, [ ref.Pointer<unknown> ]>;

    component_frame_add_frame: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, ref.Pointer<any> ]>;
    component_frame_add_label: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null ]>;
    component_frame_add_button: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, ref.Pointer<unknown>, ref.Pointer<any> ]>;
    component_frame_add_checkbox: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, boolean, ref.Pointer<unknown> ]>;
    component_frame_add_selector: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, ref.Pointer<unknown>, number, ref.Pointer<unknown>, number, ref.Pointer<unknown>, ref.Pointer<any> ]>;
    component_frame_add_slider: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, number, number, number, ref.Pointer<unknown>, ref.Pointer<any> ]>;
    component_frame_add_input: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, ref.Pointer<unknown>, ref.Pointer<any> ]>;
    component_frame_add_image: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, number, number, ref.Pointer<unknown> ]>;
    component_frame_add_folder_selector: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, string | null, ref.Pointer<unknown> ]>;
    component_frame_add_list: ffi.ForeignFunction<ref.Pointer<unknown>, [ ref.Pointer<unknown>, string | null, ref.Pointer<unknown>, number, ref.Pointer<unknown> ]>;

    component_button_set_disabled: ffi.ForeignFunction<void, [ ref.Pointer<unknown>, boolean ]>;
    component_checkbox_get_state: ffi.ForeignFunction<boolean, [ ref.Pointer<unknown> ]>;
    component_folder_selector_get_path: ffi.ForeignFunction<ref.Pointer<any>, [ ref.Pointer<unknown> ]>;
    component_input_get_value: ffi.ForeignFunction<ref.Pointer<any>, [ ref.Pointer<unknown> ]>;
    component_list_set_items: ffi.ForeignFunction<void, [ ref.Pointer<unknown>, ref.Pointer<unknown>, number ]>;
    component_selector_get_active_index: ffi.ForeignFunction<ref.Pointer<any>, [ ref.Pointer<unknown> ]>;
    component_slider_get_value: ffi.ForeignFunction<number, [ ref.Pointer<unknown> ]>;

    destroy_all_browsers: ffi.ForeignFunction<void, []>;
    destroy_browser: ffi.ForeignFunction<void, [ ref.Pointer<unknown> ]>;
};

export function init_reflection(lib_path: string = path.join(__dirname, "../reflection/lib")): void {
    g_library = ffi.Library(path.join(lib_path, "reflection_core_c_api"), {
        "destroy_string": [ "void", [ ref.refType(unsafe_string_t) ] ],
        "destroy_array": [ "void", [ ref.refType(unsafe_int_array_t) ] ],
        
        "init_browser": [ "pointer", [ ref.refType(window_options_t), ref.refType(frame_options_t) ] ],

        "browser_window_start": [ "void" , [ "pointer" ] ],
        "browser_window_get_frame": [ "pointer" , [ "pointer" ] ],
        "browser_window_is_ready": [ "bool" , [ "pointer" ] ],
        "browser_window_register_event_handler": [ "void" , [ "pointer", "int", "pointer" ] ],
        "browser_window_set_icon": [ "void" , [ "pointer", "int" ] ],
        "browser_window_set_color": [ "void" , [ "pointer", "string" ] ],
        "browser_window_close": [ "void" , [ "pointer" ] ],

        "component_set_target": [ "void", [ "pointer", "string" ] ],
        "component_set_id": [ "void", [ "pointer", "string" ] ],
        "component_set_name": [ "void", [ "pointer", "string" ] ],
        "component_get_id": [ ref.refType(unsafe_string_t), [ "pointer" ] ],

        "component_frame_add_frame": [ "pointer", [ "pointer", "string", ref.refType(frame_options_t) ] ],
        "component_frame_add_label": [ "pointer", [ "pointer", "string" ] ],
        "component_frame_add_button": [ "pointer", [ "pointer", "string", "pointer", ref.refType(button_options_t) ] ],
        "component_frame_add_checkbox": [ "pointer", [ "pointer", "string", "bool", "pointer" ] ],
        "component_frame_add_selector": [ "pointer", [ "pointer", "string", "pointer", "int", "pointer", "int", "pointer", ref.refType(selector_options_t) ] ],
        "component_frame_add_slider": [ "pointer", [ "pointer", "string", "int", "int", "int", "pointer", ref.refType(slider_options_t) ] ],
        "component_frame_add_input": [ "pointer", [ "pointer", "string", "pointer", ref.refType(input_options_t) ] ],
        "component_frame_add_image": [ "pointer", [ "pointer", "string", "int", "int", "pointer" ] ],
        "component_frame_add_folder_selector": [ "pointer", [ "pointer", "string", "string", "pointer" ] ],
        "component_frame_add_list": [ "pointer", [ "pointer", "string", "pointer", "int", "pointer" ] ],

        "component_button_set_disabled": [ "void", [ "pointer", "bool" ] ],
        "component_checkbox_get_state": [ "bool", [ "pointer" ] ],
        "component_folder_selector_get_path": [ ref.refType(unsafe_string_t), [ "pointer" ] ],
        "component_input_get_value": [ ref.refType(unsafe_string_t), [ "pointer" ] ],
        "component_list_set_items": [ "void", [ "pointer", "pointer", "int" ] ],
        "component_selector_get_active_index": [ ref.refType(unsafe_int_array_t), [ "pointer" ] ],
        "component_slider_get_value": [ "int", [ "pointer" ] ],

        "destroy_all_browsers": [ "void", [] ],
        "destroy_browser": [ "void", [ "pointer" ] ]
    });
}

namespace utils {
    function is_string_array(value: unknown): value is string[] {
        return Array.isArray(value) && value.every(item => typeof item === "string");
    }

    function is_number_array(value: unknown): value is number[] {
        return Array.isArray(value) && value.every(item => typeof item === "number");
    }

    function convert_to_c_array_strings(list: string[]): [ Buffer, number ] {
        const string_buffers = list.map(str => Buffer.from(str + "\0", "utf-8"));
        const buffer = Buffer.alloc(string_buffers.length * ref.types.CString.size);
        
        string_buffers.forEach((buf, index) => {
            buffer.writePointer(buf, index * ref.types.CString.size);
        });
    
        return [ buffer, string_buffers.length ];
    }
    
    function convert_to_c_array_ints(list: number[]): [ Buffer, number ] {
        const buffer = Buffer.alloc(list.length * ref.types.int.size);
    
        list.forEach((num, index) => {
            buffer.writeInt32LE(num, index * ref.types.int.size);
        });
    
        return [ buffer, list.length ];
    }

    export function convert_to_c_array(list: string[] | number[]): [ any, number ] {
        return is_number_array(list) ? convert_to_c_array_ints(list) : convert_to_c_array_strings(list);
    }

    export function convert_from_c_array(arrayptr: ref.Pointer<unknown>, size: number): number[] {
        const array = Buffer.from(arrayptr.reinterpret(size * 4));
        
        const numbers = [];
        for (let i = 0; i < size; i++)
            numbers.push(array.readInt32LE(i * 4));

        return numbers;
    }
} // namespace utils

export namespace component {
    class component {
        constructor(protected thisptr: ref.Pointer<any>) {}
        
        public set_target(target: string): void {
            g_library.component_set_target(this.thisptr, target);
        }

        public set_id(id: string): void {
            g_library.component_set_id(this.thisptr, id);
        }

        public set_name(name: string): void {
            g_library.component_set_name(this.thisptr, name);
        }

        public get_id(): string {
            let out_str = "";
            const unsafe_string_ptr = g_library.component_get_id(this.thisptr);
            out_str = unsafe_string_ptr.deref().string;
            g_library.destroy_string(unsafe_string_ptr);
            return out_str;
        }
    };

    export class label extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }
    }

    export class button extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public set_disabled(state: boolean): void {
            g_library.component_button_set_disabled(this.thisptr, state);
        }
    }

    export class checkbox extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public get_state(): boolean {
            return g_library.component_checkbox_get_state(this.thisptr);
        }
    }

    export class selector extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public get_active_index(): number[] {
            const ptr = g_library.component_selector_get_active_index(this.thisptr);
            const out = utils.convert_from_c_array(ptr.deref().array, ptr.deref().size);
            g_library.destroy_array(ptr);
            return out;
        }
    }

    export class slider extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public get_value(): number {
            return g_library.component_slider_get_value(this.thisptr);
        }
    }

    export class input extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public get_value(): string {
            let out_str = "";
            const unsafe_string_ptr = g_library.component_input_get_value(this.thisptr);
            out_str = unsafe_string_ptr.deref().string;
            g_library.destroy_string(unsafe_string_ptr);
            return out_str;
        }
    }

    export class image extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }
    }
    
    export class folder_selector extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public get_path(): string {
            let out_str = "";
            const unsafe_string_ptr = g_library.component_folder_selector_get_path(this.thisptr);
            out_str = unsafe_string_ptr.deref().string;
            g_library.destroy_string(unsafe_string_ptr);
            return out_str;
        }
    }

    export class list extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public set_items(list: string[]): void {
            g_library.component_list_set_items(this.thisptr, ...utils.convert_to_c_array(list));
        }
    }

    export class frame extends component {
        constructor(thisptr: ref.Pointer<any>) {
            super(thisptr);
        }

        public add_frame(name: string, frame_options: { is_tab_list: boolean, outline: boolean, layout: frame_layout_t, max_size: boolean, align: frame_align_t, overflow: boolean, border: boolean }): frame | null {
            const _frame_options = new frame_options_t(frame_options);
            const ptr = g_library.component_frame_add_frame(this.thisptr, name, _frame_options.ref());
            return ptr.isNull() ? null : new frame(ptr);
        }

        public add_label(text: string): label | null {
            const ptr = g_library.component_frame_add_label(this.thisptr, text);
            return ptr.isNull() ? null : new label(ptr);
        }

        public add_button(name: string, callback: button_callback_t, options: { disabled: boolean, full_width: boolean }): button | null {
            const _options = new button_options_t(options);
            const ptr = g_library.component_frame_add_button(this.thisptr, name, ffi.Callback("void", [ "pointer" ], (a) => callback(a as any)), _options.ref());
            return ptr.isNull() ? null : new button(ptr);
        }

        public add_checkbox(name: string, state: boolean, callback: checkbox_callback_t): checkbox | null {
            const ptr = g_library.component_frame_add_checkbox(this.thisptr, name, state, ffi.Callback("void", [ "pointer", "bool" ], (a, b) => callback(a as any, b as any)));
            return ptr.isNull() ? null : new checkbox(ptr);
        }

        public add_selector(text: string, items: string[], active: number[], callback: selector_callback_t, options: { is_multi: boolean }): selector | null {
            const _options = new button_options_t(options);
            const ptr = g_library.component_frame_add_selector(this.thisptr, text, ...utils.convert_to_c_array(items), ...utils.convert_to_c_array(active),
                ffi.Callback("void", [ "pointer", "pointer", "int" ], (a, b, c) => {
                    callback(a as any, utils.convert_from_c_array(b as any, c as any));
                }), _options.ref());
            return ptr.isNull() ? null : new selector(ptr);
        }

        public add_slider(name: string, min: number, max: number, current: number, callback: slider_callback_t, options: { show_ticks: boolean, tick_name_left: string, tick_name_right: string }): slider | null {
            const _options = new slider_options_t(options);
            const ptr = g_library.component_frame_add_slider(this.thisptr, name, min, max, current,
                ffi.Callback("void", [ "pointer", "int" ], (a, b) => callback(a as any, b as any)), _options.ref());
            return ptr.isNull() ? null : new slider(ptr);
        }

        public add_input(text: string, callback: input_callback_t, options: { submit_button_text: string }): input | null {
            const _options = new input_options_t(options);
            const ptr = g_library.component_frame_add_input(this.thisptr, text,
                ffi.Callback("string", [ "pointer", "string" ], (a, b) => callback(a as any, b as any)), _options.ref());
            return ptr.isNull() ? null : new input(ptr);
        }

        public add_image(path_: string, width: number, height: number, callback: image_callback_t): image | null {
            const ptr = g_library.component_frame_add_image(this.thisptr, path_, width, height,
                ffi.Callback("void", [ "pointer" ], (a) => callback(a as any)));
            return ptr.isNull() ? null : new image(ptr);
        }

        public add_folder_selector(name: string, default_path: string, callback: folder_selector_callback_t): folder_selector | null {
            const ptr = g_library.component_frame_add_folder_selector(this.thisptr, name, default_path,
                ffi.Callback("void", [ "pointer", "string" ], (a, b) => callback(a as any, b as any)));
            return ptr.isNull() ? null : new folder_selector(ptr);
        }

        public add_list(name: string, items: string[], callback: list_callback_t): list | null {
            const ptr = g_library.component_frame_add_list(this.thisptr, name, ...utils.convert_to_c_array(items),
                ffi.Callback("void", [ "pointer", "int" ], (a, b) => callback(a as any, b as any)));
            return ptr.isNull() ? null : new list(ptr);
        }
    };
} // namespace component

export class browser_window {
    private thisptr: ref.Pointer<any>;

    constructor(
        window_options: { width: number, height: number, name: string },
        frame_options: { is_tab_list: boolean, outline: boolean, layout: frame_layout_t, max_size: boolean, align: frame_align_t, overflow: boolean, border: boolean }
    ) {
        const _window_options = new window_options_t(window_options);
        const _frame_options = new frame_options_t(frame_options);

        this.thisptr = g_library.init_browser(_window_options.ref(), _frame_options.ref());
    }

    public start(): void {
        g_library.browser_window_start(this.thisptr);
    }

    public get_frame(): component.frame {
        return new component.frame(g_library.browser_window_get_frame(this.thisptr));
    }

    public is_ready(): boolean {
        return g_library.browser_window_is_ready(this.thisptr);
    }

    public register_event_handler(event: event_t, handler: event_handler_t): void {
        g_library.browser_window_register_event_handler(this.thisptr, event,
            ffi.Callback("void", [ "pointer" ], (a) => handler(a as any)));
    }

    public set_icon(resource_id: number): void {
        g_library.browser_window_set_icon(this.thisptr, resource_id);
    }

    public set_color(color: string): void {
        g_library.browser_window_set_color(this.thisptr, color);
    }

    public close(): void {
        g_library.browser_window_close(this.thisptr);
    }
};