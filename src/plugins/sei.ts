// @ts-nocheck
import { Plugin } from '@ckeditor/ckeditor5-core';
import { createDropdown } from '@ckeditor/ckeditor5-ui';
import { HtmlDataProcessor } from '@ckeditor/ckeditor5-engine';
import axios from 'axios'
import $ from "jquery"; 

class ImportarSei extends Plugin {
	options = [] as any
    init() {
        const editor = this.editor;
		//GERAR UM NÚMERO ÚNICO ALEATÓRIO
		const uid = Math.random().toString(36).substring(7);

        editor.ui.componentFactory.add( 'importarsei', () => {
            
			const dropdown = createDropdown( editor.locale );

			// Configure dropdown's button properties:
			dropdown.buttonView.set( {
				label: 'Importar do SEI',
				icon: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="400px" height="400px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                viewBox="0 0 400 400"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                 <defs>
                  <style type="text/css">
                   <![CDATA[
                    .fil0 {fill:#0492C6}
                    .fil1 {fill:#9FB947}
                   ]]>
                  </style>
                 </defs>
                 <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"/>
                  <g id="_1420878160">
                   <g>
                    <path class="fil0" d="M229.58 211.03l-52.57 0.22c-6.46,-0.36 -4.14,1.11 -4.86,-3.58 -0.78,-5.14 7.25,-34.4 28.2,-34.4 10.41,0 17.6,1.46 24.65,13.1 2.9,4.8 7.24,18.7 4.58,24.66zm-101.09 19.48c0,76.19 59.14,99.77 124.69,80.84 12.05,-3.48 9.66,-2.91 9.8,-5.92 0.38,-7.98 -4.7,-20.36 -5.38,-28.63 -14.71,1.22 -51.7,15.7 -72.8,-3.94 -9.4,-8.74 -12.46,-16.12 -12.46,-28.95l95 0c4.24,0 3.52,-2.91 4.12,-6.84 7.83,-50.79 -23.83,-109.89 -84.49,-94.3 -2.66,0.68 -4.99,1.5 -7.25,2.53l-4.27 2.05c-19.93,8.97 -33.36,26.24 -40.71,46.78 -2.99,8.38 -6.25,25.44 -6.25,36.38z"/>
                    <path class="fil0" d="M87.08 270.71c0,20.22 -30.65,17.96 -45.45,12.56 -6.17,-2.26 -10.21,-4.97 -16.67,-6.47 -2.76,11.85 -7.3,21.44 -7.3,32.88 15.86,7.61 52.97,13.4 73.81,8.05 44.91,-11.55 51.45,-73.47 11.86,-94.94 -18.66,-10.12 -40.61,-15.53 -40.61,-31.25 0,-17.06 24.54,-16.33 38.46,-11.67 5.23,1.75 7.78,4.22 13.91,4.36 0.66,-7.83 7.31,-22.86 7.31,-31.67 -6.31,-1.47 -6.37,-2.81 -15.58,-4.9 -25.7,-5.83 -52.16,-5.92 -71.2,13.12 -10.26,10.26 -18.19,27.67 -13.87,47.37 8.64,39.38 65.33,36.8 65.33,62.56z"/>
                    <polygon class="fil1" points="336.76,250 381.83,250 381.83,80.7 336.76,80.7 "/>
                    <path class="fil0" d="M280.74 251.22l0 59.68c0,2.81 0.84,3.65 3.65,3.65l41.41 0 0 -169.29 -43.85 0c0,36.65 -1.21,69.27 -1.21,105.96z"/>
                    <path class="fil0" d="M333.11 287.76c0,34.66 45.47,34.56 48.47,3.37 1.2,-12.6 -9.08,-26.51 -25.33,-26.51 -12.1,0 -23.14,10.83 -23.14,23.14z"/>
                    <path class="fil1" d="M279.52 103.85c0,38.42 47.5,31.28 47.5,4.87 0,-40.3 -47.5,-32.18 -47.5,-4.87z"/>
                   </g>
                  </g>
                 </g>
                </svg>`,
				withText: false,
				tooltip: true
			} );

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

			if(!toolbar!.seiOptions || toolbar!.seiOptions === undefined || [null, undefined, ''].includes(toolbar!.seiOptions?.url)) {
				dropdown.isEnabled = false
			}
			
			// CRIAR O ELEMENTO IGUAL AO ELEMENTO DE BUSCA
			const input = document.createElement( 'div' );
			input.innerHTML = `<div class="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se ck-dropdown__panel-visible" tabindex="-1" style="left: initial;right: 0;">
				<form class="ck ck-find-and-replace-form" tabindex="-1">
					<div class="ck ck-form__header">
						<h2 class="ck ck-form__header__label">Importar documento do SEI</h2>
					</div>
					<fieldset class="ck ck-find-and-replace-form__find">
						<div class="ck ck-labeled-field-view ck-labeled-field-view_empty">
							<div class="ck ck-labeled-field-view__input-wrapper">
								<input class="ck ck-input ck-input-text_empty ck-input-text" id="search-input-sei-${uid}" type="text" placeholder="Digite o número do documento SEI">
							</div>
							<div class="ck ck-labeled-field-view__status ck-labeled-field-view__status_error" id="search-error-sei-${uid}" role="alert"></div>
						</div>
						<button class="ck ck-button ck-button-find ck-button-action ck-off ck-button_with-text" type="button" tabindex="-1" data-cke-tooltip-position="s" id="search-button-sei-${uid}">
							<span class="ck ck-button__label">Pesquisar</span>
						</button>
					</fieldset>
					<fieldset class="ck ck-find-and-replace-form__replace" id="search-actions-sei-${uid}" style="display: none">
						<div class="ck ck-labeled-field-view ck-disabled ck-labeled-field-view_empty" style="background: #e9ecef; border: 1px solid #ced4da; padding: 5px; height: 200px; overflow: auto; text-align: initial;">
							<div class="ck" id="search-result-sei-${uid}"></div>
						</div>
						<button class="ck ck-button ck-button-save ck-off ck-button_with-text" type="button" tabindex="-1" id="search-add-sei-${uid}">
							<svg class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20"><path d="M6.972 16.615a.997.997 0 0 1-.744-.292l-4.596-4.596a1 1 0 1 1 1.414-1.414l3.926 3.926 9.937-9.937a1 1 0 0 1 1.414 1.415L7.717 16.323a.997.997 0 0 1-.745.292z"></path></svg>
							<span class="ck ck-button__label">Importar</span>
						</button>
					</fieldset>
				</form>
			</div>`;
			dropdown.panelView.element.appendChild( input );

			$('body').on('click', `#search-button-sei-${uid}`, async function() {
				if($(this).hasClass('ck-disabled')) return

				$(this).addClass('ck-disabled')

				//FAZ UMA REQUISIÇÃO AJAX PARA PROCURAR O PROCESSO
				const result = await axios({
					method: toolbar!.seiOptions?.method ?? 'get',
					url: toolbar!.seiOptions?.url,
					timeout: 5000,
					responseType: 'json',
					params: {
						search: $(`#search-input-sei-${uid}`).val()
					}
				}).then((response) => {
					return response
				}).catch((error) => {
					return error.response
				});

				$(this).removeClass('ck-disabled')

				// DEFINE AS MENSAGENS DE ERRO
				let msgErros = {
					'400': 'Requisição inválida',
					'401': 'Você não tem permissão para acessar este recurso',
					'403': 'Você não tem permissão para acessar este recurso',
					'404': 'Nenhum documento encontrado',
					'500': 'Erro interno do servidor',
					'502': 'Gateway inválido',
					'503': 'Serviço indisponível',
					'504': 'Gateway Time-out'
				}

				//ADICIONA A CLASSE DE ERRO NO CAMPO DE BUSCA
				if(toolbar!.seiOptions?.erros) {
					for(let e in toolbar!.seiOptions?.erros) {
						msgErros[e] = toolbar!.seiOptions?.erros[e]
					}
				}

				//CASO NÃO ENCONTRE NENHUM RESULTADO
				if(result.status != 200) {
					$(`#search-input-sei-${uid}`).addClass('ck-error')
					$(`#search-error-sei-${uid}`).html(msgErros[result.status] ?? msgErros['404'])
					return
				}

				$(`#search-actions-sei-${uid}`).show()

				//CASO ENCONTRE RESULTADO
				$(`#search-result-sei-${uid}`).html(toolbar!.seiOptions?.resultData ? eval('result.data.' + toolbar!.seiOptions?.resultData) : result.data)
			});

			$('body').on('keyup', `.ck-error`, function() {
				$(this).removeClass('ck-error')
				$(`#search-error-sei-${uid}`).html('')
			});

			$('body').on('click', `#search-add-sei-${uid}`, async function() {
				const conteudo = $(`#search-result-sei-${uid}`).html()
				const viewDocument = editor.editing.view.document;
				const htmlDP = new HtmlDataProcessor( viewDocument  );
				const viewFragment = htmlDP.toView( conteudo );
				const modelFragment = editor.data.toModel( viewFragment ) as any;

				editor.model.change(writer => {
					writer.remove(writer.createRangeIn(editor.model.document.getRoot()));
					editor.model.insertContent(modelFragment);
				});

				// LIMPA O CAMPO DE BUSCA
				$(`#search-input-sei-${uid}`).val('')
				$(`#search-actions-sei-${uid}`).hide()

			});

			return dropdown;
        });
    }
}

export default ImportarSei;