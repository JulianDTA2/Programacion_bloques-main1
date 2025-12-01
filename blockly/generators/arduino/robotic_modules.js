/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for RoboticMinds specific hardware modules.
 */
'use strict';

goog.provide('Blockly.Arduino.robotic_modules');

goog.require('Blockly.Arduino');

// --- Ultrasonic Sensor (HC-SR04) ---
Blockly.Arduino['ultrasonic_read'] = function (block) {
    var trigPin = block.getFieldValue('TRIG_PIN');
    var echoPin = block.getFieldValue('ECHO_PIN');

    Blockly.Arduino.reservePin(
        block, trigPin, Blockly.Arduino.PinTypes.OUTPUT, 'Ultrasonic Trig');
    Blockly.Arduino.reservePin(
        block, echoPin, Blockly.Arduino.PinTypes.INPUT, 'Ultrasonic Echo');

    Blockly.Arduino.addSetup('ultrasonic_' + trigPin + '_' + echoPin,
        'pinMode(' + trigPin + ', OUTPUT);\n' +
        '  pinMode(' + echoPin + ', INPUT);', false);

    var functionName = Blockly.Arduino.addFunction(
        'readUltrasonicDistance',
        'long readUltrasonicDistance(int trigPin, int echoPin) {\n' +
        '  digitalWrite(trigPin, LOW);\n' +
        '  delayMicroseconds(2);\n' +
        '  digitalWrite(trigPin, HIGH);\n' +
        '  delayMicroseconds(10);\n' +
        '  digitalWrite(trigPin, LOW);\n' +
        '  long duration = pulseIn(echoPin, HIGH);\n' +
        '  return duration * 0.034 / 2;\n' +
        '}');

    var code = functionName + '(' + trigPin + ', ' + echoPin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// --- Bluetooth (HC-05/06) ---
Blockly.Arduino['bluetooth_setup'] = function (block) {
    var rxPin = block.getFieldValue('RX_PIN');
    var txPin = block.getFieldValue('TX_PIN');
    var baud = block.getFieldValue('BAUD');

    Blockly.Arduino.reservePin(
        block, rxPin, Blockly.Arduino.PinTypes.INPUT, 'Bluetooth RX');
    Blockly.Arduino.reservePin(
        block, txPin, Blockly.Arduino.PinTypes.OUTPUT, 'Bluetooth TX');

    Blockly.Arduino.addInclude('bluetooth_lib',
        '#if defined(ESP32)\n' +
        '  #include <HardwareSerial.h>\n' +
        '  HardwareSerial BTSerial(1);\n' +
        '#else\n' +
        '  #include <SoftwareSerial.h>\n' +
        '  SoftwareSerial BTSerial(' + rxPin + ', ' + txPin + ');\n' +
        '#endif');

    var setupCode = '';
    setupCode += '#if defined(ESP32)\n';
    setupCode += '  BTSerial.begin(' + baud + ', SERIAL_8N1, ' + rxPin + ', ' + txPin + ');\n';
    setupCode += '#else\n';
    setupCode += '  BTSerial.begin(' + baud + ');\n';
    setupCode += '#endif\n';

    Blockly.Arduino.addSetup('bluetooth_init', setupCode, false);

    return '';
};

Blockly.Arduino['bluetooth_available'] = function (block) {
    var code = 'BTSerial.available()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_read_string'] = function (block) {
    var code = 'BTSerial.readString()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_send_string'] = function (block) {
    var data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '""';
    var code = 'BTSerial.print(' + data + ');\n';
    return code;
};

// --- Color Sensor (TCS3200) ---
Blockly.Arduino['color_sensor_read'] = function (block) {
    var s0 = block.getFieldValue('S0');
    var s1 = block.getFieldValue('S1');
    var s2 = block.getFieldValue('S2');
    var s3 = block.getFieldValue('S3');
    var out = block.getFieldValue('OUT');
    var colorComp = block.getFieldValue('COLOR_COMP');

    Blockly.Arduino.reservePin(block, s0, Blockly.Arduino.PinTypes.OUTPUT, 'Color S0');
    Blockly.Arduino.reservePin(block, s1, Blockly.Arduino.PinTypes.OUTPUT, 'Color S1');
    Blockly.Arduino.reservePin(block, s2, Blockly.Arduino.PinTypes.OUTPUT, 'Color S2');
    Blockly.Arduino.reservePin(block, s3, Blockly.Arduino.PinTypes.OUTPUT, 'Color S3');
    Blockly.Arduino.reservePin(block, out, Blockly.Arduino.PinTypes.INPUT, 'Color OUT');

    Blockly.Arduino.addSetup('color_sensor_init_' + out,
        'pinMode(' + s0 + ', OUTPUT);\n' +
        '  pinMode(' + s1 + ', OUTPUT);\n' +
        '  pinMode(' + s2 + ', OUTPUT);\n' +
        '  pinMode(' + s3 + ', OUTPUT);\n' +
        '  pinMode(' + out + ', INPUT);\n' +
        '  // Set frequency scaling to 20%\n' +
        '  digitalWrite(' + s0 + ', HIGH);\n' +
        '  digitalWrite(' + s1 + ', LOW);', false);

    var filterCode = '';
    if (colorComp === 'RED') {
        filterCode = 'digitalWrite(' + s2 + ', LOW); digitalWrite(' + s3 + ', LOW);';
    } else if (colorComp === 'GREEN') {
        filterCode = 'digitalWrite(' + s2 + ', HIGH); digitalWrite(' + s3 + ', HIGH);';
    } else if (colorComp === 'BLUE') {
        filterCode = 'digitalWrite(' + s2 + ', LOW); digitalWrite(' + s3 + ', HIGH);';
    }

    var functionName = Blockly.Arduino.addFunction(
        'readColor_' + colorComp,
        'int readColor_' + colorComp + '(int s2, int s3, int out) {\n' +
        '  ' + filterCode + '\n' +
        '  return pulseIn(out, LOW);\n' +
        '}');

    var code = functionName + '(' + s2 + ', ' + s3 + ', ' + out + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// --- Sound Sensor ---
Blockly.Arduino['sound_sensor_read'] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.INPUT, 'Sound Sensor');
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// --- 8x8 Display (MAX7219) ---
Blockly.Arduino['display_8x8_setup'] = function (block) {
    var din = block.getFieldValue('DIN');
    var clk = block.getFieldValue('CLK');
    var cs = block.getFieldValue('CS');

    Blockly.Arduino.addDeclaration('display_8x8_pins',
        'const int DIN_PIN = ' + din + ';\n' +
        'const int CLK_PIN = ' + clk + ';\n' +
        'const int CS_PIN = ' + cs + ';');

    Blockly.Arduino.addSetup('display_8x8_pins_mode',
        'pinMode(DIN_PIN, OUTPUT);\n' +
        '  pinMode(CLK_PIN, OUTPUT);\n' +
        '  pinMode(CS_PIN, OUTPUT);', false);

    var funcName = Blockly.Arduino.addFunction(
        'max7219_write',
        'void max7219_write(int din, int clk, int cs, byte address, byte data) {\n' +
        '  digitalWrite(cs, LOW);\n' +
        '  shiftOut(din, clk, MSBFIRST, address);\n' +
        '  shiftOut(din, clk, MSBFIRST, data);\n' +
        '  digitalWrite(cs, HIGH);\n' +
        '}');

    Blockly.Arduino.addSetup('display_8x8_init',
        funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x09, 0x00); // Decode mode: none\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0B, 0x07); // Scan limit: all digits\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0C, 0x01); // Shutdown: normal operation\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0A, 0x0F); // Intensity: max\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0F, 0x00); // Display test: off', false);

    return '';
};

Blockly.Arduino['display_8x8_draw'] = function (block) {
    var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bitmap = Blockly.Arduino.valueToCode(block, 'BITMAP', Blockly.Arduino.ORDER_ATOMIC) || '0';
    return 'max7219_write(DIN_PIN, CLK_PIN, CS_PIN, ' + row + ' + 1, ' + bitmap + ');\n';
};

// --- Wifi (ESP32/8266) ---
Blockly.Arduino['wifi_connect'] = function (block) {
    var ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
    var password = Blockly.Arduino.valueToCode(block, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.addInclude('wifi_lib',
        '#if defined(ESP32)\n' +
        '  #include <WiFi.h>\n' +
        '#elif defined(ESP8266)\n' +
        '  #include <ESP8266WiFi.h>\n' +
        '#endif');

    var setupCode =
        '#if defined(ESP32) || defined(ESP8266)\n' +
        '  WiFi.begin(' + ssid + ', ' + password + ');\n' +
        '  // Wait for connection (non-blocking in setup usually, but here we might want to wait)\n' +
        '#endif\n';

    Blockly.Arduino.addSetup('wifi_begin', setupCode, false);

    return '';
};

Blockly.Arduino['wifi_is_connected'] = function (block) {
    var code = '(WiFi.status() == WL_CONNECTED)';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// --- Motor (L298N / Generic H-Bridge) ---
Blockly.Arduino['motor_setup'] = function (block) {
    var motorName = block.getFieldValue('MOTOR_NAME');
    var in1 = block.getFieldValue('IN1');
    var in2 = block.getFieldValue('IN2');
    var en = block.getFieldValue('EN');

    var cleanName = motorName.replace(/[^a-zA-Z0-9_]/g, '');

    Blockly.Arduino.reservePin(block, in1, Blockly.Arduino.PinTypes.OUTPUT, 'Motor ' + cleanName + ' IN1');
    Blockly.Arduino.reservePin(block, in2, Blockly.Arduino.PinTypes.OUTPUT, 'Motor ' + cleanName + ' IN2');
    Blockly.Arduino.reservePin(block, en, Blockly.Arduino.PinTypes.OUTPUT, 'Motor ' + cleanName + ' EN');

    Blockly.Arduino.addDeclaration('motor_pins_' + cleanName,
        'const int ' + cleanName + '_IN1 = ' + in1 + ';\n' +
        'const int ' + cleanName + '_IN2 = ' + in2 + ';\n' +
        'const int ' + cleanName + '_EN = ' + en + ';');

    Blockly.Arduino.addSetup('motor_setup_' + cleanName,
        'pinMode(' + cleanName + '_IN1, OUTPUT);\n' +
        '  pinMode(' + cleanName + '_IN2, OUTPUT);\n' +
        '  pinMode(' + cleanName + '_EN, OUTPUT);', false);

    return '';
};

Blockly.Arduino['motor_run'] = function (block) {
    var motorName = block.getFieldValue('MOTOR_NAME');
    var direction = block.getFieldValue('DIRECTION');
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var cleanName = motorName.replace(/[^a-zA-Z0-9_]/g, '');

    var code = '';
    if (direction === 'FORWARD') {
        code += 'digitalWrite(' + cleanName + '_IN1, HIGH);\n';
        code += 'digitalWrite(' + cleanName + '_IN2, LOW);\n';
    } else {
        code += 'digitalWrite(' + cleanName + '_IN1, LOW);\n';
        code += 'digitalWrite(' + cleanName + '_IN2, HIGH);\n';
    }
    code += 'analogWrite(' + cleanName + '_EN, ' + speed + ');\n';

    return code;
};

Blockly.Arduino['motor_stop'] = function (block) {
    var motorName = block.getFieldValue('MOTOR_NAME');
    var cleanName = motorName.replace(/[^a-zA-Z0-9_]/g, '');

    var code = 'digitalWrite(' + cleanName + '_IN1, LOW);\n';
    code += 'digitalWrite(' + cleanName + '_IN2, LOW);\n';
    code += 'analogWrite(' + cleanName + '_EN, 0);\n';

    return code;
};
