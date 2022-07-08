import modalController from "./modalController.ts";



describe("modal controller", () => {
  const customerModalController = modalController();

  it("modal controller", () => {
    customerModalController.onModalChange(true);

    expect(customerModalController.isModal.value == true);
  });
});