/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require("ref");

export var init = ($mdThemingProvider: angular.material.IThemingProvider) => {
    $mdThemingProvider.definePalette("darkPaletteName", {
        "0": "fff",
        "50": "fff",
        "100": "fff",
        "200": "fff",
        "300": "000",
        "400": "000",
        "500": "000",
        "600": "000",
        "700": "000",
        "800": "000",
        "900": "000",
        "A100": "000",
        "A200": "000",
        "A400": "000",
        "A700": "000",
        "contrastDefaultColor": "light",
        "contrastDarkColors": ["50", "100", "200", "300", "400", "A100"],
        "contrastLightColors": undefined
    });
    $mdThemingProvider.theme("dark")
        .primaryPalette("darkPaletteName");
};