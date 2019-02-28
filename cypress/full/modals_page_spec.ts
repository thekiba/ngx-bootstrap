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
        modals.isModalVisible(true);
        modals.isModalBtnExist(modalBtnClose, 1);
      });

      it('user closes modal by clicking on "Close" button', () => {
        modals.clickByText(componentDemo, btnText);
        modals.clickOnModalBtn(modalBtnClose);
        modals.isModalDisabled(true);
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
        modals.isModalVisible(true);
        cy.get('h4').should('contain', firstModalTitle);
        modals.isModalBtnExist(open2ndModal, 1);
      });

      it(`when user clicks on the button "Open second modal" then the second modal with title "Second modal" is opened,
        "Close first modal" is present`, () => {
        modals.clickByText(nestedDemo, btnText);
        modals.clickOnModalBtn(open2ndModal);
        cy.get('h4').last().should('contain', secondModalTitle);
        modals.isModalBtnExist(close1stModal, 3);
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

      it('example contains the button "Create modalComponent with component"', () => {
        modals.isButtonExist(scrollDemo, btnText);
      });

      it.only(`when user clicks on the button "Open modal" button then modal is opened
        the text has 15 paragraphs`, () => {
        modals.clickByText(scrollDemo, btnText);
        modals.isModalVisible(true);
        modals.checkElementsQuantity(modals.modalParagraph, 15);
      });

      it('when user scroll content by mousewheel, content is scrolled successfully', () => {
        modals.clickByText(scrollDemo, btnText);
        cy.get(modals.modalParagraph).last().scrollIntoView();
        modals.isElementVisible('body', modals.modalParagraph, 14);
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
        modals.isModalVisible(true);
        modals.isModalDemoContainsText(eventsDemo, demoOnShowFired);
        modals.isModalDemoContainsText(eventsDemo, demoOnShownFired, 1);
      });

      it(`when user closes modal by click on the cross then should be messages "onHide event has been fired"
      and "onHidden event has been fired"`, () => {
        modals.clickByText(eventsDemo, btnText);
        modals.clickOnModalBtn(btnX);
        modals.isModalDisabled(true);
        cy.wait(500); // TODO: make without a wait
        modals.isModalDemoContainsText(eventsDemo, demoOnHideFired, 2);
        modals.isModalDemoContainsText(eventsDemo, demoOnHiddenFired, 3);
      });

      it(`when user user closes modal by click outside the modal window then should be messages
    "onHide event has been fired" and "onHidden event has been fired"`, () => {
        modals.clickByText(eventsDemo, btnText);
        modals.clickOutside(modals.modalWindow);
        modals.isModalDisabled(true);
        cy.wait(500); // TODO: make without a wait
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
          modals.isModalVisible(true);
          modals.isModalBtnExist(btnYes);
          modals.isModalBtnExist(btnNo, 1);
        });

      it('when user clicks on "Yes" button then modal is closed, message "Confirmed!" is displayed', () => {
        modals.clickByText(confirmDemo, btnText);
        modals.clickOnModalBtn(btnYes);
        modals.isModalDisabled(true);
        modals.isModalDemoContainsText(confirmDemo, demoTextConfirmed);
      });

      it('when user clicks on "No" button then modal is closed, message "Declined!" is displayed', () => {
        modals.clickByText(confirmDemo, btnText);
        modals.clickOnModalBtn(btnNo);
        modals.isModalDisabled(true);
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
        modals.isModalVisible(true);
      });

      it('when user clicks on the cross button then the modal is closed', () => {
        modals.clickByText(customCSSDemo, btnText);
        modals.clickOnModalBtn(btnX);
        modals.isModalDisabled(true);
      });
    });

    describe('Animation option', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Animation option');
      });

      const animationDemo = modals.exampleDemosArr.serviceAnimation;
      const btnText = 'Open modal';
      const btnDisable = 'Disable animation';
      const btnEnable = 'Enable animation';
      const btnX = '×';

      it('example contains the buttons "Open modal" and "Disable animation"', () => {
        modals.isButtonExist(animationDemo, btnText);
        modals.isButtonExist(animationDemo, btnDisable, 1);
      });

      it('when user clicks on "Open modal" button then modal is opened. it appears with animations effects', () => {
        modals.clickByText(animationDemo, btnText);
        modals.isModalVisible(true);
        // can't check if the animation works
      });

      it('when user clicks on "Disable animation" button then title of the button is changed to "Enable animation"',
        () => {
          modals.clickByText(animationDemo, btnDisable);
          modals.isButtonExist(animationDemo, btnEnable, 1);
        });

      it('after that click on "Open modal" button, modal popup is opened without animations effects', () => {
        modals.clickByText(animationDemo, btnText);
        modals.isModalVisible(true);
      });

      it('when user clicks on the cross button then the modal is closed', () => {
        modals.clickByText(animationDemo, btnText);
        modals.clickOnModalBtn(btnX);
        modals.isModalDisabled(true);
      });
    });

    describe('Esc closing option', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Esc closing option');
      });

      const escapeDemo = modals.exampleDemosArr.serviceESC;
      const btnText = 'Open modal';
      const btnDisable = 'Disable Esc';
      const btnEnable = 'Enable Esc';

      it('example contains the buttons "Open modal" and "Disable Esc"', () => {
        modals.isButtonExist(escapeDemo, btnText);
        modals.isButtonExist(escapeDemo, btnDisable, 1);
      });

      it(`when user clicks on "Open modal" button then modal is opened. when user closes modal popup by click
      ESC button then modal stays opened`, () => {
        modals.clickByText(escapeDemo, btnText);
        cy.get(modals.modalWindow).type('{esc}');
        modals.isModalVisible(true);
      });

      it(`when user clicks on "Disable Esc" button then title of the button is changed to "Enable animation"`,
        () => {
          modals.clickByText(escapeDemo, btnDisable);
          modals.isButtonExist(escapeDemo, btnEnable, 1);
        });

      it(`after that click on "Open modal" button, modal popup is opened. when user press ESC button then modal
      is closed`, () => {
        modals.clickByText(escapeDemo, btnText);
        cy.get(modals.modalWindow).type('{esc}');
        modals.isModalDisabled(true);
      });
    });

    describe('Modal window with tooltip and popover', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Modal window with tooltip and popover');
      });

      const toolPopupDemo = modals.exampleDemosArr.serviceToolPopup;
      const btnText = 'Open modal';
      const btnPopover = 'popover';
      const btnTooltip = 'tooltip';

      it('example contains the button "Open modal"', () => {
        modals.isButtonExist(toolPopupDemo, btnText);
      });

      it(`when user clicks on "Open modal" button then modal is opened. the buttons "popover" and "tooltip"
       are present`, () => {
        modals.clickByText(toolPopupDemo, btnText);
        modals.isModalVisible(true);
        modals.isModalBtnExist(btnPopover, 1);
        modals.isModalBtnExist(btnTooltip, 2);
      });

      it('when user clicks on "popup" button then a popup is shown', () => {
        modals.clickByText(toolPopupDemo, btnText);
        modals.clickOnModalBtn(btnPopover);
        modals.isElementVisible('body', modals.modalPopup);
      });

      it(`when user hover on "tooltip" button then a popup is shown`,
        () => {
          modals.clickByText(toolPopupDemo, btnText);
          cy.get(modals.modalWindow).contains('tooltip').focus();
          modals.isModalTooltipVisible();
        });
    });

    describe('Backdrop options', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Modal window with tooltip and popover');
      });

      const backdropDemo = modals.exampleDemosArr.serviceBackdrop;
      const btnText = 'Open modal';
      const btnDisable = 'Disable backdrop';
      const btnEnable = 'Enable backdrop';
      const btnDisableClick = 'Disable backdrop click';
      const btnEnableClick = 'Enable backdrop click';

      it('example contains the buttons "Open modal", "Disable backdrop" and "Enable backdrop"', () => {
        modals.isButtonExist(backdropDemo, btnText);
        modals.isButtonExist(backdropDemo, btnDisable, 1);
        modals.isButtonExist(backdropDemo, btnDisableClick, 2);
      });

      it('when user clicks on "Open modal" button then modal is opened, it can be closed by clicking on a backdrop',
        () => {
          modals.clickByText(backdropDemo, btnText);
          modals.isModalVisible(true);
          modals.isBackdropEnabled();
          cy.get(`${'body'} ${modals.modalBackdrop}`).click({ force: true });
          modals.isModalDisabled(true);
        });

      it(`when user clicks "Disable backdrop" then title of the button changes to "Enable background", after
      that click on "Open modal" button, modal popup is opened, backdrop is closed`, () => {
        modals.clickByText(backdropDemo, btnDisable);
        modals.isButtonExist(backdropDemo, btnEnable, 1);
        modals.clickByText(backdropDemo, btnText);
        modals.isModalVisible(true);
        modals.isBackdropDisabled();
        modals.isModalDisabled(true);
      });

      it(`when user clicks on "Disable backdrop click" button, title of button should change to "Enable backdrop click",
      after that open modal and close by click on backdrop then modal stays opened`, () => {
        modals.clickByText(backdropDemo, btnDisableClick);
        modals.isButtonExist(backdropDemo, btnEnableClick, 2);
        modals.clickByText(backdropDemo, btnText);
        modals.isModalVisible(true);
        modals.isBackdropEnabled();
        modals.clickOnBackdrop();
        modals.isModalVisible(true);
      });
    });

    describe('Change class', () => {
      beforeEach('', () => {
        modals.scrollToMenu('Change class');
      });

      const classChangeDemo = modals.exampleDemosArr.serviceClassChange;
      const btnText = 'Create template modal';
      const btnChangeWidth = 'Change width';
      const width300px = '300px';
      const width800px = '800px';
      const modalClassSM = '.modal-dialog.modal-sm';
      const modalClassLG = '.modal-dialog.modal-lg';

      it('example contains the buttons "Create template modal"', () => {
        modals.isButtonExist(classChangeDemo, btnText);
      });

      it(`when user clicks on "Create template modal" button then modal is opened, "Change width" button
       is present. the modal has width 300px and class "modal-dialog modal-sm"`,
        () => {
          modals.clickByText(classChangeDemo, btnText);
          modals.isModalVisible(true);
          modals.isModalBtnExist(btnChangeWidth, 1);
          modals.isModalWindowWidth(width300px);
          modals.isModalHasClass(modalClassSM);
        });

      it(`when user click on the button "Change width" then width of the modal is changed to 800px and
      the modal class changed to "modal-dialog modal-lg"`, () => {
        modals.clickByText(classChangeDemo, btnText);
        modals.isModalVisible(true);
        modals.clickOnModalBtn(btnChangeWidth);
        modals.isModalWindowWidth(width800px);
        modals.isModalHasClass(modalClassLG);
      });
    });
  });

  describe('Directive examples', () => {
    describe('Static modal', () => {
      const statciModalDemo = modals.exampleDemosArr.directiveStatic;
      const btnText = 'Static modal';

      it('example contains the buttons "Static modal"', () => {
        modals.isButtonExist(statciModalDemo, btnText);
      });

      it('directive static modal can be closed by clicking Close button', () => {
        modals.clickByText(statciModalDemo, btnText);

        // TODO: continue from here!
        cy.get(`${statciModalDemo} ${modals.modalContent}`).as('staticMod')
          .should('to.be.visible');

        cy.get(`${statciModalDemo} ${modals.modalHeader} ${modals.btnCloseInHeader}`).click();
        cy.get(`${statciModalDemo} ${modals.backDirectiveMod}`)
          .should('not.to.be.visible');
      });
    });

    describe('Child modal', () => {
      const childModals = modals.exampleDemosArr.directiveChild;
      const buttonText = 'Open child modal';

      it('directive child modal can be closed by backdrop click', () => {
        modals.clickByText(childModals, buttonText);
        cy.get(`${childModals} ${modals.modalContent}`)
          .should('to.be.visible');

        cy.get(`${childModals} ${modals.backDirectiveMod}`).as('childModBack').click();
        cy.get('@childModBack')
          .should('not.to.be.visible');
      });
    });
  });
});
