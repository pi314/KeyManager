NUMBER = '1234567890';
LOWER = 'abcdefghijklmnopqrstuvwxyz';
UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
ALPHABET = LOWER + UPPER;
ARROW = ['UP', 'LEFT', 'RIGHT', 'DOWN'],
CONTROL = ['SHIFT',   'CTRL',      'ALT',
           'CAPSLOCK','BACKSPACE', 'TAB',   'ENTER',
           'INSERT',  'DELETE',    'ESC',
           'PGUP',    'PGDN',      'END',   'HOME',
           'LEFT',    'UP',        'RIGHT', 'DOWN',
           'F1',      'F2',        'F3',    'F4',
           'F5',      'F6',        'F7',    'F8',
           'F9',      'F10',       'F11',   'F12'
          ],
SYMBOL = ['`~!@#$%^&*()-=_+[]{}|;\':",./<>?', 'BACKSLASH']
console.log('KeyManager provides:');
console.log('NUMBER:', NUMBER);
console.log('LOWER:', LOWER);
console.log('UPPER:', UPPER);
console.log('ALPHABET:', ALPHABET);
console.log('ARROW:', ARROW);
console.log('CONTROL:', CONTROL);
console.log('Methods: keydown(), keyup(), namespace(), scroll_down(), scroll_up()');

KeyManager = (function () {
    var _alias_key_table = {
        'NUMBER' : '1234567890',
        'LOWER'  : 'abcdefghijklmnopqrstuvwxyz',
        'UPPER'  : 'ABCDEFGHIJKLMNOPQRTSUVWXYZ',
        'ALPHABET':'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ',
        'ARROW'  : ['UP', 'LEFT', 'RIGHT', 'DOWN'],
        'CONTROL': ['SHIFT',   'CTRL',      'ALT',
            'CAPSLOCK','BACKSPACE', 'TAB',   'ENTER',
            'INSERT',  'DELETE',    'ESC',
            'PGUP',    'PGDN',      'END',   'HOME',
            'LEFT',    'UP',        'RIGHT', 'DOWN',
            'F1',      'F2',        'F3',    'F4',
            'F5',      'F6',        'F7',    'F8',
            'F9',      'F10',       'F11',   'F12'
        ],
        'SYMBOL' : ['`~!@#$%^&*()-=_+[]{}|;\':",./<>?', 'BACKSLASH'],
    };

    var _named_key_list = {
        'SHIFT':'',   'CTRL':'',      'ALT':'',
        'CAPSLOCK':'','BACKSPACE':'', 'TAB':'',   'ENTER':'',
        'INSERT':'',  'DELETE':'',    'ESC':'',
        'PGUP':'',    'PGDN':'',      'END':'',   'HOME':'',
        'LEFT':'',    'UP':'',        'RIGHT':'', 'DOWN' :'',
        'F1':'',      'F2':'',        'F3':'',    'F4':'',
        'F5':'',      'F6':'',        'F7':'',    'F8':'',
        'F9':'',      'F10':'',       'F11':'',   'F12' :'',
        'BACKSLASH':''};

    var _shift_alias_table = {
        '~':'`', '!':'1', '@':'2', '#':'3', '$':'4', '%':'5',
        '^':'6', '&':'7', '*':'8', '(':'9', ')':'0', '_':'-',
        '+':'=', 'Q':'q', 'W':'w', 'E':'e', 'R':'r', 'T':'t',
        'Y':'y', 'U':'u', 'I':'i', 'O':'o', 'P':'p', '{':'[',
        '}':']', '|':'BACKSLASH', 'A':'a', 'S':'s', 'D':'d', 'F':'f',
        'G':'g', 'H':'h', 'J':'j', 'K':'k', 'L':'l', ':':';',
        'Z':'z', 'X':'x', 'C':'c', 'V':'v', 'B':'b', 'N':'n',
        'M':'m', '<':',', '>':'.', '?':'/', '"':'\''
    };

    var _reverse_shift_alias_table = {
        '`':'~', '1':'!', '2':'@', '3':'#', '4':'$', '5':'%',
        '6':'^', '7':'&', '8':'*', '9':'(', '0':')', '-':'_',
        '=':'+', 'q':'Q', 'w':'W', 'e':'E', 'r':'R', 't':'T',
        'y':'Y', 'u':'U', 'i':'I', 'o':'O', 'p':'P', '[':'{',
        ']':'}', 'BACKSLASH':'|','a':'A', 's':'S', 'd':'D', 'f':'F',
        'g':'G', 'h':'H', 'j':'J', 'k':'K', 'l':'L', ';':':',
        'z':'Z', 'x':'X', 'c':'C', 'v':'V', 'b':'B', 'n':'N',
        'm':'M', ',':'<', '.':'>', '/':'?', '\'':'"'
    };

    var _key_code_table = {
        8:'BACKSPACE',        9 :'TAB',        13:'ENTER',
        16:'SHIFT',           17:'CTRL',       18:'ALT',
        20:'CAPSLOCK',
        27:'ESC',             32:' ',      33:'PGUP',
        34:'PGDN',            35:'END',        36:'HOME',
        37:'LEFT',            38:'UP',         39:'RIGHT',
        40:'DOWN',            45:'INSERT',     46:'DELETE',
        112:'F1',             113:'F2',        114:'F3',
        115:'F4',             116:'F5',        117:'F6',
        118:'F7',             119:'F8',        120:'F9',
        121:'F10',            122:'F11',       123:'F12',
        186:';',              187:'=',         188:',',
        189:'-',              190:'.',         191:'/',
        192:'`',              219:'[',         220:'BACKSLASH',
        221:']',              222:'\'',
    };

    var _keydown_table = {};
    var _ctrl_keydown_table = {};
    var _alt_keydown_table = {};
    var _shift_keydown_table = {};
    var _keyup_table = {};
    var _ctrl_keyup_table = {};
    var _alt_keyup_table = {};
    var _shift_keyup_table = {};
    var _ctrl_state = false;
    var _shift_state = false;
    var _alt_state = false;
    var _caps_state = false;

    var _cur_namespace = '__DEFAULT__';

    var _shift_alias_key = function (key) {
        if (key in _shift_alias_table) {
            return '<S-'+_shift_alias_table[key]+'>';
        }
        return key;
    };

    var _reverse_shift_alias_key = function (key) {
        if (key in _reverse_shift_alias_table) {
            return _reverse_shift_alias_table[key];
        }
        return key;
    };

    var _named_key = function (key) {
        if (key in _named_key_list) return true;
        return false;
    };

    var _combine_key = function (key) {
        if (/<.-.*>/.test(key)) return true;
        return false;
    };

    var _alias_key = function (key) {
        if (key in _alias_key_table) return _alias_key_table[key];
        return key;
    };

    var _parseCode = function (input) {
        if (typeof input !== 'number') return 'UNKNOWN';
        if (input in _key_code_table) {
            return _key_code_table[input];
        } else if (65 <= input && input <= 90) {
            return 'abcdefghijklmnopqrstuvwxyz'[input-65];
        } else if (48 <= input && input <= 57) {
            return '0123456789'[input-48];
        }
        console.log(input);
        return 'UNKNOWN';
    };

    var _parse_key = function (key) {
        if (/<C-.>/.test(key)) {
            return ['CTRL', key[3]];
        }
        if (/<S-.*>/.test(key)) {
            return ['SHIFT', key.substring(3, key.length-1)];
        }
        if (/<A-.>/.test(key)) {
            return ['ALT', key[3]];
        }
        return ['NORMAL', key];
    };

    var _add_namespace = function (i) {
        if (_keydown_table[i]       == undefined) {       _keydown_table[i] = {}; }
        if (_ctrl_keydown_table[i]  == undefined) {  _ctrl_keydown_table[i] = {}; }
        if (_alt_keydown_table[i]   == undefined) {   _alt_keydown_table[i] = {}; }
        if (_shift_keydown_table[i] == undefined) { _shift_keydown_table[i] = {}; }
        if (_keyup_table[i]         == undefined) {       _keyup_table[i]   = {}; }
        if (_ctrl_keyup_table[i]    == undefined) {  _ctrl_keyup_table[i]   = {}; }
        if (_alt_keyup_table[i]     == undefined) {   _alt_keyup_table[i]   = {}; }
        if (_shift_keyup_table[i]   == undefined) { _shift_keyup_table[i]   = {}; }
        if (_wheel_down[i]          == undefined) {   _wheel_down[i]        = {}; }
        if (_wheel_up[i]            == undefined) { _wheel_up[i]            = {}; }
    };

    var _keydown = function (event) {
        var k = _parseCode(event.which);
        if (k == 'CTRL') {
            _ctrl_state = true;
        } else if (k == 'ALT') {
            _alt_state = true;
        } else if (k == 'SHIFT') {
            _shift_state = true;
        }

        var target_table = null;
        var key_string = '';
        if (_ctrl_state && k != 'CTRL') {
            target_table = _ctrl_keydown_table[_cur_namespace];
            key_string = '<C-'+k+'>';
        } else if (_alt_state && k != 'ALT') {
            target_table = _alt_keydown_table[_cur_namespace];
            key_string = '<A-'+k+'>';
        } else if (_shift_state && k != 'SHIFT') {
            target_table = _shift_keydown_table[_cur_namespace];
            key_string = _reverse_shift_alias_key(k);
        } else {
            target_table = _keydown_table[_cur_namespace];
            key_string = k;
        }

        if (key_string == '<C-[>') {
            if ('ESC' in _keydown_table[_cur_namespace]) {
                return _keydown_table[_cur_namespace]['ESC']('ESC');
            }
        }
        if (key_string == '<C-h>') {
            if ('BACKSPACE' in _keydown_table[_cur_namespace]) {
                _keydown_table[_cur_namespace]['BACKSPACE']('BACKSPACE');
                return false;
            }
        }
        if (k in target_table) {
            var ret = target_table[k](key_string);
            if (key_string == 'F5' || key_string == 'F12') return true;
            if (ret == undefined) return false;
            return ret;
        }
        //if (/<.-.*>/.test(key_string)) return false;
        return true;
    };

    var _keyup = function (event) {
        var k = _parseCode(event.which);
        if (k == 'CTRL') {
            _ctrl_state = false;
        } else if (k == 'ALT') {
            _alt_state = false;
        } else if (k == 'SHIFT') {
            _shift_state = false;
        } else if (k == 'CAPSLOCK') {
            _caps_state = !_caps_state;
        }

        var target_table = null;
        var key_string = '';
        if (_ctrl_state && k != 'CTRL') {
            target_table = _ctrl_keyup_table[_cur_namespace];
            key_string = '<C-'+k+'>';
        } else if (_alt_state && k != 'ALT') {
            target_table = _alt_keyup_table[_cur_namespace];
            key_string = '<A-'+k+'>';
        } else if (_shift_state && k != 'SHIFT') {
            target_table = _shift_keyup_table[_cur_namespace];
            key_string = _reverse_shift_alias_key(k);
        } else {
            target_table = _keyup_table[_cur_namespace];
            key_string = k;
        }

        if (key_string == '<C-[>') {
            if ('ESC' in _keyup_table[_cur_namespace]) {
                return _keyup_table[_cur_namespace]['ESC']('ESC');
            }
        }
        if (key_string == '<C-h>') {
            if ('BACKSPACE' in _keyup_table[_cur_namespace]) {
                _keydown_table[_cur_namespace]['BACKSPACE']('BACKSPACE');
                return false;
            }
        }
        if (k in target_table) {
            var ret = target_table[k](key_string);
            if (key_string == 'F5' || key_string == 'F12') return true;
            if (ret == undefined) return false;
            return ret;
        }
        //if (/<.-.*>/.test(key_string)) return false;
        return true;
    };

    var _bind = function (key, edge, callback) {
        var key_tuple = _parse_key(key);
        var key_type = key_tuple[0];
        var key_content = key_tuple[1];
        var target_table = null;

        if (edge == 'DOWN') {
            if (key_type == 'NORMAL') {
                target_table = _keydown_table[_cur_namespace];
            } else if (key_type == 'CTRL') {
                target_table = _ctrl_keydown_table[_cur_namespace];
            } else if (key_type == 'ALT') {
                target_table = _alt_keydown_table[_cur_namespace];
            } else if (key_type == 'SHIFT') {
                target_table = _shift_keydown_table[_cur_namespace];
            }
        }

        if (edge == 'UP') {
            if (key_type == 'NORMAL') {
                target_table = _keyup_table[_cur_namespace];
            } else if (key_type == 'CTRL') {
                target_table = _ctrl_keyup_table[_cur_namespace];
            } else if (key_type == 'ALT') {
                target_table = _alt_keyup_table[_cur_namespace];
            } else if (key_type == 'SHIFT') {
                target_table = _shift_keyup_table[_cur_namespace];
            }
        }
        if (target_table != null) {
            target_table[key_content] = callback;
        }
        //if (key_content == 'ESC') {
        //    console.log('detect esc');
        //    if (edge == 'DOWN') {
        //        _ctrl_keydown_table['['] = callback;
        //    } else if (edge == 'UP') {
        //        _ctrl_keyup_table['['] = callback;
        //    }
        //}
    };

    // Some important bindings to browser
    $(window).blur(function () {
        _ctrl_state = false;
        _shift_state = false;
        _caps_state = false;
        _alt_state = false;
        console.log('blured and reset');
    });

    $(function () {
        $(document).keydown(_keydown).keyup(_keyup);

        $('body').bind('mousewheel DOMMouseScroll', function(event) {
            //var delta = event.originalEvent.wheelDelta || (-event.detail);
            var delta = 0;
            if (event.originalEvent.detail) { // Firefox
                delta = -event.originalEvent.detail;
            } else if (event.originalEvent.wheelDelta) { // Chrome, IE
                delta = event.originalEvent.wheelDelta;
            }
            if (delta > 0) {
                if (_cur_namespace in _wheel_up) {
                    return _wheel_up[_cur_namespace]();
                }
            } else if (delta < 0) {
                if (_cur_namespace in _wheel_down) {
                    return _wheel_down[_cur_namespace]();
                }
            }
            return true;
        });
    });

    var _wheel_up = {};
    var _wheel_down = {};

    _add_namespace(_cur_namespace);

    _wheel_up[_cur_namespace]   = function(){return true;};
    _wheel_down[_cur_namespace] = function(){return true;};

    return {
        keydown : function (key, callback) {
            key = _alias_key(key);
            if (key instanceof Array) { // give an array to bind
                for (i in key) {
                    this.keydown(key[i], callback);
                }
            } else if (_named_key(key) || _combine_key(key)) { // special key and combine key
                _bind(key, 'DOWN', callback);
            } else if (key.length > 1 && !/<.-.*>/.test(key)) {
                for (var i in key) {
                    _bind(_shift_alias_key(key[i]), 'DOWN', callback);
                }
            } else {
                // translate shifted-keys like '!' to '<S-1>'
                // but normal key doesn't change like '1' to '1'
                _bind(_shift_alias_key(key), 'DOWN', callback);
            }
            return KeyManager;
        },
        keyup : function (key, callback) {
            key = _alias_key(key);
            if (key instanceof Array) { // give an array to bind
                for (i in key) {
                    this.keyup(key[i], callback);
                }
            } else if (_named_key(key) || _combine_key(key)) { // special key and combine key
                _bind(key, 'UP', callback);
            } else if (key.length > 1 && !/<.-*>/.test(key)) {
                for (var i in key) {
                    _bind(_shift_alias_key(key[i]), 'UP', callback);
                }
            } else {
                // translate shifted-keys like '!' to '<S-1>'
                // but normal key doesn't change like '1' to '1'
                _bind(_shift_alias_key(key), 'UP', callback);
            }
            return KeyManager;
        },
        namespace : function (i) {
            if (i == undefined) {
                i = '__DEFAULT__';
            }
            _cur_namespace = i;
            _add_namespace(_cur_namespace);
            return KeyManager;
        },
        scroll_down: function (i) {
            _wheel_down[_cur_namespace] = i;
            return KeyManager;
        },
        scroll_up: function (i) {
            _wheel_up[_cur_namespace] = i;
            return KeyManager;
        },
    };
})();
