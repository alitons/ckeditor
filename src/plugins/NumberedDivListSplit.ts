import { Plugin } from '@ckeditor/ckeditor5-core';
import {
  SplitButtonView,
  DropdownPanelView,
  ButtonView
} from '@ckeditor/ckeditor5-ui';
import ListItemView from './../components/list/listitemview';
import ListView from './../components/list/listview';
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';

const NUM_STYLES = [
  { 
    value: 'decimal', 
    withText: false,
    label: '1, 2, 3',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="20px" height="20px" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 20 20"><g id="Camada_x0020_1"><g id="_2373394167056"><path fill="black" fill-rule="nonzero" d="M7.23 10.43l-2.87 2.22c-0.29,0.23 -0.72,0.02 -0.72,-0.35l0 -4.45c0,-0.38 0.43,-0.59 0.72,-0.36l2.86 2.23c0.23,0.18 0.23,0.53 0,0.71l0.01 0z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M3.64 15.46c0,-0.49 0.4,-0.9 0.9,-0.9l10.78 0c0.5,0 0.9,0.41 0.9,0.9 0,0.5 -0.4,0.9 -0.9,0.9l-10.78 0c-0.5,0 -0.9,-0.4 -0.9,-0.9z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M9.93 10.97l5.39 0c0.5,0 0.9,0.4 0.9,0.9 0,0.5 -0.4,0.9 -0.9,0.9l-5.39 0c-0.5,0 -0.9,-0.4 -0.9,-0.9 0,-0.5 0.4,-0.9 0.9,-0.9z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M9.03 8.28c0,-0.5 0.4,-0.9 0.9,-0.9l5.39 0c0.5,0 0.9,0.4 0.9,0.9 0,0.49 -0.4,0.89 -0.9,0.89l-5.39 0c-0.5,0 -0.9,-0.4 -0.9,-0.89z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M3.64 4.68c0,-0.5 0.4,-0.9 0.9,-0.9l10.78 0c0.5,0 0.9,0.4 0.9,0.9 0,0.5 -0.4,0.9 -0.9,0.9l-10.78 0c-0.5,0 -0.9,-0.4 -0.9,-0.9z"/></g></g></svg>',
    tooltip: 'Decimal'
  },
  { value: 'recuar', withText: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 20 20"><g id="Camada_x0020_1"><g id="_2373623880832"><path fill="black" fill-rule="nonzero" d="M3.81 10.43l2.86 2.22c0.3,0.23 0.73,0.02 0.73,-0.35l0 -4.45c0,-0.38 -0.43,-0.59 -0.73,-0.36l-2.86 2.23c-0.23,0.18 -0.23,0.53 0,0.71l0 0z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M3.64 15.46c0,-0.49 0.4,-0.9 0.9,-0.9l10.78 0c0.5,0 0.9,0.41 0.9,0.9 0,0.5 -0.4,0.9 -0.9,0.9l-10.78 0c-0.5,0 -0.9,-0.4 -0.9,-0.9z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M9.93 10.97l5.39 0c0.5,0 0.9,0.4 0.9,0.9 0,0.5 -0.4,0.9 -0.9,0.9l-5.39 0c-0.5,0 -0.9,-0.4 -0.9,-0.9 0,-0.5 0.4,-0.9 0.9,-0.9z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M9.03 8.28c0,-0.5 0.4,-0.9 0.9,-0.9l5.39 0c0.5,0 0.9,0.4 0.9,0.9 0,0.49 -0.4,0.89 -0.9,0.89l-5.39 0c-0.5,0 -0.9,-0.4 -0.9,-0.89z"/><path fill="black" fill-rule="nonzero" fill-opacity="0.164706" d="M3.64 4.68c0,-0.5 0.4,-0.9 0.9,-0.9l10.78 0c0.5,0 0.9,0.4 0.9,0.9 0,0.5 -0.4,0.9 -0.9,0.9l-10.78 0c-0.5,0 -0.9,-0.4 -0.9,-0.9z"/></g></g></svg>',  label: 'a, b, c' },
  { value: 'lower-roman',  withText: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 44 44"><path d="M35 29a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17z" fill-opacity=".163"></path><path d="M11.88 8.7V7.558h-1.234V8.7h1.234zm0 5.3V9.333h-1.234V14h1.234zm2.5 0v-1.235h-1.234V14h1.235zm-4.75 4.7v-1.142H8.395V18.7H9.63zm0 5.3v-4.667H8.395V24H9.63zm2.5-5.3v-1.142h-1.234V18.7h1.235zm0 5.3v-4.667h-1.234V24h1.235zm2.501 0v-1.235h-1.235V24h1.235zM7.38 28.7v-1.142H6.145V28.7H7.38zm0 5.3v-4.667H6.145V34H7.38zm2.5-5.3v-1.142H8.646V28.7H9.88zm0 5.3v-4.667H8.646V34H9.88zm2.5-5.3v-1.142h-1.234V28.7h1.235zm0 5.3v-4.667h-1.234V34h1.235zm2.501 0v-1.235h-1.235V34h1.235z"></path></svg>',  label: 'a, b, c' },
  { value: 'upper-roman',  withText: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 44 44"><path d="M35 29a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17z" fill-opacity=".163"></path><path d="M11.916 15V8.558h-1.301V15h1.3zm2.465 0v-1.235h-1.235V15h1.235zM9.665 25v-6.442h-1.3V25h1.3zm2.5 0v-6.442h-1.3V25h1.3zm2.466 0v-1.235h-1.235V25h1.235zm-7.216 9v-6.442h-1.3V34h1.3zm2.5 0v-6.442h-1.3V34h1.3zm2.501 0v-6.442h-1.3V34h1.3zm2.465 0v-1.235h-1.235V34h1.235z"></path></svg>', label: 'A, B, C' },
  { value: 'lower-alpha',  withText: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 44 44"><path d="M35 29a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17z" fill-opacity=".163"></path><path d="M9.62 14.105c.272 0 .528-.05.768-.153s.466-.257.677-.462c.009.024.023.072.044.145.047.161.086.283.119.365h1.221a2.649 2.649 0 0 1-.222-.626c-.04-.195-.059-.498-.059-.908l.013-1.441c0-.536-.055-.905-.165-1.105-.11-.201-.3-.367-.569-.497-.27-.13-.68-.195-1.23-.195-.607 0-1.064.108-1.371.325-.308.217-.525.55-.65 1.002l1.12.202c.076-.217.176-.369.299-.455.123-.086.294-.13.514-.13.325 0 .546.05.663.152.118.101.176.27.176.508v.123c-.222.093-.622.194-1.2.303-.427.082-.755.178-.982.288-.227.11-.403.268-.53.474a1.327 1.327 0 0 0-.188.706c0 .398.138.728.415.988.277.261.656.391 1.136.391zm.368-.87a.675.675 0 0 1-.492-.189.606.606 0 0 1-.193-.448c0-.176.08-.32.241-.435.106-.07.33-.142.673-.215a7.19 7.19 0 0 0 .751-.19v.247c0 .296-.016.496-.048.602a.773.773 0 0 1-.295.409 1.07 1.07 0 0 1-.637.22zm4.645.765v-1.235h-1.235V14h1.235zM10.2 25.105c.542 0 1.003-.215 1.382-.646.38-.43.57-1.044.57-1.84 0-.771-.187-1.362-.559-1.774a1.82 1.82 0 0 0-1.41-.617c-.522 0-.973.216-1.354.65v-2.32H7.594V25h1.147v-.686a1.9 1.9 0 0 0 .67.592c.26.133.523.2.79.2zm-.299-.975c-.354 0-.638-.164-.852-.492-.153-.232-.229-.59-.229-1.073 0-.468.098-.818.295-1.048a.93.93 0 0 1 .738-.345c.302 0 .55.118.743.354.193.236.29.62.29 1.154 0 .5-.096.868-.288 1.1-.192.233-.424.35-.697.35zm4.478.87v-1.235h-1.234V25h1.234zm-4.017 9.105c.6 0 1.08-.142 1.437-.426.357-.284.599-.704.725-1.261l-1.213-.207c-.061.326-.167.555-.316.688a.832.832 0 0 1-.576.2.916.916 0 0 1-.75-.343c-.185-.228-.278-.62-.278-1.173 0-.498.091-.853.274-1.066.183-.212.429-.318.736-.318.232 0 .42.061.565.184.145.123.238.306.28.55l1.216-.22c-.146-.501-.387-.874-.722-1.119-.336-.244-.788-.366-1.356-.366-.695 0-1.245.214-1.653.643-.407.43-.61 1.03-.61 1.8 0 .762.202 1.358.608 1.788.406.431.95.646 1.633.646zM14.633 34v-1.235h-1.235V34h1.235z"></path></svg>', label: 'i, ii, iii' },
  { value: 'upper-alpha',  withText: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 44 44"><path d="M35 29a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17z" fill-opacity=".163"></path><path d="m7.88 15 .532-1.463h2.575L11.549 15h1.415l-2.58-6.442H9.01L6.5 15h1.38zm2.69-2.549H8.811l.87-2.39.887 2.39zM14.88 15v-1.235h-1.234V15h1.234zM9.352 25c.83-.006 1.352-.02 1.569-.044.346-.038.636-.14.872-.305.236-.166.422-.387.558-.664.137-.277.205-.562.205-.855 0-.372-.106-.695-.317-.97-.21-.276-.512-.471-.905-.585a1.51 1.51 0 0 0 .661-.567 1.5 1.5 0 0 0 .244-.83c0-.28-.066-.53-.197-.754a1.654 1.654 0 0 0-.495-.539 1.676 1.676 0 0 0-.672-.266c-.25-.042-.63-.063-1.14-.063H7.158V25h2.193zm.142-3.88H8.46v-1.49h.747c.612 0 .983.007 1.112.022.217.026.38.102.49.226.11.125.165.287.165.486a.68.68 0 0 1-.192.503.86.86 0 0 1-.525.23 11.47 11.47 0 0 1-.944.023h.18zm.17 2.795H8.46v-1.723h1.05c.592 0 .977.03 1.154.092.177.062.313.16.406.295a.84.84 0 0 1 .14.492c0 .228-.06.41-.181.547a.806.806 0 0 1-.473.257c-.126.026-.423.04-.892.04zM14.88 25v-1.235h-1.234V25h1.234zm-5.018 9.11c.691 0 1.262-.17 1.711-.512.45-.341.772-.864.965-1.567l-1.261-.4c-.109.472-.287.818-.536 1.037-.25.22-.547.33-.892.33-.47 0-.85-.173-1.143-.519-.293-.345-.44-.925-.44-1.74 0-.767.15-1.322.447-1.665.297-.343.684-.514 1.162-.514.346 0 .64.096.881.29.242.193.4.457.477.79l1.288-.307c-.147-.516-.367-.911-.66-1.187-.492-.465-1.132-.698-1.92-.698-.902 0-1.63.296-2.184.89-.554.593-.83 1.426-.83 2.498 0 1.014.275 1.813.825 2.397.551.585 1.254.877 2.11.877zM14.88 34v-1.235h-1.234V34h1.234z"></path></svg>', label: 'I, II, III' }
] as const;

export default class NumberedDivListSplit extends Plugin {
  public static get requires() {
    return [];
  }

  public static get pluginName() {
    return 'NumberedDivListSplit' as const;
  }

  public init(): void {
    const editor = this.editor as any;
    const toolbar = editor.config.get('toolbar') as any;
    const config = toolbar!.listaNumeradaOptions || {};

    editor.ui.componentFactory.add('numberedDivListSplit', (locale: any) => {
      
      const split = new SplitButtonView(locale);

      split.set({
        withText: false,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 136C64 122.8 74.7 112 88 112L136 112C149.3 112 160 122.7 160 136L160 240L184 240C197.3 240 208 250.7 208 264C208 277.3 197.3 288 184 288L88 288C74.7 288 64 277.3 64 264C64 250.7 74.7 240 88 240L112 240L112 160L88 160C74.7 160 64 149.3 64 136zM94.4 365.2C105.8 356.6 119.7 352 134 352L138.9 352C172.6 352 200 379.4 200 413.1C200 432.7 190.6 451 174.8 462.5L150.8 480L184 480C197.3 480 208 490.7 208 504C208 517.3 197.3 528 184 528L93.3 528C77.1 528 64 514.9 64 498.7C64 489.3 68.5 480.5 76.1 475L146.6 423.7C150 421.2 152 417.3 152 413.1C152 405.9 146.1 400 138.9 400L134 400C130.1 400 126.3 401.3 123.2 403.6L102.4 419.2C91.8 427.2 76.8 425 68.8 414.4C60.8 403.8 63 388.8 73.6 380.8L94.4 365.2zM288 128L544 128C561.7 128 576 142.3 576 160C576 177.7 561.7 192 544 192L288 192C270.3 192 256 177.7 256 160C256 142.3 270.3 128 288 128zM288 288L544 288C561.7 288 576 302.3 576 320C576 337.7 561.7 352 544 352L288 352C270.3 352 256 337.7 256 320C256 302.3 270.3 288 288 288zM288 448L544 448C561.7 448 576 462.3 576 480C576 497.7 561.7 512 544 512L288 512C270.3 512 256 497.7 256 480C256 462.3 270.3 448 288 448z"/></svg>',
        tooltip: 'Lista numerada',
      });

      split.actionView.on('execute', () => {
        editor.execute('toggleNumberedDivList');
        editor.editing.view.focus();
      });

      const panel = new DropdownPanelView(locale);
      // @ts-ignore
      panel.class = 'ck-numlist-panel';
      panel.isVisible = false;

      panel.on('change:isVisible', (_, __, val: boolean) => {
        if (panel.element) {
          panel.element.style.display = val ? 'block' : 'none';
        }
      });


      // Lista de estilos
      const list = new ListView(locale);
      for (const s of NUM_STYLES) {
        const item = new ListItemView(locale);
        const btn  = new ButtonView(locale);
        btn.set({ 
          // @ts-ignore
          withText: s?.withText ?? true, 
          label: s.label,
          // @ts-ignore
          icon: s?.icon ?? null,
          // @ts-ignore
          tooltip: s.tooltip ?? false
        });
        btn.on('execute', () => {
          editor.execute('toggleNumberedDivList', { value: s.value });
          panel.isVisible = false;
          editor.editing.view.focus();
        });
        item.children.add(btn);
        list.items.add(item);
      }

      panel.children.add(list);

      // função util p/ abrir/fechar com posicionamento
      const openPanel = () => {
        if (!split.element || !panel.element) return;
        const r = split.element.getBoundingClientRect();
        Object.assign(panel.element.style, {
          position: 'absolute',
          left: `${Math.round(r.left + window.scrollX)}px`,
          top:  `${Math.round(r.bottom + window.scrollY)}px`,
          height: '130px',
          zIndex: '10010',
          padding: '0px'
        });
        panel.isVisible = true;
      };
      const closePanel = () => (panel.isVisible = false);

      split.arrowView.on('execute', () => {
        if (panel.isVisible) closePanel(); else openPanel();
      });

      // Fecha ao clicar fora
      split.once('render', () => {
        if (!panel.isRendered) {
          panel.render();
        }
        if (panel.element && !panel.element.parentElement) {
          document.body.appendChild(panel.element);
          panel.element.style.display = 'none'; // começa oculto
        }

        clickOutsideHandler({
          emitter: split,
          activator: () => panel.isVisible,
          contextElements: [ split.element!, panel.element! ],
          callback: () => { panel.isVisible = false; }
        });
      });

      // Limpeza
      split.on('destroy', () => {
        try { panel.destroy(); } catch {}
        // @ts-ignore
        window.removeEventListener('scroll', onScrollOrResize, true);
        // @ts-ignore
        window.removeEventListener('resize', onScrollOrResize, true);
      });

      // Habilita/desabilita conforme comandos
      const toggleCmd: any = editor.commands.get('toggleNumberedDivList');
      if (toggleCmd) {
        split.bind('isEnabled').to(toggleCmd, 'isEnabled');
        split.bind('isOn').to(toggleCmd, 'value');
      }

      // Estilo básico opcional para o painel
      panel.extendTemplate({
        attributes: {
          style: {
            // ajuste conforme seu tema/toolbar container
            'min-width': '180px',
            'padding': '4px'
          }
        }
      });

      editor.model.document.on('change:data', () => {
        
          if(editor.isReadOnly) split.isEnabled = false

          const model = editor.model;
          const selection = model.document.selection;
          const isInNumItem = selection.getFirstPosition()?.findAncestor( 'numItem' ) !== null;

          // @ts-ignore
          list.items.get(0).isVisible = isInNumItem;
          // @ts-ignore
          list.items.get(1).isVisible = isInNumItem;
      });

      return split;
    });
  }
}