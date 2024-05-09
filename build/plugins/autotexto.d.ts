import { Plugin } from '@ckeditor/ckeditor5-core';
export default class AutoTexto extends Plugin {
    options: any;
    init(): void;
    openModalAutoTexto(): Promise<string | undefined>;
}
