/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { DataFilter } from '@ckeditor/ckeditor5-html-support';
import { Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { TextPartLanguage } from '@ckeditor/ckeditor5-language';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { StandardEditingMode } from '@ckeditor/ckeditor5-restricted-editing';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import { Style } from '@ckeditor/ckeditor5-style';
import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table';
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog';
import ImportarSei from './plugins/sei';
import NumberedDivList from './plugins/listaNumerada';
import './css/custom.css';
declare class Editor extends DecoupledEditor {
    static builtinPlugins: (typeof NumberedDivList | typeof Alignment | typeof Autoformat | typeof Superscript | typeof Subscript | typeof Bold | typeof Code | typeof Italic | typeof Strikethrough | typeof Underline | typeof BlockQuote | typeof CloudServices | typeof CodeBlock | typeof SelectAll | typeof Essentials | typeof FontBackgroundColor | typeof FontColor | typeof FontFamily | typeof FontSize | typeof Heading | typeof Highlight | typeof HorizontalLine | typeof HtmlEmbed | typeof DataFilter | typeof Image | typeof ImageCaption | typeof ImageInsert | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof TextPartLanguage | typeof Link | typeof LinkImage | typeof List | typeof ListProperties | typeof TodoList | typeof MediaEmbed | typeof Mention | typeof PageBreak | typeof RemoveFormat | typeof StandardEditingMode | typeof ShowBlocks | typeof SpecialCharactersEssentials | typeof Style | typeof Table | typeof TableCaption | typeof TableCellProperties | typeof TableColumnResize | typeof TableProperties | typeof TableToolbar | typeof ImportarSei)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
            shouldNotGroupWhenFull: boolean;
        };
        language: string;
        image: {
            toolbar: string[];
        };
        table: {
            contentToolbar: string[];
        };
        list: {
            properties: {
                styles: boolean;
                startIndex: boolean;
                reversed: boolean;
            };
        };
    };
}
declare const _default: {
    Editor: typeof Editor;
    EditorWatchdog: typeof EditorWatchdog;
};
export default _default;
