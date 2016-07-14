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
      this.total = this.questionnairePrefix + 'total';
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
        this.storage.setItem(this.total, JSON.stringify(this.formSubmitCard.length));
      }
    },

    // $.fn.deserialize = function (serializedString) {
    //   var $form = $(this);
    //   $form[0].reset();
    //   serializedString = serializedString.replace(/\+/g, '%20');
    //   var formFieldArray = serializedString.split("&");
    //   $populateFeedback.slideDown().html('');
    //   $.each(formFieldArray, function(i, pair){
    //     var nameValue = pair.split("=");
    //     var name = decodeURIComponent(nameValue[0]);
    //     var value = decodeURIComponent(nameValue[1]);
    //     // Find one or more fields
    //     var $field = $form.find('[name=' + name + ']');
    //     console.log(name, value);
    //     $populateFeedback.append('<li>' + name + ' = ' + value + '</li>');
    //
    //     if ($field[0].type == "radio"
    //       || $field[0].type == "checkbox")
    //     {
    //       var $fieldWithValue = $field.filter('[value="' + value + '"]');
    //       var isFound = ($fieldWithValue.length > 0);
    //       if (!isFound && value == "on") {
    //         $field.first().prop("checked", true);
    //       } else {
    //         $fieldWithValue.prop("checked", isFound);
    //       }
    //     } else {
    //       $field.val(value);
    //     }
    //   });
    // }

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

    _saveCardFormData: function (form) {
      var self = this;
      var findIndex = self._findIndex;

      var formObject = {
        form: form.getAttribute('id'),
        data: self._serializeCardForm(form)
      };

      var questionnaire = self.storage.getItem(self.questionnaireName);
      var questionnaireObject = JSON.parse(questionnaire);
      var questionnaireCopy = questionnaireObject;
      var items = questionnaireCopy.items;

      var idx = items.findIndex(function(item) {
        return item.form === form.getAttribute('id');
      });

      if (idx > -1) {
        items.splice(idx, 1, formObject);
      } else {
        items.push(formObject);
      }

      self.storage.setItem(self.questionnaireName, JSON.stringify(questionnaireCopy));
    },

    _serializeCardForm: function(form) {
      var field = void 0;
      var l = void 0;
      var s = [];

      if (typeof form === 'object' && form.nodeName === 'FORM') {
        var len = form.elements.length;

        for (var i = 0; i < len; i++) {
          field = form.elements[i];

          if (field.name &&
             !field.disabled &&
              field.type !== 'file' &&
              field.type !== 'reset' &&
              field.type !== 'submit' &&
              field.type !== 'button') {
            if (field.type === 'select-multiple') {
              l = form.elements[i].options.length;

              for (var j = 0; j < l; j++) {
                if (field.options[j].selected) {
                  s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[j].value);
                }
              }
            } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
              s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value);
            }
          }
        }
      }

      return s.join('&').replace(/%20/g, '+');
    },

    _findIndex: function(predicate) {
      if (this === null) {
        throw new TypeError('findIndex called on null or undefined');
      }

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }

      return -1;
    }
  };

  (function(e) {
    var element = e.target.querySelector('.js--questionnaire');
    var questionnaire = new Questionnnaire(element);
  })(e);
});

