import { Plugin } from '@ckeditor/ckeditor5-core';
import 'select2/dist/js/select2.full.min';
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
