import { Plugin } from '@ckeditor/ckeditor5-core';
export default class DocumentoModelo extends Plugin {
    options: any;
    init(): void;
    openModalDocumentoModelo(): Promise<string | undefined>;
    parametrosDocumentoModeloCategoria(): {
        dropdownParent: JQuery<HTMLElement>;
        placeholder: any;
    };
    parametrosDocumentoModelo(): {
        dropdownParent: JQuery<HTMLElement>;
        placeholder: any;
    };
}
