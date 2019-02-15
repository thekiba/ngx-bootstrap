import { ModalsPo } from '../support/modals.po';

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Service examples', () => {

    describe('Component modals', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Component');
      });

      const componentDemo = modals.exampleDemosArr.serviceComponent;
      const btnText = 'Create modal with component';
      const modalBtnClose = 'Close';

      it('example contains the button "Create modalComponent with component"', () => {
        modals.isButtonExist(componentDemo, btnText);
      });

      it(`when user clicks on the button "Create template modalComponent" then modal is opened
      "Close" button is present`, () => {
        modals.clickByText(componentDemo, btnText);
        modals.isModalVisible(componentDemo, true);
        modals.isModalBtnExist(modalBtnClose);
      });

      it('user closes modal by clicking on "Close" button', () => {
        modals.clickByText(componentDemo, btnText);
        modals.clickOnModalBtn(modalBtnClose);
        modals.isModalDisabled('body', true);
      });
    });

    describe('Nested modals', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Nested');
      });

      const nestedDemo = modals.exampleDemosArr.serviceNested;
      const btnText = 'Open first modal';
      const open2ndModal = 'Open second modal';
      const close1stModal = 'Close first modal';
      const firstModalTitle = 'First modal';
      const secondModalTitle = 'Second modal';

      it('example contains the button "Create modalComponent with component"', () => {
        modals.isButtonExist(nestedDemo, btnText);
      });

      it(`when user clicks on the button "Open parent modal" button then modal popup with title "First modal"
      is opened, button "Open second modal" button is present`, () => {
        modals.clickByText(nestedDemo, btnText);
        modals.isModalVisible(nestedDemo, true);
        cy.get('h4').should('contain', firstModalTitle);
        modals.isModalBtnExist(open2ndModal);
      });

      it(`when user clicks on the button "Open second modal" then the second modal with title "Second modal" is opened,
        "Close first modal" is present`, () => {
        modals.clickByText(nestedDemo, btnText);
        modals.clickOnModalBtn(open2ndModal);
        cy.get('h4').last().should('contain', secondModalTitle);
        modals.isModalBtnExist(close1stModal);
        modals.checkElementsQuantity(modals.modalWindow, 2);
      });

      it('when user clicks on the button "Close first modal" then the first modal is closed', () => {
        modals.clickByText(nestedDemo, btnText);
        modals.clickOnModalBtn(open2ndModal);
        modals.clickOnModalBtn(close1stModal);
        modals.checkElementsQuantity(modals.modalWindow, 1);
      });
    });

    describe('Scrolling long content', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Scrolling long content');
      });

      const scrollDemo = modals.exampleDemosArr.serviceScroll;
      const btnText = 'Open modal';
      const modalBtnClose = 'Close';

      it('example contains the button "Create modalComponent with component"', () => {
        modals.isButtonExist(scrollDemo, btnText);
      });

      it(`when user clicks on the button "Open modal" button then modal is opened,
        button "Open second modal" button is present`, () => {
        modals.clickByText(scrollDemo, btnText);
        modals.isModalVisible(scrollDemo, true);
      });

      it('when user scroll content by mousewheel, content is scrolled successfully (the text has 15 paragraphs)',
        () => {
          modals.clickByText(scrollDemo, btnText);
          modals.checkElementsQuantity(modals.modalParagraph, 15);
          cy.get(modals.modalParagraph).last().scrollIntoView();
          modals.isElementVisible(modals.modalWindow, modals.modalParagraph, 14);
        });
    });

    describe('Events', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Events');
      });

      const eventsDemo = modals.exampleDemosArr.serviceEvents;
      const btnText = 'Open modal';
      const btnX = '×';
      const demoOnShowFired = 'onShow event has been fired';
      const demoOnShownFired = 'onShown event has been fired';
      const demoOnHideFired = 'onHide event has been fired';
      const demoOnHiddenFired = 'onHidden event has been fired';
      const demoHideDismissed = 'onHide event has been fired, dismissed by backdrop-click';
      const demoHiddenDismissed = 'onHidden event has been fired, dismissed by backdrop-click';

      it('example contains the button "Open modal"', () => {
        modals.isButtonExist(eventsDemo, btnText);
      });

      it(`when user clicks on "Open modal" button then modal is opened then should be two messages
      "onShow event has been fired" and "onShown event has been fired"`, () => {
        modals.clickByText(eventsDemo, btnText);
        modals.isModalVisible(eventsDemo, true);
        modals.isModalDemoContainsText(eventsDemo, demoOnShowFired);
        modals.isModalDemoContainsText(eventsDemo, demoOnShownFired, 1);
      });

      it(`when user closes modal by click on the cross then should be messages "onHide event has been fired"
      and "onHidden event has been fired"`, () => {
        modals.clickByText(eventsDemo, btnText);
        modals.clickOnModalBtn(btnX);
        modals.isModalVisible(eventsDemo, false);
        cy.wait(500); // could not avoid. required to display the 3rd and 4th messages
        modals.isModalDemoContainsText(eventsDemo, demoOnHideFired, 2);
        modals.isModalDemoContainsText(eventsDemo, demoOnHiddenFired, 3);
      });

      it(`when user user closes modal by click outside the modal window then should be messages
    "onHide event has been fired" and "onHidden event has been fired"`, () => {
        modals.clickByText(eventsDemo, btnText);
        modals.clickOutside(modals.modalWindow);
        modals.isModalVisible(eventsDemo, false);
        cy.wait(500); // could not avoid. required to display the 3rd and 4th messages
        modals.isModalDemoContainsText(eventsDemo, demoHideDismissed, 2);
        modals.isModalDemoContainsText(eventsDemo, demoHiddenDismissed, 3);
      });
    });

    describe('Confirm Window', () => {
      beforeEach('', () => {
        modals.scrollToMenu(' Template ');
      });

      const confirmDemo = modals.exampleDemosArr.serviceConfirm;
      const btnText = 'Open modal';
      const btnYes = 'Yes';
      const btnNo = 'No';
      const demoTextConfirmed = 'Confirmed!';
      const demoTextDeclined = 'Declined!';
      const emptyPreview = '';

      it('example contains the button "Open modal" and an empty demo', () => {
        modals.isButtonExist(confirmDemo, btnText);
        modals.isPreviewExist(confirmDemo, emptyPreview);
      });

      it('when user clicks on "Open modal" button then modal is opened, it contains two buttons: "Yes" and "No"',
        () => {
          modals.clickByText(confirmDemo, btnText);
          modals.isModalVisible('body', true);
          modals.isModalBtnExist(btnYes);
          modals.isModalBtnExist(btnNo);
        });

      it('when user clicks on "Yes" button then modal is closed, message "Confirmed!" is displayed', () => {
        modals.clickByText(confirmDemo, btnText);
        modals.clickOnModalBtn(btnYes);
        modals.isModalDisabled('body', true);
        modals.isModalDemoContainsText(confirmDemo, demoTextConfirmed);
      });

      it('when user clicks on "No" button then modal is closed, message "Declined!" is displayed', () => {
        modals.clickByText(confirmDemo, btnText);
        modals.clickOnModalBtn(btnNo);
        modals.isModalDisabled('body', true);
        modals.isModalDemoContainsText(confirmDemo, demoTextDeclined);
      });

      it('when user clicks outside the modal then modal is closed, no message is displayed', () => {
        modals.clickByText(confirmDemo, btnText);
        modals.clickOutside(modals.modalWindow);
        modals.isPreviewExist(confirmDemo, emptyPreview);
      });
    });

    describe('Сustom css class', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Сustom css class');
      });

      const customCSSDemo = modals.exampleDemosArr.serviceCustomCSS;
      const btnText = 'Open modal with custom css class';
      const btnX = '×';

      it('example contains the button "Open modal with custom css class"', () => {
        modals.isButtonExist(customCSSDemo, btnText);
      });

      it('when user clicks on "Open modal with custom css class" button then modal is opened', () => {
        modals.clickByText(customCSSDemo, btnText);
        modals.isModalVisible('body', true);
      });

      it('when user clicks on the cross button then the modal is closed', () => {
        modals.clickByText(customCSSDemo, btnText);
        modals.clickOnModalBtn(btnX);
        modals.isModalDisabled('body', true);
      });
    });

    describe('Animation option', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Animation option');
      });

      const animationDemo = modals.exampleDemosArr.serviceCustomCSS;
      const btnText = 'Open modal';
      const btnDisable = 'Disable animation';
      const btnEnable = 'Enable animation';
      const btnX = '×';

      it('example contains the buttons "Open modal" and "Disable animation"', () => {
        modals.isButtonExist(animationDemo, btnText);
        modals.isButtonExist(animationDemo, btnDisable, 1);
      });

      it('when user clicks on "Open modal" button then modal is opened. it appears with animation effects', () => {
        modals.clickByText(animationDemo, btnText);
        modals.isModalVisible('body', true);
        // can't check if the animation works
      });

      it('When user clicks on "Disable animation" button, title of button change to "Enable animation"', () => {
        modals.clickByText(animationDemo, btnDisable);
        modals.isButtonExist(animationDemo, btnEnable, 1);
      });

      it('when user clicks on the cross button then the modal is closed', () => {
        modals.clickByText(animationDemo, btnText);
        modals.clickOnModalBtn(btnX);
        modals.isModalDisabled('body', true);
      });

      it('And after that click on "Open modal" button, modal popup is opened without animations effects', () => {
        // TODO: !!! CONTINUE FROM HERE
      })
    });


    // describe('Directive examples', () => {
    //   describe('Static modal', () => {
    //     const staticModal = modals.exampleDemosArr.directiveStatic;
    //     const buttonText = 'Static modal';
    //
    //     it('directive static modal can be closed by clicking Close button', () => {
    //       modals.clickByText(staticModal, buttonText);
    //       cy.get(`${ staticModal } ${ modals.modalContent }`).as('staticMod')
    //         .should('to.be.visible');
    //
    //       cy.get(`${ staticModal } ${ modals.modalHeader } ${ modals.btnCloseInHeader }`).click();
    //       cy.get(`${ staticModal } ${ modals.backDirectiveMod }`)
    //         .should('not.to.be.visible');
    //     });
    //   });
    //
    //   describe('Child modal', () => {
    //     const childModals = modals.exampleDemosArr.directiveChild;
    //     const buttonText = 'Open child modal';
    //
    //     it('directive child modal can be closed by backdrop click', () => {
    //       modals.clickByText(childModals, buttonText);
    //       cy.get(`${ childModals } ${ modals.modalContent }`)
    //         .should('to.be.visible');
    //
    //       cy.get(`${ childModals } ${ modals.backDirectiveMod }`).as('childModBack').click();
    //       cy.get('@childModBack')
    //         .should('not.to.be.visible');
    //     });
    //   });
    // });
  });
});
