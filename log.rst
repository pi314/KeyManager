update on 20131129
==================

-   log related

    -   Add a new function ``log`` to manage many kinds of logs

    -   Add a variable ``LOG_LEVEL`` to choose which type of log are going to be showed

-   Rename ``_named_key_list`` to ``_named_key_set``

-   Add keycodes of number pad

-   Rename ``disable`` to ``_disable``

-   Rename ``ignore_input_flag`` to ``_ignore_input_flag``

-   Add many comments that should be added in history

update on 20131125
==================

-   Remove ``return false`` action on keydown and keyup ``/<.-.>/``

update on 20131030
==================

-   Fix error on scrolling: no namespace, and scroll down returns false.

update on 20131012
==================

-   although this is a little bit strenge,
    I add scroll_down and scroll_up binding feature into KeyManager

    ::
        KeyManager.scroll_down(callback);
        KeyManager.scroll_up(callback);

    these can be used to bind event on mouse wheel scroll.

update on 20131003
==================

-   fix bug: the ``'DEFAULT'`` namespace wasn't been initialized.
-   change 'DEFAULT' to ``'__DEFAULT__'``

update on 20130925
==================

-   ``%s/^ *$//g``
-   add namespaces
    -   add ``KeyManager._add_namespace()``
    -   add ``KeyManager.namespace()``
-   set version number to beta-5

update on 20130907
==================

-   set version number to beta-4
-   fix the problem that disables ``input`` tags and ``textarea`` tags.
-   add ``KeyManager.ignore_input()`` to ignore input tags and textarea tags.

update on 20130714
==================

-   add check: if a callback function returns ``undefined``,
    KeyManager return ``false`` to keep event propogate,
    but ``F5`` and ``F12`` event will still be propogated.

-   add message shows the constants that KeyManager provides.

update on 20130704
==================

-   do alias in ``_keydown`` and ``_keyup`` to make ``<C-h>`` become ``BACKSPACE``,
    also return ``false`` so that ``<C-h>`` event will not propogate

update on 20130701
==================

    do alias in ``_keydown`` and ``_keyup`` to make ``<C-[>`` become ``ESC``

