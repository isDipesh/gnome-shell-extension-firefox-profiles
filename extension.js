const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;

function FirefoxProfiles() {
    this._init();
}

FirefoxProfiles.prototype = {
    __proto__: PanelMenu.SystemStatusButton.prototype,

    _init: function() {
        PanelMenu.SystemStatusButton.prototype._init.call(this, 'start-here');
        this._button = new St.Button();
        this._button.set_child(new St.Icon({
            icon_name: 'firefox',
            icon_type: St.IconType.FULLCOLOR,
            icon_size: 17
        }));
        this._button.connect('clicked', Lang.bind(this, function () {
            Util.spawn(['firefox','-no-remote','-profilemanager']);
        }));
    }
};

let firefoxProfiles;

function enable() {
    firefoxProfiles = new FirefoxProfiles();
    let _children = Main.panel._leftBox.get_children();
    Main.panel._leftBox.insert_child_at_index(firefoxProfiles._button, _children.length - 1);
}

function disable() {
    Main.panel._leftBox.remove_actor(firefoxProfiles._button);
    firefoxProfiles.destroy();
}

function init() {
    // do nothing
}

