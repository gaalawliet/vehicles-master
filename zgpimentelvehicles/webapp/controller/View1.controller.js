sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/odata/type/Currency"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
        MessageToast,
        Currency) {
        "use strict";

        return Controller.extend("vehicles.zgpimentelvehicles.controller.View1", {
            onInit: function () {

            },
            onGoToView2Press: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2");
            },

            onDeleteVehicle: function () {
                var oView = this.getView();
                var oSmartTable = oView.byId("st_vehicles")
                var oSmartTableTable = oView.byId("st_vehicles").getTable();
                var SelectedItem = oSmartTableTable.getModel().getProperty(oSmartTableTable._aSelectedPaths.toString());

                if (oSmartTableTable._aSelectedPaths.length < 1) {
                    MessageToast.show("Nenhuma linha selecionada.");
                }
                else {

                    var CarData = [
                        {
                            PlateId: SelectedItem.PlateId,
                            BrandId: SelectedItem.BrandId,
                            ModelId: SelectedItem.ModelId,
                            Price: SelectedItem.Price,
                            Currency: SelectedItem.Currency,
                            Km: SelectedItem.Km,
                            ColorId: SelectedItem.ColorId

                        },
                    ];
                    var payload = {
                        Action: "DELETECAR",
                        Payload: JSON.stringify(CarData)
                    };
                    var oModel = oView.getModel();

                    oModel.create("/JsonCommSet", payload, {
                        success: function (oData, oResponse) {
                            MessageToast.show("Linha excluida com sucesso");
                            oSmartTable.rebindTable()
                            
                        }.bind(this),

                        error: function (oError) {
                            var oSapMessage = JSON.parse(oError.responseText);
                            var msg = oSapMessage.error.message.value;
                            MessageToast.show(msg);
                        },
                    });

                }
            }

        });
    });