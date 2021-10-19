sap.ui.define(
	[
	  'sap/m/library',  
	  "sap/ui/core/mvc/Controller",
	  "sap/ui/model/json/JSONModel",
	  "sap/m/MessageBox",
	  "sap/m/MessageToast",
	'sap/ui/core/Fragment',
	],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	// @ts-ignore
	function (mobileLibrary,Controller, JSONModel, MessageBox, MessageToast,Fragment) {
	  // @ts-ignore
	  var URLHelper = mobileLibrary.URLHelper;
	  "use strict";
  
	  return Controller.extend("com.san.portfolio.controller.App", {
		onInit: function () {
		  var cardManifests = new JSONModel();
		  cardManifests.loadData(
			sap.ui.require.toUrl("com/san/portfolio/card.json")
		  );
		  this.getView().setModel(cardManifests, "manifests");
		},
  
   
		initializeForm: function () {
		  var name = this.getView().byId("name");
		  // @ts-ignore
		  name.setValue("");
		  var email = this.getView().byId("email");
		  // @ts-ignore
		  email.setValue("");
		  var msg = this.getView().byId("message");
		  // @ts-ignore
		  msg.setValue("");
		},
  
		onSave: function () {
		  // @ts-ignore
		  var name = this.getView().byId("name").getValue();
		  // @ts-ignore
		  var email = this.getView().byId("email").getValue();
		  // @ts-ignore
		  var msg = this.getView().byId("message").getValue();
		  var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
		  if (name == "" || email == "" || msg == "") {
			MessageToast.show("Please enter Valid Details");
		  } else if (!mailregex.test(email)) {
			MessageToast.show(email + " is not a valid email address");
			this.getView()
			  .byId("email")
			  // @ts-ignore
			  .setValueState(sap.ui.core.ValueState.Error);
		  } else {
			// @ts-ignore
			var messagesRef = firebase.database().ref("messages");
			var newMessageRef = messagesRef.push();
			newMessageRef
			  .set({
				name: name,
				email: email,
				msg: msg,
			  })
			  // @ts-ignore
			  .then((docRef) => {
				MessageToast.show("Sumbmitted");
			  })
			  // @ts-ignore
			  .catch((error) => {
				MessageToast.show("So mething went Wrong");
			  });
		// @ts-ignore
		this.byId("mypopover").close();
		  }
		},
	  handlePopoverPress: function (oEvent) {
	  var oButton = oEvent.getSource(),
		// @ts-ignore
		oView = this.getView();
	  // create popover
	  if (!this._pPopover) {
		this._pPopover = Fragment.load({
		  id: oView.getId(),
		  name: "com.san.portfolio.fragment.detail",
		  controller: this
		}).then(function(oPopover) {
		  oView.addDependent(oPopover);
		  return oPopover;
		});
	  }
	  this._pPopover.then(function(oPopover) {
		oPopover.openBy(oButton);
	  });
	},
  
	// @ts-ignore
	handleCloseButton: function (oEvent) {
	  // note: We don't need to chain to the _pPopover promise, since this event-handler
	  // is only called from within the loaded dialog itself.
	  // @ts-ignore
	  this.byId("mypopover").close();
	},
	onLinkedIn:function(){
	  window.open("https://www.linkedin.com/in/sandeepbnvh/");
	},
	ongithub:function(){
	  window.open("https://github.com/sandeepbnvh");
	},
	onInstagram:function(){
	  window.open("https://instagram.com/sandeep.a.n")
	}
  
	  });
	}
  );
  
  