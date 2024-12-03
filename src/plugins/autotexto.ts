// @ts-nocheck
import Swal from 'sweetalert2'
import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { HtmlDataProcessor } from '@ckeditor/ckeditor5-engine';
import $ from "jquery"; 
import 'select2/dist/js/select2.full.min'
import * as css from 'select2/dist/css/select2.min.css'

export default class AutoTexto extends Plugin {
	options = [] as any
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'autotexto', () => {
            const button = new ButtonView();

            button.set( {
                label: 'AutoTexto',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="padding-right: 3px;"><path d="M234.7 42.7L192 64l42.7 21.3L256 128l21.3-42.7L320 64 277.3 42.7 256 0 234.7 42.7zM384.4 192.4l-32.8-32.8L432 79.2 464.8 112l-80.4 80.4zM96 32L64 96 0 128l64 32 32 64 32-64 64-32L128 96 96 32zM416 352l-64 32 64 32 32 64 32-64 64-32-64-32-32-64-32 64zM144 512l39.6-39.6L504.4 151.6 544 112 504.4 72.4 471.6 39.6 432 0 392.4 39.6 71.6 360.4 32 400l39.6 39.6 32.8 32.8L144 512z"/></svg>',
                withText: true,
				tooltip: true
            } );

			//VERIFICA SE O EDITOR ESTÁ DESATIVADO
            setTimeout(() => {
                if(editor.isReadOnly) button.isEnabled = false
            }, 500)

            // DESABILITA O BOTÃO QUANDO O EDITOR ESTIVER DESABILITADO OU NÃO ESTIVER ATIVO
            editor.model.document.on('change:data', () => {
                if(editor.isReadOnly) button.isEnabled = false
                else button.isEnabled = true
            })

			const toolbar = editor.config.get('toolbar') as any;

			if(!toolbar!.autoTextoOptions || toolbar!.autoTextoOptions === undefined || [null, undefined, ''].includes(toolbar!.autoTextoOptions)) {
				button.isEnabled = false
			}


            // Execute a callback function when the button is clicked.
            button.on( 'execute', async () => {

				const toolbar = editor.config.get('toolbar') as any;

				if(!toolbar!.autoTextoOptions || toolbar!.autoTextoOptions === undefined || [null, undefined, ''].includes(toolbar!.autoTextoOptions)) {
					button.isEnabled = false
					return Swal.fire('Erro', 'Nenhum auto texto foi encontrado', 'error')
				}

				this.options = toolbar!.autoTextoOptions

				// if(this.options.length === 0) return Swal.fire('Erro', 'Nenhum auto texto foi encontrado', 'error')

				let conteudo = await this.openModalAutoTexto() as any

				if(!conteudo || ['', null, undefined].includes(conteudo)) return


				const viewDocument = editor.editing.view.document;
				const htmlDP = new HtmlDataProcessor( viewDocument  );
				const viewFragment = htmlDP.toView( conteudo );
				const modelFragment = editor.data.toModel( viewFragment ) as any;

				editor.model.insertContent( modelFragment );

                // // Change the model using the model writer.
                // editor.model.change( writer => {

                //     // Insert the text at the user's current position.
                //     editor.model.insertContent( writer.createText( modelFragment ) );
                // } );
            } );

            return button;
        } );
    }

	async openModalAutoTexto(){
		const val = await Swal.fire({
			title: 'AutoTexto',
			html: `
			<div class="row w-100">
				<div class="col-12" style="text-align: justify;">
					<div class="form-group">
						<select class="form-select autotextoselect">
						</select>
					</div>
				</div>
				<div class="col-12 mt-5">
					<div readonly class="form-control autotextoviewer" style="height: 200px; text-align: justify; overflow: auto;"></div>
				</div>
			</div>
			`,
            willOpen: () => {
                const self = this
                let parametros = {
                    dropdownParent: $('.swal2-popup'),
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
                                page: params.page || 1
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

                $('.autotextoselect').select2(parametros)
                .on('change', function (e) {
                    $('.autotextoviewer').html(e.target.value)
                })
            },
			showCancelButton: true,
			confirmButtonText: 'Adicionar',
			cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3565A0',
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				const autotextoviewer = document.querySelector('.autotextoviewer')
				return autotextoviewer!.innerHTML
			}
		})

		return val;
	}
}