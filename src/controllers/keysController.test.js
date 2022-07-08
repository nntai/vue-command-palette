import keysController from "./keysController.ts";
import modalController from "./modalController.ts";



describe("keys controller", () => {
  






  const customerModalController = modalController();

  const keysInputController = keysController(customerModalController.onModalChange, "Control+k", [{commandName: "place", commandKey: "m", commandAction: () => {}}]);


  it("keys controller", () => {


    keysInputController.addKey("m");
    expect((-1 !== keysInputController.keys.value.indexOf("m")) === true);


    it("keys controller", () => {
      keysInputController.deleteKey("m");
      expect((-1 === keysInputController.keys.value.indexOf("m")) === true);
    });
  });
});