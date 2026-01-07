// @ts-nocheck
/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import Swal from 'sweetalert2'

import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import {
	Bold,
	Code,
	Italic,
	Strikethrough,
	Subscript,
	Superscript,
	Underline
} from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import {
	DataFilter,
	DataSchema,
	GeneralHtmlSupport,
	HtmlComment
} from '@ckeditor/ckeditor5-html-support';
import {
	AutoImage,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { TextPartLanguage } from '@ckeditor/ckeditor5-language';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list';
// import { Markdown } from '@ckeditor/ckeditor5-markdown-gfm';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { StandardEditingMode } from '@ckeditor/ckeditor5-restricted-editing';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import {
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
import { Style } from '@ckeditor/ckeditor5-style';
import {
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar
} from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog';
import { WordCount } from '@ckeditor/ckeditor5-word-count';

import ImportarSei from './plugins/sei';
import AutoTexto from './plugins/autotexto';
import DocumentoModelo from './plugins/modelo';
import SalvarComo from './plugins/salvarcomo';
import NumberedDivList from './plugins/listaNumerada';
import NumberedDivListSplit from './plugins/NumberedDivListSplit';

import './css/custom.css';
import './css/sei.css';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends DecoupledEditor {
	public static override builtinPlugins = [
		Alignment,
		AutoImage,
		AutoLink,
		Autoformat,
		Autosave,
		BlockQuote,
		Bold,
		CloudServices,
		Code,
		CodeBlock,
		DataFilter,
		DataSchema,
		Essentials,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		Heading,
		Highlight,
		HorizontalLine,
		HtmlComment,
		HtmlEmbed,
		Image,
		ImageCaption,
		ImageInsert,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		Link,
		LinkImage,
		List,
		ListProperties,
		// Markdown,
		MediaEmbed,
		Mention,
		PageBreak,
		Paragraph,
		PasteFromOffice,
		RemoveFormat,
		SelectAll,
		ShowBlocks,
		SourceEditing,
		SpecialCharacters,
		SpecialCharactersArrows,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersLatin,
		SpecialCharactersMathematical,
		SpecialCharactersText,
		StandardEditingMode,
		Strikethrough,
		Style,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextPartLanguage,
		TextTransformation,
		TodoList,
		Underline,
		WordCount,
		AutoTexto,
		ImportarSei,
        DocumentoModelo,
		SalvarComo,
		NumberedDivList,
		NumberedDivListSplit
	];

	public static override defaultConfig = {
		extraAllowedContent: 'div[dir,id,lang,title](*){*};p[dir,id,lang,title](*){*}',
		htmlSupport: {
			allow: [
				{
					name: 'p',
					classes: true, // permite todas as classes em <p>
					attributes: true, // permite todos os atributos
					styles: true // permite todos os estilos
				},
				{
					name: 'div',
					classes: true, // permite todas as classes em <p>
					attributes: true, // permite todos os atributos
					styles: true // permite todos os estilos
				},
				{
					name: 'table',
					classes: true, // permite todas as classes em <p>
					attributes: true, // permite todos os atributos
					styles: true // permite todos os estilos
				},
				{
					name: 'tr',
					classes: true, // permite todas as classes em <p>
					attributes: true, // permite todos os atributos
					styles: true // permite todos os estilos
				},
				{
					name: 'td',
					classes: true, // permite todas as classes em <p>
					attributes: true, // permite todos os atributos
					styles: true // permite todos os estilos
				},
				{
					name: 'numItem',
					classes: true, // permite todas as classes em <p>
					attributes: true, // permite todos os atributos
					styles: true // permite todos os estilos
				}
			]
		},
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'fontSize',
				'fontFamily',
				'heading',
				'|',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'subscript',
				'superscript',
				'|',
				'alignment',
				'|',
				'numberedList',
				'bulletedList',
				'todoList',
				'|',
				'outdent',
				'indent',
				'|',
				'link',
				'blockQuote',
				'insertTable',
				'-',
				'restrictedEditingException',
				'codeBlock',
				'findAndReplace',
				'highlight',
				'horizontalLine',
				'imageInsert',
				'pageBreak',
				'removeFormat',
				'selectAll',
				'showBlocks',
				'autotexto',
				'importarsei',
				'documentoModelo',
				'salvarcomo',
				'numberedDivListSplit'
			],
			shouldNotGroupWhenFull: true
		},
		language: 'pt-br',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'linkImage'
			]
		},
		table: {
			contentToolbar: [
				'toggleTableCaption',
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableCellProperties',
				'tableProperties'
			]
		},
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        }
	};
}

export default { Editor, EditorWatchdog };
