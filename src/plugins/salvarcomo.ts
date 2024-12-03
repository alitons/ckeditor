// @ts-nocheck
import { Plugin } from '@ckeditor/ckeditor5-core';
import { createDropdown } from '@ckeditor/ckeditor5-ui';
import { HtmlDataProcessor } from '@ckeditor/ckeditor5-engine';
import Swal from 'sweetalert2'
import axios from 'axios'
import $ from "jquery"; 

export default class SalvarComo extends Plugin {
	options = [] as any
    init() {
        const editor = this.editor;
		//GERAR UM NÚMERO ÚNICO ALEATÓRIO
		const uid = Math.random() * (5 - 5) + 5;

        editor.ui.componentFactory.add( 'salvarcomo', () => {
            
			const dropdown = createDropdown( editor.locale );

			// Configure dropdown's button properties:
			dropdown.buttonView.set( {
				label: 'Salvar como',
				icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>`,
				withText: true,
				tooltip: false
			});

			dropdown.render();

			//VERIFICA SE O EDITOR ESTÁ DESATIVADO
            setTimeout(() => {
                if(editor.isReadOnly) dropdown.isEnabled = false
            }, 500)

            // DESABILITA O BOTÃO QUANDO O EDITOR ESTIVER DESABILITADO OU NÃO ESTIVER ATIVO
            editor.model.document.on('change:data', () => {
                if(editor.isReadOnly) dropdown.isEnabled = false
                else dropdown.isEnabled = true
            })

			const toolbar = editor.config.get('toolbar') as any;

			if(!toolbar!.salvarComoOptions || toolbar!.salvarComoOptions === undefined || [null, undefined, ''].includes(toolbar!.salvarComoOptions?.url) || [null, undefined, ''].includes(toolbar!.salvarComoOptions?.options)) {
				dropdown.isEnabled = false
			}

			const input = document.createElement( 'div' );
			input.innerHTML = `<div class="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se ck-dropdown__panel-visible" tabindex="-1">
				<form class="ck ck-find-and-replace-form" tabindex="-1">
					<div class="ck ck-form__header">
						<h2 class="ck ck-form__header__label">Salvar como</h2>
					</div>
					<fieldset class="ck ck-find-and-replace-form__find" style="padding-bottom: 0px;">
						<div class="ck ck-labeled-field-view ck-labeled-field-view_empty" style="width:100%">
							<div class="ck ck-labeled-field-view__input-wrapper">
								<select class="ck ck-input ck-input-text_empty ck-input-text" id="input-salvarcomo-tipo-${uid}">
								${
									toolbar!.salvarComoOptions?.options?.map((option: any) => {
										return `<option value="${option.value}">${option.label}</option>`
									}).join('') 
								}
								</select>
							</div>
						</div>
						<div class="ck ck-labeled-field-view ck-labeled-field-view_empty" style="width:100%">
							<div class="ck ck-labeled-field-view__input-wrapper">
								<input class="ck ck-input ck-input-text_empty ck-input-text" id="input-salvarcomo-nome-${uid}" type="text" placeholder="Digite o nome do documento">
							</div>
						</div>
						<button class="ck ck-button ck-button-find ck-button-action ck-off ck-button_with-text" type="button" tabindex="-1" data-cke-tooltip-position="s" id="button-salvarcomo-${uid}">
							<span class="ck ck-button__label">Salvar</span>
						</button>
					</fieldset>
					<fieldset class="ck ck-find-and-replace-form__find" style="padding-top: 0px;">
						<div class="ck ck-labeled-field-view ck-labeled-field-view_empty" style="width:100%">
							<div class="ck ck-labeled-field-view__status ck-labeled-field-view__status_error" id="error-salvarcomo-${uid}" role="alert"></div>
						</div>
					</fieldset>
				</form>
			</div>`;
			dropdown.panelView.element.appendChild( input );


			$('body').on('change', `input, select`, function() {
				$(`#error-salvarcomo-${uid}`).html('')
			});

			$('body').on('click', `#button-salvarcomo-${uid}`, async function() {
				if($(this).hasClass('ck-disabled')) return

				$(this).addClass('ck-disabled')

				let parametros = {
					tipo: $(`#input-salvarcomo-tipo-${uid}`).val(),
					titulo: $(`#input-salvarcomo-nome-${uid}`).val(),
					conteudo: editor.getData()
				}

				if(toolbar!.salvarComoOptions?.parametros) {
					for(let p in toolbar!.salvarComoOptions?.parametros) {
						parametros[p] = toolbar!.salvarComoOptions?.parametros[p]
					}
				}

				//FAZ UMA REQUISIÇÃO AJAX PARA SALVAR O DOCUMENTO
				const result = await axios({
					method: toolbar!.salvarComoOptions?.method ?? 'post',
					url: toolbar!.salvarComoOptions?.url,
					timeout: 5000,
					responseType: 'json',
					params: parametros
				}).then((response) => {
					return response
				}).catch((error) => {
					return error.response
				});

				$(this).removeClass('ck-disabled')

				// DEFINE AS MENSAGENS DE ERRO
				let msgRetorno = {
					'200': 'Documento salvo com sucesso',
					'400': 'Requisição inválida',
					'401': 'Você não tem permissão para acessar este recurso',
					'403': 'Você não tem permissão para acessar este recurso',
					'404': 'Não foi possível salvar o documento',
					'500': 'Erro interno do servidor',
					'502': 'Gateway inválido',
					'503': 'Serviço indisponível',
					'504': 'Gateway Time-out'
				}

				//ADICIONA A CLASSE DE ERRO NO CAMPO DE BUSCA
				if(toolbar!.salvarComoOptions?.mensagens) {
					for(let e in toolbar!.salvarComoOptions?.mensagens) {
						msgRetorno[e] = toolbar!.salvarComoOptions?.erros[e]
					}
				}

				//CASO NÃO ENCONTRE NENHUM RESULTADO
				if(result.status != 201) {
					$(`#input-salvarcomo-${uid}`).addClass('ck-error')
					$(`#error-salvarcomo-${uid}`).html(result?.data?.message ?? msgRetorno[result.status] ?? msgRetorno['404'])
					return
				}

				$(`#input-salvarcomo-tipo-${uid}`).val($(`#input-salvarcomo-tipo-${uid}`).find('option').eq(0).val() ?? ''),
				$(`#input-salvarcomo-nome-${uid}`).val($(`#input-salvarcomo-nome-${uid} options`).eq(0).val()),

				Swal.fire({
					title: 'Sucesso',
					text: msgRetorno['200'],
					icon: 'success',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 1500
				})
			});

			return dropdown;
        });
    }
}