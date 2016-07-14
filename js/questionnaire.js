'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  function Questionnaire(element) {
    this.element = element;
    this.init();
  };

  Questionnaire.prototype = {
    constructor: Questionnaire,

    init: function () {

        // Checks for valid email addresses
        var regx = ['^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)',
                    '|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+',
                    '[^<>()[\]\.,;:\s@\"]{2,})$/'].join('');
        var parent = 'form.js--submit-card';

        this.questionnairePrefix = "lmd-";
        this.questionnaireName = this.questionnairePrefix + 'questionnaire';
        this.storage = sessionStorage;

        this.formSubmitCard = this.element.querySelector(parent);


        // Object containing patterns for form validation
        this.requiredFields = {
            email: {
                value: new RegExp(regx, 'i')
            },

            empty: {
                value: ''
            }
      };

        this.createQuestionnaire();
        this.handleSubmitCardForm();
    },

    createQuestionnaire: function () {
        var questionnaireObj = {};
        questionnaireObj['items'] = [];

        if (!this.storage.getItem(this.questionnaireName)) {
            this.storage.setItem(this.questionnaireName, 
                                 JSON.stringify(questionnaireObj));
        }
    },

    handleSubmitCardForm: function () {
        var self = this;

        // Creates a single event listener on the parent node element
        this.element.addEventListener('submit', function (e) {

            // Here e.target is a reference to the target form card
            self._validateCardForm(e.target); 

            if (e.target.checkValidity()) {
                self._saveCardFormData(e.target);
            } else {
                console.log('Error in form');

            }

            e.stopPropagation(); // Stops Event Bubbling 
        });
    },

    _validateCardForm: function (card) {
        var self = this;

        var fields      = self.requiredFields,
            textInputs  = card.querySelectorAll('input[type=text]'),
            emailInputs = card.querySelectorAll('input[type=email]');

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
    var questionnaire = new Questionnaire(element);
  })(e);
});

