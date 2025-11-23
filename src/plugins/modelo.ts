// @ts-nocheck
import Swal from 'sweetalert2'
import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { createDropdown } from '@ckeditor/ckeditor5-ui';
import { HtmlDataProcessor } from '@ckeditor/ckeditor5-engine';
import $ from "jquery"; 
import 'select2/dist/js/select2.full.min'
import 'select2/dist/css/select2.min.css'

window.$ = $;
window.jQuery = $;

export default class DocumentoModelo extends Plugin {
    options = [] as any;
    uid = Math.random().toString(36).substring(7);
    init() {
        this.createPopup()
        const toolbar = this.editor.config.get('toolbar') as any;
        this.options = toolbar!.documentoModeloOptions
    }

    createPopup() {
        this.editor.ui.componentFactory.add( 'documentoModelo', () => {
            const dropdown = createDropdown( this.editor.locale );

            // Configure dropdown's button properties:
            dropdown.buttonView.set( {
                label: 'Modelos',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="272px" height="272px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                viewBox="0 0 272 272"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                 <defs>
                  <style type="text/css">
                   <![CDATA[
                    .fil0 {fill:#2B2A29}
                   ]]>
                  </style>
                 </defs>
                 <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"/>
                  <g id="_1428326992">
                   <g>
                    <path class="fil0" d="M30.17 65.9l135.94 0 0.41 153.88c0,5.7 0.65,17.26 -0.19,22.27l-136.38 0.19c-0.78,-4.84 -0.15,-147.92 -0.2,-170.71 0,-1.89 -0.27,-4.13 0.42,-5.63zm75.05 -33.21c3.8,1.33 9.7,4.77 13.18,6.6 4.35,2.3 8.21,4.23 12.42,6.55l24.51 13.11c0.06,-0.1 0.22,0.17 0.32,0.33l-50.37 0 -0.06 -26.59zm67.75 26.86c-1.83,-0.61 -2.07,-0.17 -4.2,-1.25l-24.81 -13.11c-4.68,-2.32 -10.06,-5.17 -14.47,-7.5l-13.57 -7.41 125.79 0.13 0.01 176.01 -68.65 -0.12 -0.1 -146.75zm-149.66 189.19l149.76 0 -0.01 -35.61 75.12 -0.07 0.16 -189.45 -149.75 0 0.06 35.67 -75.34 -0.02 0 189.48z"/>
                    <path class="fil0" d="M67.62 119.88c3.08,-5.42 4.67,-11.58 9.22,-10.08 1.94,0.63 3.15,3.52 4.37,5.63l18.57 31.34c2.05,3.53 6.13,9.53 7.35,12.82l-60.57 0.01 21.06 -39.72zm47.49 39.55c-1.89,-2.46 -3.36,-5.38 -4.94,-8.08 -2.81,-4.82 -2.3,-3.21 0.31,-8.07 2.74,-5.11 6.73,-15.22 13.07,-10.31 2.54,1.97 6.02,6.28 9.66,9.82l12.09 13.37c1.96,1.81 1.85,0.95 2.97,3.43l-33.16 -0.16zm-70.43 -68.96l107.45 0 -0.14 62.79c-1.29,-1.17 -1.8,-1.43 -2.97,-2.82 -0.94,-1.11 -1.56,-1.9 -2.5,-3l-16.77 -17.66c-2.09,-2.21 -3.17,-3.63 -7.01,-4.37 -12.4,-2.39 -14.78,11.11 -18.61,15.22l-0.76 -0.92c-0.3,-0.4 -0.15,-0.18 -0.44,-0.62 -0.23,-0.35 -0.51,-0.85 -0.74,-1.25l-5 -8.46c-2.22,-3.72 -4.27,-7.07 -6.51,-10.97 -4.04,-7.04 -8.6,-19.06 -19.31,-14.72 -4,1.62 -5.74,6.01 -7.93,10.02l-12.38 23.05c-1.23,2.22 -1.91,3.72 -3.12,5.87l-2.77 4.83c-0.05,0.08 -0.23,0.39 -0.27,0.31 -0.04,-0.09 -0.18,0.21 -0.23,0.3l0.01 -57.6zm113.7 -6.6l-120.14 -0.02 0.16 82.17 119.89 0 0.05 -0.65 0.04 -81.5z"/>
                    <path class="fil0" d="M190.85 105.66l35.08 0 0.17 34.39 -35.23 -0.08 -0.02 -34.31zm41.56 -6.81l-47.91 0 -0.01 47.56 48.05 -0.16 -0.13 -47.4z"/>
                    <path class="fil0" d="M225.74 47.64c0.77,0.71 0.81,-1.32 0.69,1.43l-0.22 35.72c-3.24,1.16 -40.75,0.42 -47.25,0.42l0.04 5.79 53.41 0 -0.2 -50.01 -72.31 -0.04 0 6.76 65.84 -0.07z"/>
                    <path class="fil0" d="M126.7 108.97c-0.35,-7.33 10.5,-7.7 11.07,-0.99 0.65,7.57 -10.74,7.94 -11.07,0.99zm5.45 -12.66c-17.46,1.08 -14.73,25.52 0.95,24.42 6.45,-0.45 11.93,-6.25 11.31,-13.2 -0.53,-5.95 -5.67,-11.63 -12.26,-11.22z"/>
                    <polygon class="fil0" points="37.75,197.42 40.24,197.47 89.15,197.46 91.29,197.5 91.29,190.75 37.75,190.75 "/>
                    <polygon class="fil0" points="104.61,193.83 104.6,194.33 104.61,197.46 158.18,197.46 158.16,190.75 104.63,190.75 "/>
                    <polygon class="fil0" points="37.76,211.75 91.21,211.75 91.3,209.8 91.29,205.06 37.75,205.06 "/>
                    <polygon class="fil0" points="104.6,211.74 158.05,211.75 158.06,205.07 104.63,205.09 "/>
                    <polygon class="fil0" points="37.74,225.93 91.33,225.96 91.27,219.29 37.79,219.29 "/>
                    <polygon class="fil0" points="37.77,183.18 91.15,183.17 91.23,176.56 37.9,176.57 "/>
                    <polygon class="fil0" points="104.63,183.18 157.99,183.17 158.11,176.56 104.79,176.57 "/>
                    <polygon class="fil0" points="183.94,160.02 233,160.07 233,153.37 183.93,153.37 "/>
                    <polygon class="fil0" points="184.28,185.55 232.9,185.58 232.97,178.86 183.91,178.91 "/>
                    <polygon class="fil0" points="184.04,172.79 233.01,172.81 232.75,166.13 184.02,166.15 "/>
                    <polygon class="fil0" points="104.58,225.96 140.25,225.96 140.25,219.26 104.68,219.3 "/>
                    <polygon class="fil0" points="183.99,198.37 214.25,198.4 214.25,191.65 183.94,191.68 "/>
                    <path class="fil0" d="M166.11 65.9l0.03 175.95 -135.97 0.14 0 -176.09c-0.69,1.5 -0.42,3.74 -0.42,5.63 0.05,22.79 -0.58,165.87 0.2,170.71l136.38 -0.19c0.84,-5.01 0.19,-16.57 0.19,-22.27l-0.41 -153.88z"/>
                    <path class="fil0" d="M158.38 83.87l-0.04 81.5 -0.05 0.65 -119.89 0 -0.16 -82.17 -0.38 41.09c0,8.03 -0.39,35.57 0.11,41.23 2.57,0.67 118.39,0.64 120.82,0 0.93,-13.17 0.08,-45.14 0.08,-61.69l-0.49 -20.61z"/>
                    <path class="fil0" d="M225.74 47.64l0.32 37 -47.53 0.07 0.1 6.73 54.26 -0.14 0 -48.72c-0.07,-2.74 0.06,-0.77 -0.68,-1.59l0.2 50.01 -53.41 0 -0.04 -5.79c6.5,0 44.01,0.74 47.25,-0.42l0.22 -35.72c0.12,-2.75 0.08,-0.72 -0.69,-1.43z"/>
                    <path class="fil0" d="M232.41 98.85l0.13 47.4 -48.05 0.16 0.01 -47.56c-0.8,1.66 -0.44,4.01 -0.44,6.13 0.01,8.4 -0.47,38.05 0.19,41.78l48.46 -0.1c0.89,-3.7 0.27,-19.28 0.27,-24.21 0,-2.25 0.65,-21.6 -0.57,-23.6z"/>
                   </g>
                  </g>
                 </g>
                </svg>`,
                withText: true,
                tooltip: true
            } );

            dropdown.render();

            //VERIFICA SE O EDITOR ESTÁ DESATIVADO
            setTimeout(() => {
                if(this.editor.isReadOnly) dropdown.isEnabled = false
            }, 500)

            // DESABILITA O BOTÃO QUANDO O EDITOR ESTIVER DESABILITADO OU NÃO ESTIVER ATIVO
            this.editor.model.document.on('change:data', () => {
                if(this.editor.isReadOnly) dropdown.isEnabled = false
                else dropdown.isEnabled = true
            })

            const toolbar = this.editor.config.get('toolbar') as any;
            const self = this;

            if(!toolbar!.seiOptions || toolbar!.seiOptions === undefined || [null, undefined, ''].includes(toolbar!.seiOptions?.url)) {
                dropdown.isEnabled = false
            }
            
            // CRIAR O ELEMENTO IGUAL AO ELEMENTO DE BUSCA
            const input = document.createElement( 'div' );
            input.classList.add('documento_modelo_container')
            input.innerHTML = `<div class="ck ck-dropdown__panel ck-dropdown__panel_se ck-dropdown__panel-visible ck-dropdown__panel_documento_modelo ck-reset_all-excluded" style="left: initial;right: 0;">
                <form class="ck ck-find-and-replace-form">
                    <div class="ck ck-form__header">
                        <p class="ck ck-form__header__label" style="margin: initial;">Documento Modelo</p>
                    </div>
                    <fieldset class="ck ck-find-and-replace-form__find" style="margin-bottom: 0px; padding-bottom: 0px;">
                        <div class="ck ck-labeled-field-view ck-labeled-field-view_empty">
                            <label>Categoria</label>
                            <div class="ck ck-labeled-field-view__input-wrapper">
                                <select class="ck ck-input ck-input-text_empty ck-input-select categoriamodeloselect-${self.uid}" id="search-input-categoria-document-modelo-${this.uid}">
                                </select>
                            </div>
                            <div class="ck ck-labeled-field-view__status ck-labeled-field-view__status_error" id="search-error-sei-${this.uid}" role="alert"></div>
                        </div>
                    </fieldset>
                    <fieldset class="ck ck-find-and-replace-form__find">
                        <div class="ck ck-labeled-field-view ck-labeled-field-view_empty">
                            <label>Modelo</label>
                            <div class="ck ck-labeled-field-view__input-wrapper">
                                <select class="ck ck-input ck-input-text_empty ck-input-select documentomodeloselect-${self.uid}" id="search-input-documento-modelo-${this.uid}">
                                </select>
                            </div>
                            <div class="ck ck-labeled-field-view__status ck-labeled-field-view__status_error" id="search-error-sei-${this.uid}" role="alert"></div>
                        </div>
                    </fieldset>
                    <fieldset class="ck ck-find-and-replace-form__replace" id="search-actions-documento-modelo-${this.uid}" style="display: none">
                        <div class="ck ck-labeled-field-view ck-disabled ck-labeled-field-view_empty" style="background: #e9ecef; border: 1px solid #ced4da; padding: 5px; height: 200px; overflow: auto; text-align: initial;">
                            <div class="ck" id="search-result-documento-modelo-${this.uid}"></div>
                        </div>
                        <button class="ck ck-button ck-button-save ck-off ck-button_with-text" type="button" tabindex="-1" id="search-add-documento-modelo-${this.uid}">
                            <svg class="ck ck-icon ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20"><path d="M6.972 16.615a.997.997 0 0 1-.744-.292l-4.596-4.596a1 1 0 1 1 1.414-1.414l3.926 3.926 9.937-9.937a1 1 0 0 1 1.414 1.415L7.717 16.323a.997.997 0 0 1-.745.292z"></path></svg>
                            <span class="ck ck-button__label">Importar</span>
                        </button>
                    </fieldset>
                </form>
            </div>`;
            dropdown.panelView.element.appendChild( input );

            // EXECUTAR APENAS QUANDO O DROPDOWN FOR ABERTO
            dropdown.on( 'change:isOpen', ( evt, name, isOpen ) => {
                if ( isOpen ) {
                        $(`.categoriamodeloselect-${self.uid}`)
                        .select2(this.parametrosDocumentoModeloCategoria())

                        $(`.documentomodeloselect-${self.uid}`)
                        .select2(this.parametrosDocumentoModelo())
                        .on('select2:select', function (e) {
                            console.log('selecionado', $(`#search-actions-documento-modelo-${self.uid}`));
                            $(`#search-actions-documento-modelo-${self.uid}`).show()
                            $(`#search-result-documento-modelo-${self.uid}`).html(e.target.value)
                        })
                }
            });

            $('body').on('keyup', `.ck-error`, function() {
                $(this).removeClass('ck-error')
                $(`#search-error-sei-${this.uid}`).html('')
            });

            $('body').on('click', `#search-add-documento-modelo-${this.uid}`, async function() {
                const conteudo = $(`#search-result-documento-modelo-${self.uid}`).html()
                const viewDocument = self.editor.editing.view.document;
                const htmlDP = new HtmlDataProcessor( viewDocument  );
                const viewFragment = htmlDP.toView( conteudo );
                const modelFragment = self.editor.data.toModel( viewFragment ) as any;

                self.editor.model.change(writer => {
                    writer.remove(writer.createRangeIn(self.editor.model.document.getRoot()));
                    self.editor.model.insertContent(modelFragment);
                });

                // LIMPA O CAMPO DE BUSCA
                $(`#search-input-documento-modelo-${self.uid}`).val('')
                $(`#search-actions-documento-modelo-${self.uid}`).hide()

            });

            return dropdown;
        });
    }

    async openModalDocumentoModelo(){
        const self = this
        const val = await Swal.fire({
            title: 'Modelo de Documento',
            html: `
            <div class="row w-100">
                ${(this.options.categoria) ? `<div class="col-12 mb-3" style="text-align: justify;">
                    <div class="form-group">
                        <select class="form-select categoriamodeloselect-${self.uid}">
                        </select>
                    </div>
                </div>` : ''}
                <div class="col-12" style="text-align: justify;">
                    <div class="form-group">
                        <select class="form-select documentomodeloselect-${self.uid}">
                        </select>
                    </div>
                </div>
                <div class="col-12 mt-5">
                    <div readonly class="form-control documentomodeloviewer" style="height: 200px; text-align: justify; overflow: auto;"></div>
                </div>
            </div>
            `,
            willOpen: () => {
                
                $(`.categoriamodeloselect-${self.uid}`)
                .select2(this.parametrosDocumentoModeloCategoria())

                $(`.documentomodeloselect-${self.uid}`)
                .select2(this.parametrosDocumentoModelo())
                .on('change', function (e) {
                    $('.documentomodeloviewer').html(e.target.value)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Adicionar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3565A0',
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const documentomodeloviewer = document.querySelector('.documentomodeloviewer')
                return documentomodeloviewer!.innerHTML
            }
        })

        return val;
    }

    parametrosDocumentoModeloCategoria() {
        const self = this
        let parametros = {
            dropdownParent: $('.ck-dropdown__panel_documento_modelo'),
            placeholder: this.options?.categoria?.placeholder ?? 'Selecione uma categoria',
        }

        if(this.options?.categoria?.ajax) {
            parametros['ajax'] = {
                url: this.options?.categoria?.ajax?.url ?? '',
                method: this.options?.categoria?.ajax?.method ?? 'GET',
                dataType: this.options?.categoria?.ajax?.dataType ?? 'json',
                data: function(params) {
                    let p = {
                        search: params.term,
                        page: params.page || 1
                    }
                    if(self.options?.categoria?.ajax?.data) {
                        p = {...p, ...self.options?.categoria?.ajax?.data}
                    }
                    return p
                },
                delay: this.options?.categoria?.ajax?.delay ?? 250,
                processResults: function (data) {
                    return {
                        results: data.data.map(function(item) {
                            return {
                                id: self.options?.categoria?.ajax?.results?.id ? item[self.options?.categoria?.ajax?.results?.id] : item.id,
                                text: self.options?.categoria?.ajax?.results?.text ? item[self.options?.categoria?.ajax?.results?.text] : item.text
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.last_page
                        }
                    };
                }
            }
        } else {
            let options = this.options?.categoria?.options ?? [];
            options.unshift({id: '', text: 'Selecione uma opção'})
            parametros['data'] = options
        }

        return parametros;
    }

    parametrosDocumentoModelo() {
        const self = this
        let parametros = {
            dropdownParent: $('.ck-dropdown__panel_documento_modelo'),
            placeholder: this.options?.placeholder ?? 'Selecione uma opção',
        }

        if(this.options?.ajax) {
            parametros['ajax'] = {
                url: this.options?.ajax?.url ?? '',
                method: this.options?.ajax?.method ?? 'GET',
                dataType: this.options?.ajax?.dataType ?? 'json',
                data: function(params) {
                    let p = {
                        search: params.term,
                        page: params.page || 1,
                        categoria: $(`.categoriamodeloselect-${self.uid}`).val() ?? null,
                    }
                    if(self.options?.ajax?.data) {
                        p = {...p, ...self.options?.ajax?.data}
                    }
                    return p
                },
                delay: this.options?.ajax?.delay ?? 250,
                processResults: function (data) {
                    return {
                        results: data.data.map(function(item) {
                            return {
                                id: self.options?.ajax?.results?.autotexto ? item[self.options?.ajax?.results?.autotexto] : item.autotexto,
                                text: self.options?.ajax?.results?.titulo ? item[self.options?.ajax?.results?.titulo] : item.titulo
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.last_page
                        }
                    };
                }
            }
        } else {
            let options = this.options?.options ?? [];
            options.unshift({id: '', text: 'Selecione uma opção'})
            parametros['data'] = options
        }

        return parametros;
    }
}