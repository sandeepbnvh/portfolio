// @ts-nocheck
sap.ui.define(
  [
    'sap/m/library',  
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  'sap/ui/core/Fragment',
  "sap/ui/core/util/File",
  "sap/ui/core/BusyIndicator"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (mobileLibrary,Controller, JSONModel, MessageBox, MessageToast,Fragment,BusyIndicator) {
    var URLHelper = mobileLibrary.URLHelper;
    "use strict";
   
    return Controller.extend("com.san.portfolio.controller.App", {
      onInit: function () {

        var cardManifests = new JSONModel();
        cardManifests.loadData(
          sap.ui.require.toUrl("com/san/portfolio/card.json")
        );
        this.getView().setModel(cardManifests, "manifests");
        this.byId("idTimeline").setEnableScroll(false);
      // this.byId("idApp").se
     // this.showBusyIndicator(4000);
      },
     

 
      initializeForm: function () {
        var name = this.getView().byId("name");
        name.setValue("");
        var email = this.getView().byId("email");
        email.setValue("");
        var msg = this.getView().byId("message");
        msg.setValue("");
      },

     
      downloadResume:function(){
        const sURL="https://firebasestorage.googleapis.com/v0/b/portfolio-7b056.appspot.com/o/Sandeep%20A%20N_Resume-converted.pdf?alt=media&token=487486a2-3b22-4a31-a675-a6b622422c18";
        var oXHR = new XMLHttpRequest();
        oXHR.open('GET','https://cors-anywhere.herokuapp.com/'+ sURL);
        oXHR.responseType = "blob";
        oXHR.onload = function() {
          
          
              // we have to use an a-element, because we have to set a filename
              // other download options do not allow this
              var oA = document.createElement("a");
              oA.href = window.URL.createObjectURL(oXHR.response);
              oA.style.display = "none";
              //if (sap.ui.Device.system.phone) {
              //  for whatver reason, it's not possible to set this for mobile devices
              //  oA.target = "_blank";
              //}
              oA.download = sFilenameFromServer;
              document.body.appendChild(oA);
              oA.click();
              document.body.removeChild(oA);
              // setTimeout is needed for safari on iOS
              setTimeout(function() {
                window.URL.revokeObjectURL(oA.href);
              }, 250);
            
          
        }.bind(this);
        oXHR.send();
      },

    handlePopoverPress: function (oEvent) {
    var oButton = oEvent.getSource(),
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
 
  onSave:function(){
    var name = this.getView().byId("name").getValue();
    var email = this.getView().byId("email").getValue();
    var msg = this.getView().byId("message").getValue();
    var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
     if(name == "" || email == "" || msg == "") {
      MessageToast.show("Please enter all the Details");
    }
    else if (!mailregex.test(email)) {
      MessageToast.show(email + " is not a valid email address");
    } else {
      var oDialog = this.byId("BusyDialog");
      oDialog.open();
      Email.send({
        SecureToken:"41f3b9f9-dfd0-4acd-8e47-4d82d5c96692",
        To : 'sandeep.bnvh@gmail.com',
        From : email,
        Subject : name+"sent a message-- Portfolio!!!",
        Body : msg
        }).then(message=>{
            if(message=='OK'){
              var messagesRef = firebase.database().ref("messages");
              var newMessageRef = messagesRef.push();
              newMessageRef
                .set({
                  name: name,
                  email: email,
                  msg: msg,
                });
                oDialog.close();
          MessageToast.show("Submitted Successfully");
            }else{
              oDialog.close();
              MessageToast.show(email + " is not a valid email address");
            }
          });
         
      this.byId("mypopover").close();
    } 
  },
  
  handleCloseButton: function (oEvent) {
    // note: We don't need to chain to the _pPopover promise, since this event-handler
    // is only called from within the loaded dialog itself.
    
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
  },
  onMail:function(){
    sap.m.URLHelper.triggerEmail("sandeep.bnvh@gmail.com", "Say Hi", "");
  }
  });
  }
);
