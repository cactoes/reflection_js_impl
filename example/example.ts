import * as ffi from "ffi-napi";
import * as ref from "ref-napi";
import * as struct from "ref-struct-napi";
import * as reflection from "reflection_ui";

function start_message_loop() {
    const MSG = struct({
        hwnd: "pointer",
        message: "int",
        wParam: "pointer",
        lParam: "pointer",
        time: "int",
        pt: struct({
            x: "int",
            y: "int"
        })
    });
    
    const user32 = ffi.Library("user32.dll", {
        "GetMessageA": [ "int", [ "pointer", "pointer", "uint", "uint" ] ],
        "TranslateMessage": [ "int", [ "pointer" ] ],
        "DispatchMessageA": [ "pointer", [ "pointer " ]]
    });
    
    const msg = ref.alloc(MSG);

    while (user32.GetMessageA(msg, null, 0, 0) != 0) {
        user32.TranslateMessage(msg);
        user32.DispatchMessageA(msg);
    }
}

function main(argv: string[], argc: number): number {
    reflection.init_reflection();

    const window = new reflection.browser_window({
        width: 600,
        height: 700,
        name: "example window"
    }, {
        is_tab_list: false,
        outline: true,
        layout: 1,
        max_size: false,
        align: 0,
        overflow: false,
        border: true
    });

    window.register_event_handler(reflection.event_t.E_ON_RENDER_FINISHED, (ptr) => {
        console.log("render finished");
    });

    const list = window.get_frame().add_button("button", (handle) => {
        console.log("clicked\n");
    }, { disabled: false, full_width: false });

    window.start();

    start_message_loop();

    return 0;
}

process.exit(main(process.argv, process.argv.length));