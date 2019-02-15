import { ModalsPo } from '../support/modals.po';

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Service examples', () => {

    describe('Template modal', () => {
      beforeEach('', () => {
        modals.scrollToMenu(' Template ');
      });

      const templateDemo = modals.exampleDemosArr.serviceTemplate;
      const btnText = 'Create template modal';
      const btnX = '×';

      it('example contains the button "Create template modal"', () => {
        modals.isButtonExist(templateDemo, btnText);
      });

      it(`when user clicks on the button "Create modal with component" then modal popup is opened and
      backdrop is enabled`, () => {
        modals.clickByText(templateDemo, btnText);
        modals.isModalVisible('body', true);
        cy.get('bs-modal-backdrop').should('to.have.class', 'show');
      });

      it('when user clicks on the cross button then the modal is closed', () => {
        modals.clickByText(templateDemo, btnText);
        modals.clickOnModalBtn(btnX);
        modals.isModalDisabled('body', true);
      });

      it('when user clicks outside the modal then the modal is closed', () => {
        modals.clickByText(templateDemo, btnText);
        modals.clickOutside(modals.modalWindow);
        modals.isModalDisabled('body', true);
      });

      it('when user press on ESC btn then the modal is closed', () => {
        modals.clickByText(templateDemo, btnText);
        cy.get(modals.modalWindow).type('{esc}');
        modals.isModalDisabled('body', true);
      });
    });
  });
});
