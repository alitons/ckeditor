import { Plugin } from '@ckeditor/ckeditor5-core';
import 'select2/dist/js/select2.full.min';
export default class AutoTexto extends Plugin {
    options: any;
    init(): void;
    openModalAutoTexto(): Promise<string | undefined>;
}
