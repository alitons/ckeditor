/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/list/listview
 */
import View from '@ckeditor/ckeditor5-ui/src/view';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import { FocusTracker, KeystrokeHandler } from '@ckeditor/ckeditor5-utils';
import '@ckeditor/ckeditor5-ui/theme/components/list/list.css';
/**
 * The list view class.
 */
export default class ListView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        this.items = this.createCollection();
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();
        this._focusCycler = new FocusCycler({
            focusables: this.items,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate list items backwards using the arrowup key.
                focusPrevious: 'arrowup',
                // Navigate toolbar items forwards using the arrowdown key.
                focusNext: 'arrowdown'
            }
        });
        this.set('ariaLabel', undefined);
        this.set('role', undefined);
        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [
                    //ck ck-list-styles-list
                    'ck',
                    //ck ck-reset ck-dropdown__panel ck-dropdown__panel_se
                    'ck-list-styles-list',
                    'ck-numlist-panel'
                ],
                role: bind.to('role'),
                'aria-label': bind.to('ariaLabel')
            },
            children: this.items
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        // Items added before rendering should be known to the #focusTracker.
        for (const item of this.items) {
            this.focusTracker.add(item.element);
        }
        this.items.on('add', (evt, item) => {
            this.focusTracker.add(item.element);
        });
        this.items.on('remove', (evt, item) => {
            this.focusTracker.remove(item.element);
        });
        // Start listening for the keystrokes coming from #element.
        this.keystrokes.listenTo(this.element);
    }
    /**
     * @inheritDoc
     */
    destroy() {
        try {
            super.destroy();
        } catch (err) {}
        try {
            this.focusTracker.destroy();
        } catch (err) {}
        try {
            this.keystrokes.destroy();
        } catch (err) {}
    }
    /**
     * Focuses the first focusable in {@link #items}.
     */
    focus() {
        this._focusCycler.focusFirst();
    }
    /**
     * Focuses the last focusable in {@link #items}.
     */
    focusLast() {
        this._focusCycler.focusLast();
    }
}
