import { Plugin, Command } from '@ckeditor/ckeditor5-core';
import { findOptimalInsertionRange } from '@ckeditor/ckeditor5-widget/src/utils';
import { keyCodes } from '@ckeditor/ckeditor5-utils/src/keyboard';

export default class NumberedDivList extends Plugin {
  static get pluginName() {
    return 'NumberedDivList';
  }

  init() {
    const editor = this.editor;
    const toolbar = editor.config.get('toolbar') as any;
    const config = toolbar!.listaNumeradaOptions || {};

    editor.model.schema.register('numList', {
      allowWhere: '$block',
      allowContentOf: '$root',
      allowAttributesOf: '$block',
      isBlock: true,
      isLimit: true,
    });

    editor.model.schema.register('numItem', {
      allowIn: 'numList',
      allowContentOf: '$root',
      allowAttributesOf: '$block',
      isLimit: true,
    });

    const downcastAttr = (conv: any, key: 'dataStyle'|'dataBlock', viewKey: 'data-style'|'data-block') => {
      conv.attributeToAttribute({
        model: { name: 'numList', key },
        view: (val: unknown) => {
          if (val == null || val === '') return { key: viewKey, value: null };
          return { key: viewKey, value: String(val) };
        }
      });
    };
    downcastAttr(editor.conversion.for('editingDowncast'), 'dataStyle', 'data-style');
    downcastAttr(editor.conversion.for('dataDowncast'),    'dataStyle', 'data-style');
    downcastAttr(editor.conversion.for('editingDowncast'), 'dataBlock', 'data-block');
    downcastAttr(editor.conversion.for('dataDowncast'),    'dataBlock', 'data-block');

    editor.conversion.for('dataDowncast').elementToElement({
      model: 'numList',
      view: (modelElement, { writer }) => {
        const attrs: Record<string, string> = { class: 'num-list' };

        const ds = modelElement.getAttribute('data-style');
        if (ds != null) attrs['data-style'] = String(ds);

        const db = modelElement.getAttribute('data-block');
        if (db != null) attrs['data-block'] = String(db);

        const sq = modelElement.getAttribute('start');
        if (sq != null) attrs['start'] = String(sq);

        return writer.createContainerElement('div', attrs)
      }
    });

    editor.conversion.for('editingDowncast').elementToElement({
      model: 'numList',
      view: (modelElement, { writer }) => {
        const attrs: Record<string, string> = { class: 'num-list' };

        const ds = modelElement.getAttribute('data-style');
        if (ds != null) attrs['data-style'] = String(ds);

        const db = modelElement.getAttribute('data-block');
        if (db != null) attrs['data-block'] = String(db);

        const sq = modelElement.getAttribute('start');
        if (sq != null) attrs['start'] = String(sq);

        return writer.createContainerElement('div', attrs);
      }
    });

    editor.conversion.for('dataDowncast').elementToElement({
      model: 'numItem',
      view: (modelElement, { writer }) =>
        writer.createContainerElement('div', { class: 'num-li' })
    });

    editor.conversion.for('editingDowncast').elementToElement({
      model: 'numItem',
      view: (modelElement, { writer }) =>
        writer.createContainerElement('div', { class: 'num-li' })
    });

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'div',
        classes: 'num-list',
      },
      model: (viewElement, { writer }) => {
        const attrs: any = {};

        const ds = viewElement.getAttribute('data-style');
        if (ds != null) attrs.dataStyle = ds;

        const db = viewElement.getAttribute('data-block');
        if (db != null) attrs.dataBlock = db;

        const sq = viewElement.getAttribute('start');
        if (sq != null) attrs.start = sq;

        return writer.createElement('numList', attrs);
      }
    });

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'div',
        classes: 'num-li'
      },
      model: (viewElement, { writer }) => writer.createElement('numItem')
    });

    editor.conversion.for('upcast').elementToElement({
      view: { name: 'ol' },
      model: (viewElement, { writer }) => writer.createElement('numList')
    });

    editor.conversion.for('upcast').elementToElement({
      view: { name: 'li' },
      model: (viewElement, { writer }) => writer.createElement('numItem')
    });

    const viewDoc = editor.editing.view.document;

    const selectionSpansBlocks = (model: any) => {
      const sel = model.document.selection;
      if (sel.isCollapsed) return false;
      const blocks = Array.from(sel.getSelectedBlocks());
      return blocks.length > 1;
    };

    const selectionTouchesElements = (model: any) => {
      const sel = model.document.selection;
      if (sel.isCollapsed) return false;
      const range = sel.getFirstRange();
      for (const item of range.getItems()) {
        if (item.is?.('element')) return true;
      }
      return false;
    };
    
    function getNearestSealedListFromPos(pos: any): any | null {
      // ancestors: [root, ..., parent]
      const ancestors = pos.getAncestors({ includeSelf: false }); // CKEditor retorna de root -> parent
      // percorre de baixo pra cima (mais próximo primeiro)
      for (let i = ancestors.length - 1; i >= 0; i--) {
        const node = ancestors[i];
        if (node.is?.('element', 'numList') && !!node.getAttribute?.('dataBlock')) {
          return node;
        }
      }
      return null;
    }

    // Verifica se `node` está DENTRO do `list` (qualquer profundidade)
    function isInside(node: any, ancestor: any): boolean {
      let p = node;
      while (p) {
        if (p === ancestor) return true;
        p = p.parent;
      }
      return false;
    }

    const firstItem = (list: any) => list.getChild(0);
    const lastItem  = (list: any) => list.getChild(list.childCount - 1);

    function ensureTypablePosInItem(writer: any, item: any, atEnd = false) {
      let p = null;
      for (const c of item.getChildren()) {
        if (c.is?.('element', 'paragraph')) { p = c; break; }
      }
      if (!p) {
        p = writer.createElement('paragraph');
        writer.insert(p, writer.createPositionAt(item, 0));
      }
      return atEnd
        ? writer.createPositionAt(p, 'end')
        : writer.createPositionAt(p, 0);
    }

    editor.plugins.get('ClipboardPipeline').on('inputTransformation', (evt: any, data: any) => {
      const { model } = editor;
      const sel = model.document.selection;
      const pos = sel.getFirstPosition();
      if (!pos) return;

      const sealed = getNearestSealedListFromPos(pos);
      if (!sealed) return;

      const item = pos.findAncestor('numItem');
      if (item && isInside(item, sealed)) return; // já dentro: ok

      // redireciona para o primeiro item do sealed
      evt.stop();
      model.change((writer: any) => {
        const target = firstItem(sealed) || writer.createElement('numItem');
        if (!firstItem(sealed)) {
          writer.insert(target, writer.createPositionAt(sealed, 0));
        }
        const at = ensureTypablePosInItem(writer, target, false);
        writer.setSelection(at);
        // reaplica como texto simples (ajuste conforme sua pipeline)
        const text = data.dataTransfer.getData('text/plain');
        if (text) editor.execute('input', { text });
      });
    });


    // não permitir que saia da lista caso exista o atributo data-block
    // viewDoc.on('keydown', (evt, data) => {
    //   if (data.keyCode !== keyCodes.enter || data.shiftKey) return;
    //   if (!editor.model.document.selection.isCollapsed) return;

    //   if(config?.disableEnter === true) {
    //     return;
    //   }

    //   const { model } = editor;
    //   const pos = model.document.selection.getFirstPosition();
    //   if (!pos) return;

    //   const sealed = getNearestSealedListFromPos(pos);
    //   if (!sealed) return; // só intercepta se estiver dentro de um sealed

    //   data.preventDefault(); evt.stop();

    //   model.change(writer => {
    //     // deixa o enter nativo dividir o bloco
    //     editor.execute('enter');

    //     const posAfter = model.document.selection.getFirstPosition();
    //     if (!posAfter) return;
    //     const newBlock = posAfter.parent as any;
    //     if (!newBlock) return;

    //     // queremos transformar o novo bloco em um novo numItem,
    //     // mantendo-o dentro de ALGUM numList que esteja dentro do `sealed` (o mais próximo)
    //     // pega o numItem atual (mais próximo)
    //     let currentItem = posAfter.findAncestor('numItem');

    //     // se o bloco recém criado ficou fora de um numItem,
    //     // cria um numItem irmão do atual (se existir) dentro do mesmo numList
    //     if (!currentItem) {
    //       const listForNew = getNearestSealedListFromPos(posAfter) || sealed;
    //       const newItem = writer.createElement('numItem');
    //       writer.insert(newItem, writer.createPositionAt(listForNew, 'end'));
    //       writer.move(writer.createRangeOn(newBlock), writer.createPositionAt(newItem, 0));
    //       writer.setSelection(ensureTypablePosInItem(writer, newItem, false));
    //       return;
    //     }

    //     // garantir que este numItem pertence a um numList que está dentro do sealed mais próximo
    //     let itsList = currentItem.parent; // deve ser um numList
    //     if (!isInside(itsList, sealed)) {
    //       // se por alguma razão o split empurrou pra fora, anexa de volta ao sealed
    //       const fallback = firstItem(sealed) || null;
    //       if (fallback) {
    //         const newItem = writer.createElement('numItem');
    //         writer.insert(newItem, writer.createPositionAfter(fallback));
    //         writer.move(writer.createRangeOn(newBlock), writer.createPositionAt(newItem, 0));
    //         writer.setSelection(ensureTypablePosInItem(writer, newItem, false));
    //       } else {
    //         // sealed vazio (raro): crie o primeiro item
    //         const newItem = writer.createElement('numItem');
    //         writer.insert(newItem, writer.createPositionAt(sealed, 0));
    //         writer.move(writer.createRangeOn(newBlock), writer.createPositionAt(newItem, 0));
    //         writer.setSelection(ensureTypablePosInItem(writer, newItem, false));
    //       }
    //       return;
    //     }

    //     // caso normal: cria irmão dentro do mesmo numList
    //     const newItem = writer.createElement('numItem');
    //     writer.insert(newItem, writer.createPositionAfter(currentItem));
    //     writer.move(writer.createRangeOn(newBlock), writer.createPositionAt(newItem, 0));
    //     writer.setSelection(ensureTypablePosInItem(writer, newItem, false));
    //   });
    // }, { priority: 'high' });

    // não permitir que backspace/delete saia da lista caso exista o atributo data-block
    viewDoc.on(
      'keydown',
      (evt, data) => {
        const isBackspace = data.keyCode === keyCodes.backspace;
        const isDelete    = data.keyCode === keyCodes.delete;
        if (!isBackspace && !isDelete) return;
        if (!editor.model.document.selection.isCollapsed) return;

        const model = editor.model;
        const sel = model.document.selection;

        data.preventDefault();
        evt.stop();

        model.change( async (writer: any) => {
          // @ts-ignore
          const getPos = sel.getFirstPosition() as any;
          const blocoPos = getPos?.findAncestor('paragraph') ?? getPos?.findAncestor('numItem') ?? getPos?.findAncestor('numList') ?? null;
          const itemPos = blocoPos.findAncestor('numItem');
          const listPos = itemPos.findAncestor('numList');

          // @ts-ignore
          editor.execute(isBackspace ? 'delete' : 'deleteForward', { unit: 'character', direction: isBackspace ? 'backward' : 'forward' });

          if(blocoPos.is('element', 'paragraph') && !blocoPos?.getChild(0)) {
            writer.remove(blocoPos);
          }
          if(itemPos && itemPos.childCount === 0) {
            writer.remove(itemPos);
          }
          if(listPos && listPos.childCount === 0) {
            writer.remove(listPos);
          }          
          
          
        });

        if(isBackspace) {
          model.change( async (writer: any) => {
            // coloca o cursor no final do bloco atual
            const posAfter = model.document.selection.getFirstPosition() as any;
            writer.setSelection(writer.createPositionAt(posAfter.parent, 'end'));
          });
        }

        return;
        
      },
      { priority: 'high' }
    );

    /* Ação ao pressionar a tecla TAB */
    viewDoc.on(
      'keydown',
      (evt, data) => {
        if (!(data.keyCode == keyCodes.tab && !data.shiftKey)) return;
        if (!editor.model.document.selection.isCollapsed) return;

        const model = editor.model;

        const posBefore = model.document.selection.getFirstPosition();
        const inItem = posBefore?.findAncestor('numItem');
        const inList = posBefore?.findAncestor('numList');
        if (!inItem || !inList) return; // fora da nossa lista -> deixa o Tab padrão agir

        data.preventDefault();
        evt.stop();

        editor.execute('toggleNumberedDivList');
      },
      { priority: 'high' }
    );

    /* Ação ao pressionar as teclas Shift + Tab */
    viewDoc.on(
      'keydown',
      (evt, data) => {
        if (data.keyCode !== keyCodes.tab || !data.shiftKey) return;
        if (!editor.model.document.selection.isCollapsed) return;

        const posBefore = editor.model.document.selection.getFirstPosition();
        const inItem = posBefore?.findAncestor('numItem');
        const inList = posBefore?.findAncestor('numList');
        if (!inItem || !inList) return;

        data.preventDefault();
        evt.stop();

        shiftTab(editor);
        
      },
      { priority: 'high' }
    );

    
    editor.model.document.on('change:data', () => {
          executeForceList(editor, config);
    });

    
    editor.model.schema.extend('$text', {
      allowAttributes: ['dataBlock', 'start']
    });

    // quando o editor for inicializado, dispara o change:data uma vez
    editor.on('ready', () => {
      executeForceList(editor, config);
    });


    // @ts-ignore
    editor.commands.add('toggleNumberedDivList', new ToggleNumberedDivListCommand(editor));
  }
}

class ToggleNumberedDivListCommand {
  declare editor: any;
  declare value: boolean;
  declare isEnabled: boolean;

  constructor(editor: any) {
    this.editor = editor;
    this.value = false;
    this.isEnabled = true;
  }

  refresh() {
    this.isEnabled = true;
  }

  execute(options?: { value?: string; start?: number } ): void {
    const { value, start } = options || {};
    const editor = this?.editor || null;
    const model = editor.model;

    const selection = model.document.selection;
    const firstPos = selection.getFirstPosition('paragraph') ?? selection.getFirstPosition('numItem');
    const existingItem = firstPos?.findAncestor('numItem');
    const paragraphAbove = firstPos?.findAncestor('paragraph');
    const firstParagraphItem = existingItem ? existingItem?.getChild(0) : null;
    let existingList = firstPos?.findAncestor('numList');
    let firstItemInList = existingList ? existingList.getChild(0) : null;
    const selectedItemIndex = existingList ? existingList.getChildIndex(existingItem) : null;

    if(value === 'recuar') {
      if (!existingItem || !existingList) return;
      if(value === 'recuar') return shiftTab(editor);
    }

    if(value !== undefined) {
      const block = firstPos.parent as any;

      if(existingItem && firstItemInList === existingItem) {
        if(value === 'decimal') {
          return;
        }
      }
  
      if(existingItem?.getChild(0) === block) {
        return editor.execute('toggleNumberedDivList', { value: undefined, start: start });
      }
    }

    model.change((writer: any) => {
      // se não for o primeiro do item
      if ((value == undefined || value == 'decimal') && paragraphAbove === firstParagraphItem && selectedItemIndex >= 0) {
        
        if(!selectedItemIndex) return;

        // procura o numItem acima da seleção
        let prevItem = existingList.getChild(selectedItemIndex - 1);
        if (!prevItem) return;

        if(prevItem.is('element', 'numItem')) {
          // criar uma nova lista abaixo da prevItem
          const newBlock = writer.createElement('numList', {
            ...(value && value !== 'decimal' ? { 'data-style': value } : {})
          });
          const insertPos = writer.createPositionAfter(prevItem);
          writer.insert(newBlock, insertPos);

          writer.move(writer.createRangeOn(existingItem), writer.createPositionAt(newBlock, 0));
        } else {
          // move para o final do prevItem
          writer.move(writer.createRangeOn(existingItem), writer.createPositionAt(prevItem, 'end'));
        }
        
        return;
      }      

      const blocks = Array.from(selection.getSelectedBlocks()) as any[];

      if (!blocks.length) {
        const insertRange = findOptimalInsertionRange(selection, model);
        const numList = writer.createElement('numList');
        const numItem = writer.createElement('numItem');
        writer.insert(numList, insertRange.start);
        writer.insert(numItem, writer.createPositionAt(numList, 0));
        const paragraph = writer.createElement('paragraph');
        writer.insert(paragraph, writer.createPositionAt(numItem, 0));
        writer.setSelection(paragraph, 'in');
        return;
      }

      if (existingList && value === undefined) {
        // verifica se está dentro de um numItem
        const isInsideNumItem = blocks[0].findAncestor('numItem') === existingItem;
        let insertPos = writer.createPositionBefore(paragraphAbove);
        let numItem;

        if (isInsideNumItem && existingItem) {
          // cria um num item abaixo do existente
          numItem = writer.createElement('numItem');
          insertPos = writer.createPositionAfter(existingItem);
          writer.insert(numItem, insertPos);
        } else {
          numItem = writer.createElement('numItem');
        }
        
        for (const block of blocks) {
          writer.insert(numItem, insertPos);
          writer.move(writer.createRangeOn(block), writer.createPositionAt(numItem, 0));
        }
        return;
      }

      // verifica se existe algum numList com data-first dentro de  todo o conteúdo selecionado
      let first = true;
      for (const block of blocks) {
        // @ts-ignore
        const foundList = block.findAncestor('numList');
        if (foundList) {
          first = false;
          break;
        }
      }

      const firstBlock = blocks[0];
      const listPos = writer.createPositionBefore(firstBlock);
      const numList = writer.createElement('numList', {
        ...(first && !value ? { 'data-block': 'true' } : {}),
        ...(first && !start ? { 'start': start } : {}),
        ...((value && value !== 'recuar' && value !== 'decimal') ? { 'data-style': value } : {})
      });

      writer.insert(numList, listPos);

      for (const block of blocks) {
        const numItem = writer.createElement('numItem');
        writer.insert(numItem, writer.createPositionAt(numList, 'end'));
        writer.move(writer.createRangeOn(block), writer.createPositionAt(numItem, 0));
      }
    });
  }
}

function shiftTab(editor: any) {
  const model = editor.model;

  const selection = model.document.selection;
  const firstBlock = selection.getFirstPosition('paragraph') ?? selection.getFirstPosition('numItem');
  const firstPos = firstBlock.is('element', 'numItem') ? firstBlock : firstBlock.findAncestor('numItem');
  const existingList = firstPos?.findAncestor('numList');
  const selectedItemIndex = existingList ? existingList.getChildIndex(firstPos) : null;
  const numListPai = existingList ? existingList?.findAncestor('numList') : null;
  const selectedListPaiIndex = numListPai ? numListPai.getChildIndex(existingList) : null;

  model.change((writer: any) => {
    // se for o primeiro item da lista
    if(numListPai && selectedListPaiIndex >= 0 && selectedItemIndex === 0) {
      writer.move(writer.createRangeOn(firstPos), writer.createPositionAt(numListPai, selectedListPaiIndex));
      return;
    }
    // se for o último item da lista
    if(numListPai && selectedListPaiIndex >= 0 && selectedItemIndex === existingList.childCount -1) {
      writer.move(writer.createRangeOn(firstPos), writer.createPositionAt(numListPai, selectedListPaiIndex + 1));
      return;
    }

    // criar novas regras de acordo com a necessidade

  });
}

function executeForceList(editor: any, config: any) {
  const model = editor.model;
  const firstElement = editor.model.document.getRoot().getChild(0) as any;
  if(config?.forceList && firstElement && firstElement.name !== 'numList') {
    const numList = model.change( (writer: any) => {
      const insertPos = writer.createPositionAt(model.document.getRoot(), 0);
      const numList = writer.createElement('numList', {
        'data-block': 'true',
        'start': config?.forceList ? config.forceList + 1 : null
      });
      writer.insert(numList, insertPos);
      return numList;
    });

    model.change( (writer: any) => {
      const root = model.document.getRoot();
      const itemsToMove = [];
      for ( const child of root.getChildren() ) {
        if ( child !== numList ) {
          itemsToMove.push(child);
        }
      }
      for ( const item of itemsToMove ) {
        const numItem = writer.createElement('numList');
        writer.insert( numItem, writer.createPositionAt( numList, 'end' ) );
        writer.move( writer.createRangeOn( item ), writer.createPositionAt( numItem, 0 ) );
      }
    });
  }
}