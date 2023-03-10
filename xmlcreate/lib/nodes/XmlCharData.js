"use strict";
/**
 * Copyright (C) 2016-2019 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../error");
var escape_1 = require("../escape");
var validate_1 = require("../validate");
/**
 * Represents character data.
 *
 * Restricted characters, such as the ampersand (`&`), the opening angle
 * bracket (`<`), and the closing angle bracket (`>`) when it appears in the
 * string `]]>`, are all automatically escaped.
 */
var XmlCharData = /** @class */ (function () {
    function XmlCharData(parent, validation, options) {
        this._validation = validation;
        if (!(0, validate_1.isUndefined)(options.replaceInvalidCharsInCharData)) {
            this._replaceInvalidCharsInCharData = (options.replaceInvalidCharsInCharData);
        }
        else {
            this._replaceInvalidCharsInCharData = false;
        }
        this._parent = parent;
        this.charData = options.charData;
    }
    Object.defineProperty(XmlCharData.prototype, "charData", {
        /**
         * Gets the text of this character data.
         */
        get: function () {
            return this._charData;
        },
        /**
         * Sets the text of this character data.
         */
        set: function (charData) {
            if (this._replaceInvalidCharsInCharData) {
                charData = (0, validate_1.fixChar)(charData);
            }
            else if (this._validation && !(0, validate_1.validateChar)(charData)) {
                throw new Error((0, error_1.getContext)(this.up()) + ": character data"
                    + ("\"" + charData + "\" should not contain characters not")
                    + " allowed in XML");
            }
            this._charData = charData;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns an XML string representation of this character data.
     */
    XmlCharData.prototype.toString = function () {
        var str = this._charData;
        str = (0, escape_1.escapeAmpersands)(str);
        str = (0, escape_1.escapeLeftAngleBrackets)(str);
        str = (0, escape_1.escapeRightAngleBracketsInCdataTerminator)(str);
        return str;
    };
    /**
     * Returns the parent of this character data.
     */
    XmlCharData.prototype.up = function () {
        return this._parent;
    };
    return XmlCharData;
}());
exports.default = XmlCharData;
