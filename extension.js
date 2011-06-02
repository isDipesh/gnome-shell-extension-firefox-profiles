const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;

function FirefoxProfilesButton() {
    this._init();
}

FirefoxProfilesButton.prototype = {
    _button: null,

    _init: function() {

        this._button = new St.BoxLayout({ name: 'firefox-profiles-button'});

        let icon = new St.Icon({ icon_name: 'firefox',
                                 icon_type: St.IconType.FULLCOLOR,
                                 icon_size: Main.panel.button.height});

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

function main() {
    new FirefoxProfilesButton();
}
