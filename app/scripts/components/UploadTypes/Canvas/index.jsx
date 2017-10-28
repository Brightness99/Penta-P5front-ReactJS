// @flow

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loading from 'components/Loading';
import TopMenuBar from '../CimpressComponents/TopMenuBar';
import SideImageBar from '../CimpressComponents/SideImageBar';
import SideTextBar from '../CimpressComponents/SideTextBar';
import CanvasToolBar from '../CimpressComponents/CanvasToolBar';
import CanvasArea from '../CimpressComponents/CanvasArea';
import Indicator from '../CimpressComponents/Indicator';
import BottomMenuBar from '../CimpressComponents/BottomMenuBar';

type Props = {
  cimpressInfo: {},
  isSku: boolean,
  handleCanvasFinalize: (docRef) => void
};

type State = {
  isReady: boolean,
};

export default class Canvas extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    const oStyle = document.createElement('link');
    oStyle.type = 'text/css';
    oStyle.rel = 'stylesheet';
    document.head.appendChild(oStyle);
    oStyle.href = '//dcl.cimpress.io/1.4.7/dcl.css';

    const oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.onerror = this.handleError;
    oScript.onload = this.handleLoad;
    document.body.appendChild(oScript);
    oScript.src = '//dcl.cimpress.io/1.4.7/dcl.min.js';
  }

  componentDidUpdate(prevProps, prevState) {
    const { isReady } = this.state;
    const { cimpressInfo: { specifications, cimpress_sku_scene }, isSku } = this.props;

    const cimpressDesignerSettings = {
      configuration: {
        services: {
          clients: {
            tokenRetrieval: {
              apiKey: '580de974cffe5feedb620793053d32354ff56e68b650c8400314c273f3d46172',
            },
            font: {
              defaultFont: 'Alegreya Sans',
              availableFonts: [
                'Roboto',
                'Alegreya',
                'Alegreya Sans',
                'Alfa Slab One',
                'Amatic SC',
                'Archivo Narrow',
                'BenchNine',
                'Bree Serif',
                'Cherry Swash',
                'Cookie',
                'Courgette',
                'Crete Round',
                'EB Garamond',
                'Gabriela',
                'Great Vibes',
                'Handlee',
                'Life Savers',
                'Marmelad',
                'News Cycle',
                'Noto Sans',
                'Offside',
                'Oleo Script',
                'Patua One',
                'Rancho',
                'Satisfy',
                'Slabo 27px',
                'Stint Ultra Condensed',
                'Text Me One',
                'Yesteryear',
              ],
            },
          },
        },
        localization: {
          language: 'pt',
          pt: {
            translation: {
              text: {
                defaultPlaceholder: 'Digite o texto aqui...',
              },
              indicators: {
                safetyMargins: {
                  title: 'Margem de segurança',
                  text: 'Qualquer elemento fora desta linha poderá ser cortado. Logos e textos devem estar dentro desta margem.',
                },
                bleedMargins: {
                  title: 'Sangria',
                  text: 'Qualquer elemento entre a Sangria e a Margem de segurança poderá ser cortado.',
                },
              },
              canvases: {
                names: {
                  unique1: 'Frente',
                  unique2: 'Verso',
                  page1: 'Capa (frente)',
                  page2: 'Capa (verso)',
                  page3: 'Contracapa (frente)',
                  page4: 'Contracapa (verso)',
                },
              },
              tools: {
                buttons: {
                  apply: {
                    text: 'Aplicar',
                    title: 'Aplicar',
                  },
                  delete: {
                    default: 'Remover',
                  },
                  lock: {
                    default: 'Bloqueio',
                    lock: 'Bloquear',
                    unlock: 'Desbloq.',
                  },
                  crop: {
                    default: 'Cortar',
                  },
                  crispify: {
                    default: 'Suavizar',
                  },
                  orientation: {
                    default: 'Orientação',
                  },
                  bringtofront: {
                    default: 'Para frente',
                  },
                  sendtoback: {
                    default: 'Para trás',
                  },
                  duplicate: {
                    default: 'Duplicar',
                  },
                  more: {
                    default: 'Mais',
                  },
                  layering: {
                    default: 'Camadas',
                  },
                  restrictions: {
                    default: 'Restrições',
                  },
                  restrict: {
                    default: 'Restringir',
                    restrict: 'Restringir',
                    unrestrict: 'Desrestringir',
                  },
                  bringforward: {
                    default: 'Trazer para frente',
                  },
                  sendbackward: {
                    default: 'Enviar para trás',
                  },
                  textbold: {
                    default: 'Negrito',
                  },
                  textitalic: {
                    default: 'Italico',
                  },
                  textunderline: {
                    default: 'Sublinhado',
                  },
                  textstrikeout: {
                    default: 'Rasurado',
                  },
                  textleftalign: {
                    default: 'Alinhar à esquerda',
                  },
                  textcenteralign: {
                    default: 'Centralizado',
                  },
                  textrightalign: {
                    default: 'Alinhar à direita',
                  },
                  rotateleft: {
                    default: 'Girar para esquerda',
                  },
                  rotateright: {
                    default: 'Girar para direita',
                  },
                  shapeStrokeWidth: {
                    default: 'Largura da borda',
                  },
                  shapeStrokeColor: {
                    default: 'Cor da borda',
                  },
                  shapeFillColor: {
                    default: 'Cor de preenchimento',
                  },
                  fontColor: {
                    default: 'Cor da fonte',
                  },
                  fontFamily: {
                    default: 'Estilo da fonte',
                    placeholder: 'Escolha um estilo...',
                  },
                  fontSize: {
                    default: 'Tamanho da fonte',
                  },
                },
                color: {
                  providedColors: 'Cores padrão',
                  recentColors: 'Cores recentes',
                  canvasColors: 'Cores recentes',
                  customColor: 'Cores editadas',
                },
              },
              widgets: {
                addButtonTextField: 'Adicionar texto',
                uploadFileButton: '+ Adicionar novo arquivo',
                imageUploading: 'Adicionando...',
                imageProcessing: 'Processando...',
                cropModalTitle: 'Defina como a imagem será recortada:',
                cancelButton: 'Cancelar',
                applyButton: 'Recortar',
                previewDocumentButton: 'Visualizar',
                upload: {
                  infoText: 'Após adicionar os arquivos, arraste-os para a Área de edição.',
                },
                text: {
                  iconText: 'Texto',
                  infoText: 'Após adicionar os textos, você poderá gerenciá-los aqui.',
                },
                zoomButtons: {
                  in: 'Mais zoom',
                  out: 'Menos zoom',
                },
              },
              modals: {
                sharpen: {
                  modalHeader: 'Suavizar imagem',
                  sharpenedTitle: 'Suavizada',
                  originalTitle: 'Original',
                  revertButton: 'Não suavizar',
                },
              },
              views: {
                dropTargetText: 'Solte aqui a imagem selecionada!',
              },
              messages: {
                autoSharpen: 'Sua imagem foi suavizada automaticamente pois sua resolução era baixa. Clique aqui para comparar a alteração!',
                navigationWarning: 'Você irá perder as alterações não salvas se sair desta página. Deseja continuar?',
              },
            },
          },
        },
        core: {
          merchantId: 'default',
          items: {
            text: {
              rotatable: true,
              minWidth: 15,
              minFontSize: 6,
              multiline: true,
              inlineEdit: true,
            },
          },
        },
        ui: {
          canvas: {
            enabledCanvas: 1,
            visibleCanvas: 1,
            showMargins: true,
            chromes: {
              canvasTools: {
                enabled: true,
                left: 0,
                top: -25,
              },
              dimensions: {
                enabled: false,
                measurement: 'mm',
              },
              infoIndicators: {
                enabled: true,
                margins: {
                  safety: {
                    safeOffset: 0.60,
                    enabled: true,
                    template: () => (ReactDOMServer.renderToString(<Indicator type="safety" title="Margem" content="conteudo" />)),
                  },
                  bleed: {
                    bleedOffset: 0.75,
                    enabled: true,
                    template: () => (ReactDOMServer.renderToString(<Indicator type="bleed" title="Sangria" content="conteudo" />)),
                  },
                  trim: {
                    trimOffset: 0.90,
                    enabled: true,
                    template: () => (ReactDOMServer.renderToString(<Indicator type="trim" title="Linha do produto" content="conteudo" />)),
                  },
                },
              },
            },
          },
          widgets: {
            uploadList: {
              enabled: true,
              autoPlaceMode: 'scaletofit',
            },
            contextualToolbar: {
              enabled: true,
              buttons: [],
            },
            zoom: {
              enabled: true,
              containerElement: '.dcl-zoom-container',
            },
            addText: {
              enabled: true,
              containerElement: '.add-text-container',
            },
            editText: {
              enabled: true,
              containerElement: '.edit-text-container',
            },
            uploadButton: {
              enabled: true,
              containerElement: '.sideImageBar__buttonContainer',
              template: () => {
                const button = document.createElement('button');
                const icon = document.createElement('i');
                const span = document.createElement('span');

                button.setAttribute('class', 'sideImageBar__buttonContainer_button');

                icon.setAttribute('class', 'filesIcon');
                icon.innerHTML = '+';
                button.appendChild(icon);

                span.innerHTML = 'Adicionar novo arquivo';
                button.appendChild(span);

                return button;
              },
            },
          },
          zoomStrategy: {
            resizeEnabled: false,
            initialHeight: 3,
            initialZoom: 1,
            maxZoom: 10,
            minZoom: 0.50,
            zoomIncrement: 0.50,
          },
          useDefaultIcons: true,
          useCanvasObjects: false,
        },
        features: {
          autoPlace: {
            enabled: true,
            lockImageOnPlacement: false,
            tolerance: 1,
            strategy: 'ScaleToFitStrategy',
          },
        },
        validations: {
          outsideBounds: {
            enabled: true,
          },
          text: {
            enabled: true,
            margin: false,
          },
        },
      },
      surfaceSpecifications: specifications,
    };

    if (isSku) {
      cimpressDesignerSettings.mcpSku = cimpress_sku_scene;
    } else {
      cimpressDesignerSettings.surfaceSpecifications = specifications;
    }

    if (isReady && isReady !== prevState.isReady) {
      global.designer.start(cimpressDesignerSettings)
      .then(
        () => { }
      );
    }
  }

  static props: Props;

  static state: State;

  handleOnSave = (docRef) => {
    const { handleCanvasFinalize } = this.props;

    if (handleCanvasFinalize && typeof handleCanvasFinalize === 'function') {
      handleCanvasFinalize(docRef);
    }
  };

  handleError = (oError) => {
    throw new URIError(`The script ${oError.target.src} is not accessible.`);
  };

  handleLoad = () => {
    this.setState({
      isReady: true,
    });
  };

  render() {
    const { isReady } = this.state;
    const { cimpressInfo: { settings: { css } } } = this.props;

    return (
      <div className="upload-container-canvasCentralized">
        <div className="upload__canvasSchema">
          {
              !isReady
                ? <Loading />
                : [
                  <TopMenuBar key="top-menu-bar" />,
                  <div className="upload__canvasSchema_mainAreaContainer" key="upload__canvasSchema_mainAreaContainer">
                    <div className="upload__canvasSchema_sidebarContainer">
                      <SideImageBar />
                      <SideTextBar />
                    </div>
                    <div className="upload__canvasSchema_canvasContainer">
                      <CanvasToolBar />
                      <CanvasArea />
                    </div>
                  </div>,
                  <BottomMenuBar key="bottom-menu-bar" handleSave={this.handleOnSave} />,
                ]
            }
          <style>{css}</style>
        </div>
      </div>
    );
  }
}
