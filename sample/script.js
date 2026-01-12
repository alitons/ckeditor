const watchdog = new CKSource.EditorWatchdog();

watchdog.setCreator( ( element, config ) => {
	return CKSource.Editor
	.create( element, config )
	.then( editor => {
		document.querySelector( '.document-editor__toolbar' ).appendChild( editor.ui.view.toolbar.element );
		document.querySelector( '.ck-toolbar' ).classList.add( 'ck-reset_all' );
		
		return editor;
	});
});

watchdog.create( document.querySelector( '.editor' ), {
	toolbar: {
		autoTextoOptions: {
			ajax: {
				url: "https://compras.test/api/autotexto",
				method: 'GET',
				data: {
					tipo: 'autotexto',
				},
				results: {
					autotexto: 'autotexto',
					titulo: 'titulo'
				}
			},
		},
		documentoModeloOptions: {
			categoria: {
				// options: [
				// 	{
				// 		autotexto: 'teste 1',
				// 		titulo: 'Primeiro teste'
				// 	}
				// ],
				ajax: {
					url: 'https://compras.test/api/documento-modelo/categoria',
					method: 'GET',
					data: {
						usuario: 'usuario',
					},
					results: {
						id: 'id_categoria_autotexto',
						text: 'descricao'
					}
				}
			},
			options: [
				{
					autotexto: 'teste 1',
					titulo: 'Primeiro teste'
				}
			],
			ajax: {
				url: 'https://compras.test/api/documento-modelo',
				method: 'GET',
				data: {
					usuario: 'usuario',
				},
				results: {
					autotexto: 'autotexto',
					titulo: 'titulo'
				}
			}
		},
        seiOptions: {
            url: "https://compras.test/api/documento-modelo/sei",
            resultData: 'documento_conteudo',
        },
		salvarComoOptions: {
			url: '/api/teste',
			options: [
				{
					value: 1,
					label: 'AutoTexto'
				},
				{
					value: 2,
					label: 'Documento Modelo'
				}
			]
		},
		listaNumeradaOptions: {
			disableEnter: true,
			forceList: 3,
		},
		items: [
			'salvarcomo',
			'|',
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'numberedDivListSplit',
			'|',
			'undo',
			'redo',
			'|',
			'indent',
			'outdent',
			'|',
			'autotexto',
			'importarsei',
			'documentoModelo'
		]
	},
})

let prevState = watchdog.state;

watchdog.on( 'stateChange', () => {
	const currentState = watchdog.state;

	if ( currentState === 'crashedPermanently' ) {
		watchdog.editor.enableReadOnlyMode( 'crashed-editor' );
	}

	prevState = currentState;
} );

function initEditorPage(editor) {
	console.log('Editor criado:', editor);
	const toolbarContainer = document.querySelector('.document-editor__toolbar');
	toolbarContainer.appendChild( editor.ui.view.toolbar.element );

	editor.enableReadOnlyMode( true );
}

document.getElementById('get-html').addEventListener('click', () => {
	const editor = watchdog.editor;
	const htmlContent = editor.getData();
	const htmlTextarea = document.querySelector('.html textarea');
	htmlTextarea.value = htmlContent;
});