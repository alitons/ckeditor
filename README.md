
# CkEditor + Plugins SEI, AutoTexto e Documento Modelo

### 💻 Requisitos

**jQuery:** ^3.7

**Select2:** ^4.1.x

**Bootstrap:** 5.x (Opcional)
## Modo de usar

Importe o Bootstrap, jQuery e Select2 em seu projeto

Adicione o diretório build (desse repositório) em seu projeto abaixo do jQuery e Select2

``` html
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
...
<script src="../build/ckeditor.js"></script>
...
```

Adicione ao seu HTML no para exibir o editor

```html
<div class="row">
    <div class="col-12">
        <div class="document-editor__toolbar"></div>
    </div>
    <div class="col-12  row-editor">
        <div class="editor-container">
            <div class="editor">
                
            </div>
        </div>
    </div>
</div>
```

Nesse exemplo, foi levado em consideração o uso do Bootstrap.

No html é necessário apenas 2 divs. Uma div onde será exibido o toolbar, no caso do exemplo acima está identificado pela classe `.document-editor__toolbar`. Outra classe onde será exibido o editor, nesse exemplo identificado pela classe `.editor`


Para inicializar o editor:
 - Instancie o CKEditor usando o metodo `EditorWatchdog`. 
 - Adicione o toolbar usando o metodo `setCreator`.
 - Inicie o editor usando o metodo `create`.

Veja um código de exemplo abaixo:

```javascript
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
				url: 'http://url-da-api-autotexto',
				method: 'GET'
			}
		},
		documentoModeloOptions: {
			ajax: {
				url: 'http://url-da-api-dos-modelos',
				method: 'GET'
			}
		},
		seiOptions: {
			url: 'http://url-da-api-sei',
			resultData: 'data[0].autotexto',
		},
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'undo',
			'redo',
			'|',
			'autotexto',
			'importarsei',
			'documentoModelo'
		]
	},
})
```

Para adicionar os plugins em seu editor você deve informar no toolbar os itens `autotexto`, `importarsei` e `documentoModelo`. Além disso é necessário criar uma objeto com as configurações de cada um deles, caso o contrário o botão ficará desabilitado.

### 🔧 Configurações dos plugins AutoTexto e Documento Modelo

As opções de textos podem ser definidas através de uma requisição ajax ou até mesmo já iniciados com o plugin.

O plugin `AutoTexto` e `documentoModelo` tem as seguintes opções

| Chave   | Valor       | Obrigatório       | Descrição                           |
| :---------- | :--------- | :--------- |:---------------------------------- |
| options | Array | `false` Obrigatório se não tiver o parametro ajax | Um array de objetos com os valores dos autotextos desejados |
| ajax | Object | `false` Obrigatório se não tiver o parametro options | Um  objetos com as informações da requisição ajax |

Caso você não informe um dos 2 parametros acima o botão irá ficar inativo

#### Informando valores de forma manual

O atributo `options` precisa ser um array com os itens que poderam ser selecionados. Veja um exemplo abaixo:

```
...
toolbar: {
    ...

    autoTextoOptions: {
        options: [
            {
                autotexto: '<p>Conteúdo do autotexto 1</p>',
                titulo: 'Título do autotexto 2'
            },
            {
                autotexto: '<p>Conteúdo do autotexto 2</p>',
                titulo: 'Título do autotexto 1'
            }
            ...
        ]
    }
    ...
}
...
```

onde:

| parametro | Valor | Obrigatórios | Descrição
| :-- | :-- | :-- | :--
| autotexto | String | `true` | Valor que será adiciona ao editor quando a opção for selecionada
| titulo | String | `true` | Valor que será exibido no option` para identificar o autotexto.

#### Informando valores com o uso de autoTextoOptions

Informe no atributo `ajax` as informações da sua API

| Chave | Valor | Obrigatório | Descrição
| :-- | :-- | :-- | :--
| url | String | `true` |  O endereço da sua API
| method | String | `false` | Metodo que sua requisição será chamada podendo ser `GET` ou `POST`. Caso não seja informado será usado `GET`
| data | Object | `false` | Nesse campo você pode enviar valores para serem enviados na requisição. Por exemplo, você precisa identificar o id do usuário envie `{ id_usuario: 1}`
| results | Object | `false` | Informe em quais atributos os valores serão retornado. Por exemplo, você deseja o atributo nome dese ser o título e o atributo conteúdo deve ser o autotexto `{autotexto: 'conteudo', titulo: 'nome'}`


### 🔧 Configurações dos plugin SEI

O plugin do SEI tem apenas o tributo `ajax` com as seguintes atributos.

| Chave | Valor | Obrigatório | Descrição
| :-- | :-- | :-- | :--
| url | String | `true` | Endereço da API
| method | String | `false` | Metodo que sua requisição será chamada podendo ser `GET` ou `POST`. Caso não seja informado será usado `GET`
| resultData | String | `false` | Atributo onde estará o valor do autotexto.
| erros | Object | `false` | Mensagem de erros de acordo com o código da resposta HTTP.

#### Exemplo das mensagens de erro.

```
...
erros: {
    '404': 'Nenhum documento encontrado',
    '500': 'Ocorreu um erro interno. Tente novamente em 1 hora'
}
...
```

## Exemplo de retorno de uma requisição ajax.

**api.php**
```
{
    "current_page": 1,
    "data": [
        {
            "id_autotexto": 4,
            "id_categoria_autotexto": 1,
            "id_usuario": null,
            "id_lotacao": null,
            "id_orgao": null,
            "titulo": "Justificativa",
            "descricao": "",
            "autotexto": "<ol><li>A contrata\u00e7\u00e3o pretendida mostra-se vi\u00e1vel, atende adequadamente \u00e0s demandas de neg\u00f3cio formuladas, as diretrizes do normativo, os benef\u00edcios pretendidos s\u00e3o adequados, os custos previstos s\u00e3o compat\u00edveis e caracterizam a economicidade, os riscos envolvidos s\u00e3o administr\u00e1veis e a \u00e1rea requisitante priorizar\u00e1 o fornecimento de todos os elementos aqui relacionados necess\u00e1rios \u00e0 consecu\u00e7\u00e3o dos benef\u00edcios pretendidos, pelo que recomendo vi\u00e1vel a contrata\u00e7\u00e3o.<\/li><\/ol>",
            "id_usuario_cadastro": null,
            "data_cadastro": null,
            "id_usuario_ultima_alteracao": null,
            "data_ultima_alteracao": null,
            "id_usuario_exclusao": null,
            "data_exclusao": null
        },
        {
            "id_autotexto": 5,
            "id_categoria_autotexto": 1,
            "id_usuario": null,
            "id_lotacao": null,
            "id_orgao": null,
            "titulo": "Teste2",
            "descricao": null,
            "autotexto": "Teste",
            "id_usuario_cadastro": null,
            "data_cadastro": null,
            "id_usuario_ultima_alteracao": null,
            "data_ultima_alteracao": null,
            "id_usuario_exclusao": null,
            "data_exclusao": null
        }
    ],
    "first_page_url": "http:\/\/url-api\/api\/teste?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http:\/\/url-api\/api\/teste?page=1",
    "links": [
        {
            "url": null,
            "label": "pagination.previous",
            "active": false
        },
        {
            "url": "http:\/\/url-api\/api\/teste?page=1",
            "label": "1",
            "active": true
        },
        {
            "url": null,
            "label": "pagination.next",
            "active": false
        }
    ],
    "next_page_url": null,
    "path": "http:\/\/url-api\/api\/teste",
    "per_page": 10,
    "prev_page_url": null,
    "to": 2,
    "total": 2
}
```


### 🔧 Salvar Como

O Plugin *Salvar Como* pode ser chamado 