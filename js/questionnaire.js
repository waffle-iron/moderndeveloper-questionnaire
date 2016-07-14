'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  function Questionnnaire(element) {
    this.element = element;
    this.init();
  };

  Questionnnaire.prototype = {
    constructor: Questionnnaire,

    init: function () {
      this.questionnairePrefix = "lmd-";
      this.questionnaireName = this.questionnairePrefix + 'questionnaire';
      this.storage = sessionStorage;

      this.formSubmitCard = this.element.querySelectorAll('form.js--submit-card');

      // Object containing patterns for form validation
      this.requiredFields = {
        email: {
          value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        },

        empty: {
          value: ''
        }
      };

      this.createQuestionnaire();
      this.handleSubmitCardForm();
    },

    createQuestionnaire: function () {
      if (this.storage.getItem(this.questionnaireName) === null) {

        var questionnaire = {};
        questionnaire.items = [];

        this.storage.setItem(this.questionnaireName, JSON.stringify(questionnaire));
      }
    },

    handleSubmitCardForm: function () {
      var self = this;

      for (var i = 0; i < this.formSubmitCard.length; i++) {
        var card = this.formSubmitCard[i];

        card.noValidate = true;

        card.addEventListener('submit', function (e) {
          e.preventDefault();

          self._validateCardForm(e.target);

          if (e.target.checkValidity()) {
            self._saveCardFormData(e.target);
          } else {
            console.log('Error in form');
          }
        });
      }
    },

    _validateCardForm: function (card) {
      var self = this;
      var fields = self.requiredFields;
      var textInputs = card.querySelectorAll('input[type=text]');
      var emailInputs = card.querySelectorAll('input[type=email]');

      if (textInputs.length) {
        for (var i = 0; i < textInputs.length; i++) {
          var textInput = textInputs[i];
          var errorMsgEmpty = textInput.getAttribute('data-error-empty');
          var errorMsgInvalid = textInput.getAttribute('data-error-invalid');

          if (textInput.required && textInput.value === fields.empty.value) {
            textInput.setCustomValidity(errorMsgEmpty);
          } else {
            textInput.setCustomValidity('');
          }

          self._handleValidationError(textInput);
        }
      }
    },

    _handleValidationError: function (field) {
      var parent = field.parentNode;

      if (field.checkValidity()) {
        if (parent.classList.contains('has-error')) {
          parent.classList.remove('has-error');
          parent.removeChild(parent.querySelector('.error-message'));
        }
      } else {
        if (!parent.classList.contains('has-error')) {
          var msgContainer = void 0;
          msgContainer = document.createElement('div');
          msgContainer.className = 'error-message';
          msgContainer.innerHTML = field.validationMessage;
          parent.classList.add('has-error');
          parent.appendChild(msgContainer);
        } else {
          parent.querySelector('.error-message').innerHTML = field.validationMessage;
        }
      }
    },

    _saveCardFormData: function (card) {
      console.log('Form saved');
    }
  };

  (function(e) {
    var element = e.target.querySelector('.js--questionnaire');
    var questionnaire = new Questionnnaire(element);
  })(e);
});

