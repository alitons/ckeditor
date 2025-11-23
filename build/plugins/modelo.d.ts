import { Plugin } from '@ckeditor/ckeditor5-core';
import 'select2/dist/js/select2.full.min';
import 'select2/dist/css/select2.min.css';
export default class DocumentoModelo extends Plugin {
    options: any;
    uid: string;
    init(): void;
    createPopup(): void;
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
