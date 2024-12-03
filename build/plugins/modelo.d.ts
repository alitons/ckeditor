import { Plugin } from '@ckeditor/ckeditor5-core';
export default class DocumentoModelo extends Plugin {
    options: any;
    init(): void;
    openModalDocumentoModelo(): Promise<string | undefined>;
    parametrosDocumentoModeloCategoria(): {
        dropdownParent: any;
        placeholder: any;
    };
    parametrosDocumentoModelo(): {
        dropdownParent: any;
        placeholder: any;
    };
}
