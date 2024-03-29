﻿addLayer("po", {
    name: "Portal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        featureSlots: new Decimal(1),
        featureSlotsMax: new Decimal(1),
        dice: false,
        rocketFuel: false,
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Portal",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
                player.subtabs["i"]['stuff'] = 'Features'
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h1>Dice" },
            display() {
                return player.po.dice ? "<h1>The die will decide your fate.<br>On" : "<h1>The die will decide your fate.<br>Off";
            },
            canClick() { return player.po.featureSlots.gt(0) },
            unlocked() { return true },
            onClick() { 
                player.po.featureSlots = player.po.featureSlots.sub(1)
                player.po.dice = true
            },
            style: {
                width: '200px',
                "min-height": '200px',
                background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)",
                "background-origin": "border-box",
                "border-color": "#0061ff",
            },
        },
        12: {
            title() { return "<h1>Rocket Fuel" },
            display() {
                return player.po.rocketFuel ? "<h1>Fly me to the moon.<br>On" : "<h1>Fly me to the moon.<br>Off";
            },
            canClick() { return player.po.featureSlots.gt(0) },
            unlocked() { return true },
            onClick() { 
                player.po.featureSlots = player.po.featureSlots.sub(1)
                player.po.rocketFuel = true
            },
            style() {
                function degreesToRadians(degrees) {
                    return (degrees * Math.PI) / 180;
                }
                
                // Define the base hue value for dark blue (between 0 and 360 degrees)
                const darkBlueHue = 210;
                
                // Define the base lightness values for dark blue and light gray (between 0 and 100%)
                const darkBlueLightness = 20; // Adjust for darker blue
                const lightGrayLightness = 80; // Adjust for lighter gray
                
                // Calculate the current lightness value based on time (smoothly oscillating between dark blue and light gray)
                const currentTime = new Date().getTime();
                const lightnessOffset = (Math.sin(currentTime / 400) + 1) / 9; // Adjust the divisor to change oscillation speed
                const lightness1 = darkBlueLightness + (lightnessOffset * (lightGrayLightness - darkBlueLightness));
                const lightness2 = lightGrayLightness - (lightnessOffset * (lightGrayLightness - darkBlueLightness));
                
                // Create the gradient string using the HSL colors
                const gradient = `linear-gradient(to right, hsl(${darkBlueHue}, 80%, ${lightness1}%), hsl(${darkBlueHue}, 80%, ${lightness2}%))`;
                
                return {
                    width: '200px',
                    "min-height": '200px',
                    background: gradient,
                    "background-origin": "border-box",
                    "border-color": "#119B35",
                    color: "#06366e",
                }
            },
        },
    },
    bars: {
        infbar: {
            unlocked() { return true },
            direction: UP,
            width: 476,
            height: 476,
            progress() {
                return player.points.log10().div("308")
            },
            fillStyle: {
                "background-color": "#e81cff",
            },
            display() {
                return "<h1>" + format(player.points.log10().div("308").mul(100)) + "%</h5>";
            },
        },
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Otherworldly Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.po.featureSlots) + "/" + formatWhole(player.po.featureSlotsMax) + "</h3> free feature slots." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 11], ["clickable", 12]]],
                ]

            },
            "???": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["bar", "infbar"]]],
                ]

            },
        },
    }, 

    tabFormat: [
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true }
})