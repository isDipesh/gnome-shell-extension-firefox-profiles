const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;
//gnome 3.0
const Panel = imports.ui.panel;

function FirefoxProfiles() {
    this._init();
}

FirefoxProfiles.prototype = {
__proto__: PanelMenu.SystemStatusButton.prototype,

    _init: function() {

    PanelMenu.SystemStatusButton.prototype._init.call(this,'firefox-profiles');
        this._button = new St.BoxLayout({ name: 'firefox-profiles'});

        let icon = new St.Icon({ icon_name: 'firefox',
                                 icon_type: St.IconType.FULLCOLOR,
                                 icon_size: 17});

        icon.reactive = true;
        icon.connect('button-press-event', Lang.bind(this, function () {
              Util.spawn(['firefox','-no-remote','-profilemanager']);
            return true;
        }));

        this._button.add_actor(icon);
        this._button.set_tooltip_text('Firefox Profiles Chooser');

        let _children = Main.panel._leftBox.get_children();
        Main.panel._leftBox.insert_actor(this._button, _children.length - 1);
    },
};

function init(extensionMeta) {
    //do nothing
}

//gnome3.0
function main() {
    Panel.STANDARD_TRAY_ICON_ORDER.unshift('firefox-profiles');
    Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION['firefox-profiles'] = FirefoxProfiles;
}

let indicator;

function enable() {
    indicator = new FirefoxProfiles();
    Main.panel.addToStatusArea('firefox-profiles', indicator);
}

function disable() {
    indicator.destroy();
    indicator = null;
}