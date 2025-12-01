/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for RoboticMinds specific hardware modules.
 *     Includes: Ultrasonic, Bluetooth, Color Sensor, Sound Sensor, 8x8 Display, Wifi.
 */
'use strict';

goog.provide('Blockly.Blocks.robotic_modules');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.robotic_modules.HUE = 180;//ANTES 180

// --- Ultrasonic Sensor (HC-SR04) ---
Blockly.Blocks['ultrasonic_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ultrasonic Sensor (HC-SR04)");
        this.appendDummyInput()
            .appendField("Trig Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'TRIG_PIN');
        this.appendDummyInput()
            .appendField("Echo Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ECHO_PIN');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads distance in cm using HC-SR04 ultrasonic sensor.');
        this.setHelpUrl('https://howtomechatronics.com/tutorials/arduino/ultrasonic-sensor-hc-sr04/');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'TRIG_PIN', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'ECHO_PIN', 'digitalPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

// --- Bluetooth (HC-05/06) ---
Blockly.Blocks['bluetooth_setup'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Bluetooth Setup (HC-05/06)");
        this.appendDummyInput()
            .appendField("RX Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'RX_PIN');
        this.appendDummyInput()
            .appendField("TX Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'TX_PIN');
        this.appendDummyInput()
            .appendField("Baud Rate")
            .appendField(new Blockly.FieldDropdown([
                ['9600', '9600'], ['38400', '38400'], ['115200', '115200']]), 'BAUD');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Initializes Bluetooth module using SoftwareSerial (or Serial1 on supported boards).');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'RX_PIN', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'TX_PIN', 'digitalPins');
    }
};

Blockly.Blocks['bluetooth_available'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Bluetooth Available?");
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Checks if data is available to read from Bluetooth.');
    },
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['bluetooth_read_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Bluetooth Read String");
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads a string from Bluetooth.');
    },
    getBlockType: function () {
        return Blockly.Types.TEXT;
    }
};

Blockly.Blocks['bluetooth_send_string'] = {
    init: function () {
        this.appendValueInput("DATA")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("Bluetooth Send String");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Sends a string via Bluetooth.');
    }
};

// --- Color Sensor (TCS3200) ---
Blockly.Blocks['color_sensor_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Color Sensor (TCS3200)");
        this.appendDummyInput()
            .appendField("S0")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S0');
        this.appendDummyInput()
            .appendField("S1")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S1');
        this.appendDummyInput()
            .appendField("S2")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S2');
        this.appendDummyInput()
            .appendField("S3")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S3');
        this.appendDummyInput()
            .appendField("OUT")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'OUT');
        this.appendDummyInput()
            .appendField("Read Component")
            .appendField(new Blockly.FieldDropdown([
                ['Red', 'RED'], ['Green', 'GREEN'], ['Blue', 'BLUE']]), 'COLOR_COMP');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads RGB color component frequency.');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S0', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S1', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S2', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S3', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'OUT', 'digitalPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

// --- Sound Sensor ---
Blockly.Blocks['sound_sensor_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Sound Sensor Read");
        this.appendDummyInput()
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.analogPins), 'PIN');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads analog value from sound sensor.');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

// --- 8x8 Display (MAX7219) ---
Blockly.Blocks['display_8x8_setup'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Display 8x8 Setup (MAX7219)");
        this.appendDummyInput()
            .appendField("DIN Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'DIN');
        this.appendDummyInput()
            .appendField("CLK Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'CLK');
        this.appendDummyInput()
            .appendField("CS Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'CS');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Initializes MAX7219 8x8 LED Matrix.');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'DIN', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'CLK', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'CS', 'digitalPins');
    }
};

Blockly.Blocks['display_8x8_draw'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Display 8x8 Draw Row");
        this.appendValueInput("ROW")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("Row (0-7)");
        this.appendValueInput("BITMAP")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("Bitmap (0-255)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Draws a row on the 8x8 matrix.');
    }
};

// --- Wifi (ESP32/8266) ---
Blockly.Blocks['wifi_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Wifi Connect");
        this.appendValueInput("SSID")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("SSID");
        this.appendValueInput("PASSWORD")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("Password");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Connects to a Wifi network (ESP32/ESP8266 only).');
    }
};

Blockly.Blocks['wifi_is_connected'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Wifi Connected?");
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Checks if Wifi is connected.');
    },
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

// --- Motor (L298N / Generic H-Bridge) ---
Blockly.Blocks['motor_setup'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Motor Setup");
        this.appendDummyInput()
            .appendField("Motor Name")
            .appendField(new Blockly.FieldTextInput("Motor1"), "MOTOR_NAME");
        this.appendDummyInput()
            .appendField("IN1 Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'IN1');
        this.appendDummyInput()
            .appendField("IN2 Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'IN2');
        this.appendDummyInput()
            .appendField("EN Pin (PWM)")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwmPins), 'EN');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Configures a DC Motor with L298N driver (IN1, IN2, EN).');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'IN1', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'IN2', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'EN', 'pwmPins');
    }
};

Blockly.Blocks['motor_run'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Run Motor");
        this.appendDummyInput()
            .appendField("Motor Name")
            .appendField(new Blockly.FieldTextInput("Motor1"), "MOTOR_NAME");
        this.appendDummyInput()
            .appendField("Direction")
            .appendField(new Blockly.FieldDropdown([["Forward", "FORWARD"], ["Backward", "BACKWARD"]]), "DIRECTION");
        this.appendValueInput("SPEED")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("Speed (0-255)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Runs the motor at specified speed and direction.');
    }
};

Blockly.Blocks['motor_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Stop Motor");
        this.appendDummyInput()
            .appendField("Motor Name")
            .appendField(new Blockly.FieldTextInput("Motor1"), "MOTOR_NAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Stops the motor.');
    }
};
