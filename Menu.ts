import "frida-il2cpp-bridge";

type MenuSettings = {
    rainbow: boolean;
    fps: boolean;
    colors: boolean;
};

const settings: MenuSettings = {
    rainbow: false,
    fps: false,
    colors: false
};

let menuOpen = false;

function toggleMenu(): void {
    menuOpen = !menuOpen;

    console.log(
        `Cube Deluxe Menu: ${menuOpen ? "OPEN" : "CLOSED"}`
    );
}

function toggleMod(name: keyof MenuSettings): void {
    settings[name] = !settings[name];

    console.log(
        `${name}: ${settings[name] ? "ON" : "OFF"}`
    );
}

Il2Cpp.perform(() => {
    console.log("Cube Deluxe menu initialized!");

    const core = Il2Cpp.domain.assembly(
        "UnityEngine.CoreModule"
    ).image;

    const gameObject = core.class("UnityEngine.GameObject");

    console.log("GameObject:", gameObject.name);

    toggleMenu();
    toggleMod("rainbow");
}, "main");