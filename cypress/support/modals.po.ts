import { BaseComponent } from './base.component';

export class ModalsPo extends BaseComponent {
  pageUrl = '/modals';
  pageTitle = 'Modals';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/modal';


  modalWindow = 'modal-container';
  modalBtnSelector = 'modal-container button';
  modalHeader = '.modal-header';
  btnCloseInHeader = '.close';
  modalParagraph = `${this.modalWindow} ${'p'}`;
  demoCardBlock = '.card';

  exampleDemosArr = {
    serviceTemplate: 'demo-modal-service-static',
    serviceComponent: 'demo-modal-service-component',
    serviceNested: 'demo-modal-service-nested',
    serviceScroll: 'demo-modal-scrolling-long-content',
    serviceEvents: 'demo-modal-service-events',
    serviceConfirm: 'demo-modal-service-confirm-window',
    serviceCustomCSS: 'demo-modal-service-custom-css-class',
    serviceOptions: 'demo-modal-service-options',
    directiveStatic: 'demo-modal-static',
    directiveSizes: 'demo-modal-sizes',
    directiveChild: 'demo-modal-child',
    directiveNested: 'demo-modal-nested',
    directiveEvents: 'demo-modal-events',
    directiveAutoShow: 'demo-modal-auto-shown'
  };

  // temporary placed here
  isElementVisible(baseSelector: string, elementToFind: string, rowNum = 0) {
    cy.get(`${ baseSelector } ${elementToFind}`).eq(rowNum).should('be.visible');
  }

  isElemTextCorrect(baseSelector: string, itemSel: string, expectedText: string, rowNum = 0) {
    cy.get(baseSelector).find(itemSel).eq(rowNum).invoke('text')
      .should('contain', expectedText);
  }

  isModalVisible(baseSelector: string, visible: boolean) {
    cy.get(`${baseSelector} ${this.modalWindow}`).find('.modal-content')
      .should(visible ? 'to.be.visible' : 'not.to.be.visible');
  }

  isModalDisabled(baseSelector: string, visible: boolean) {
    cy.get(`${baseSelector} ${this.modalWindow}`).find('.modal-content')
      .should(visible ? 'not.to.be.enabled' : 'to.be.enabled');
  }

  isModalBtnExist(btnTitle: string) {
    cy.get(this.modalWindow).last().invoke('text')
      .should('contain', btnTitle);
  }

  clickOnModalBtn(btnTitle: string, buttonIndex?: number) {
    cy.get(this.modalBtnSelector).contains(btnTitle).click();
  }

  checkElementsQuantity(elemToCount: string, expectedQuantity: number) {
    cy.get(elemToCount).should('have.length', expectedQuantity);
  }

  isModalDemoContainsText(baseSelector: string, expectedText: string, demoNumber = 0) {
    cy.get(`${baseSelector} ${this.demoCardBlock}`).eq(demoNumber).invoke('text')
      .should('contain', expectedText);
  }
}
