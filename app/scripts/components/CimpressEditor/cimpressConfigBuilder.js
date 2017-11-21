import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Indicator from './CimpressComponents/Indicator/index';
import UploadButtonCimpress from './CimpressComponents/UploadButton/index';

const cimpressConfigBuilder = (config, isSku) => {
  const { settings: { has_preview, has_zoom } } = config;
  const cimpressDesignerSettings = {
    documentReference: config.document_reference_url,
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
              enabled: true,
              measurement: 'mm',
            },
            infoIndicators: {
              enabled: true,
              margins: {
                safety: {
                  safeOffset: 0.60,
                  enabled: true,
                  template: () => (ReactDOMServer.renderToString(
                    React.createElement(Indicator, { type: 'safety', title: 'Margem', content: 'conteudo' }))),
                },
                bleed: {
                  bleedOffset: 0.75,
                  enabled: true,
                  template: () => (ReactDOMServer.renderToString(
                    React.createElement(Indicator, { type: 'bleed', title: 'Sangria', content: 'conteudo' }))),
                },
                trim: {
                  trimOffset: 0.90,
                  enabled: true,
                  template: () => (ReactDOMServer.renderToString(
                    React.createElement(Indicator, { type: 'trim', title: 'Linha do produto', content: 'conteudo' }))),
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
            enabled: has_zoom === '1',
            containerElement: '.dcl-zoom-container',
          },
          previewDocument: {
            enabled: isSku && has_preview === '1',
            containerElement: '.dcl-widget-preview-document',
          },
          canvasSwitcher: {
            enabled: true,
            containerElement: '.dcl-canvas-switcher',
          },
          addText: {
            enabled: true,
            containerElement: '.add-text-button',
          },
          editText: {
            enabled: true,
            containerElement: '.side-bar__text-container',
          },
          uploadButton: {
            enabled: true,
            containerElement: '.side-image-bar__button-container',
            template: () =>
              (ReactDOMServer.renderToString(React.createElement(UploadButtonCimpress))),
          },
        },
        zoomStrategy: {
          resizeEnabled: false,
          initialHeight: 1,
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
  };
  if (isSku) {
    cimpressDesignerSettings.mcpSku = config.cimpress_sku_scene;
  } else {
    cimpressDesignerSettings.surfaceSpecifications = config.specifications;
  }

  return cimpressDesignerSettings;
};

export default cimpressConfigBuilder;
