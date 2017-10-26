// @flow

import React from 'react';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';
import { Tabs, TabHeader, TabNav, TabBody } from 'components/Tabs';
import { PaperAirplaneFlying, MoneySignIcon, UserIcon, UserPlusIcon, TruckIcon, CartIcon, ArchiveIcon, TasksIcon } from 'components/Icons';

const ItensHelpcenter = () => (
  <div className="org-itens-helpcenter">

    <Tabs>
      <TabHeader>
        <TabNav>
          <div className="mol-sidebar-helpcenter">
            <ul className="atm-list-itens">
              <li><TruckIcon />Entregas</li>
              <li><MoneySignIcon />Pagamento</li>
              <li><UserIcon />Acesso a conta</li>
              <li><ArchiveIcon />Produtos</li>
              <li><CartIcon />Loja</li>
              <li><PaperAirplaneFlying />Meu pedido</li>
              <li><TasksIcon />Cadastro</li>
              <li><UserPlusIcon />Outros tópicos</li>
            </ul>
          </div>
        </TabNav>
      </TabHeader>
      <TabBody>
        <div className="mol-content-helpcenter">
          <div className="atm-content-item">
            <p className="title-item">Entregas</p>
            <Accordion>
              <AccordionItem>
                <AccordionItemTitle className="atm-header-menu-title">Posso indicar múltiplos endereços para entrega?</AccordionItemTitle>
                <AccordionItemBody>
                  <div>
                    O serviço de entrega oferecido pela Printi abrange um único endereço por pedido. Caso sua necessidade seja de entregar pedidos diferentes em endereços diferentes,  é possível cadastrar mais de um endereço de entrega.
                  </div>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </TabBody>
    </Tabs>
  </div>
);

export default ItensHelpcenter;
