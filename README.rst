==========
KeyManager
==========

This is a little JavaScript module I made to conveniontly manage keyboard events in webpages.

Still some bugs, I will keep working on it to make it better :)

*This module depents on jQuery, so remember include jQuery when used.*

I really not familiar with JavaScript, so I'm not sure which version of jQuery should be used,
at least jQuery 1.6.2 works fine.

Usage
-----
This module creates a global object named KeyManager,
which provide some method to manage keydown and keyup events.

Usage:

::

    KeyManager.keydown(key, callback);
    KeyManager.keyup(key, callback);
    KeyManager.keyup(key, callback).keyup(key, callback)...;

The argument ``key`` can be:

-   A string includes normal characters like ``'pi'``,
    in this case user press ``'p'`` and ``'i'`` triggers same function.
-   A string includes special characters like ``'!@#$%^&*(asdf'``.
-   A string presents special alias like ``'ENTER'``, ``'BACKSPACE'``, ``'BACKSLASH'``, etc.
-   A string presents combined keys like ``'<C-x>'``, I use Vim's notation.
    Combined keys can be

    -   ``<C-c>``, which means ctrl+c
    -   ``<S-c>``, which means shift+c
    -   ``<A-c>``, which means alt+c

    and the first symbol presents control keys must in uppercase.

-   An arrry includes many strings like ``['a', 'b', 'ENTER', 'BACKSLASH', '@#']``

The argument ``callback`` must be a function object,
but I didn't do related check, so be careful please.
The first argument of callback will be the key being pressed.
When you use

::

    KeyManager.keydown('abcde', function (user_input_key) {...});

to catch a key, the variable ``user_input_key`` helps you to recognize which key is being pressed.

The return value of argument ``callback`` will be propagated to browser,
so you can use 

::

    KeyManager.keydown('<C-h>', function () {});

to disable the ctrl+h key, which often showes browsing history.
