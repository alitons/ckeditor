/**
 * The list view class.
 */
export default class ListView extends View<HTMLElement> {
    /**
     * @inheritDoc
     */
    constructor(locale: any);
    items: import("@ckeditor/ckeditor5-ui").ViewCollection<View<HTMLElement>>;
    focusTracker: FocusTracker;
    keystrokes: KeystrokeHandler;
    _focusCycler: FocusCycler;
    /**
     * Focuses the first focusable in {@link #items}.
     */
    focus(): void;
    /**
     * Focuses the last focusable in {@link #items}.
     */
    focusLast(): void;
}
import View from "@ckeditor/ckeditor5-ui/src/view";
import { FocusTracker } from "@ckeditor/ckeditor5-utils";
import { KeystrokeHandler } from "@ckeditor/ckeditor5-utils";
import FocusCycler from "@ckeditor/ckeditor5-ui/src/focuscycler";
