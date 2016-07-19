
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
        this.validation = {

            selector: 'input[type], select, textarea',

            fields: 
            [
                {   
                    type: 'email',
                    pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    msg: 'Error message email'
                },
                {   
                    type: 'text',
                    pattern: /.*\S.*/,
                    msg: 'Error message text empty'
                },
                {
                    name: 'card-05-dropdown',
                    pattern: /Option 1/i,
                    msg: 'Only Option 1 is allowed'
                }
            ]
        };

      this.createQuestionnaire();
      this.displayQuestionnaire();
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

    displayQuestionnaire: function () {
      var self = this;

      var questionnaire = self.storage.getItem(self.questionnaireName);
      var questionnaireObject = JSON.parse(questionnaire);
      var items = questionnaireObject.items;

      if (items.length) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var form = self.element.querySelector('#' + item.form);
          var serializedString = item.data.replace(/\+/g, '%20');
          var formFieldArray = serializedString.split("&");

          self._resetForm(form);

          for (var j = 0; j < formFieldArray.length; j++) {
            var pair = formFieldArray[j];

            var nameValue = pair.split('=');
            var name = decodeURIComponent(nameValue[0]);
            var value = decodeURIComponent(nameValue[1]);

            var fields = form.querySelectorAll('[name=' + name + ']');

            for (var k = 0; k < fields.length; k++) {
              var field = fields[k];

              if (field.type === 'radio' || field.type === 'checkbox') {
                if (field.getAttribute('value') === value) {
                  field.checked = true;
                }
              } else {
                field.value = value;
              }
            }
          }
        }
      }
    },

    handleSubmitCardForm: function () {

        var self = this;

        // Creates a single event listener at the grandparent level 
        // (article) node
        this.element.addEventListener('submit', function (e) {

            var target = e.target;

            e.preventDefault();  // Prevents default behaviour
            e.stopPropagation(); // Stops Event Bubbling 

            self._validateCardForm(target); 

            if (target.checkValidity()) {
                self._saveCardFormData(target);
            } else {
                target.querySelector('input:invalid, select:invalid, textarea:invalid').focus();
          }
        });
    },

    _validateCardForm: function (card) {

        var self = this;

        var selector    = self.validation.selector,
            inputs      = toArray(card.querySelectorAll(selector)),
            reqInputs   = inputs.filter(getWith('required'));

        reqInputs = reqInputs.map(function(input) {
            // Gets only the first failed test per inputs
            var failure = regexTest(input, self.validation.fields)[0];

            if (failure) {
                input.setCustomValidity(failure.msg);
            } else {
                input.setCustomValidity('');
            }
            return input;
        });

        this._handleValidationError(reqInputs);
    },

    _handleValidationError: function (fields) {
        var msgContainer = void 0;

        fields.forEach(function (field) {

            var parent = field.parentNode,
                hasError = parent.classList.contains('has-error'),
                errorMessage = parent.querySelector('.error-message');

            if (field.checkValidity()) {
                if (hasError) {
                    parent.classList.remove('has-error');
                    parent.removeChild(errorMessage);
                }
            } else {
                if (!hasError) {
                    msgContainer = document.createElement('div');
                    msgContainer.className = 'error-message';
                    msgContainer.innerHTML = field.validationMessage;
                    parent.classList.add('has-error');
                    parent.appendChild(msgContainer);
                } else {
                    errorMessage.innerHTML = field.validationMessage;
                }
            }
        });
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
    },

    _resetForm: function(form) {
      for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];

        switch (element.type) {
          case 'radio':
          case 'checkbox':
            element.checked = false;
            break;
          case 'select-one':
            element.selected = false;
          default:
            element.value = '';
        }
      }
    },

    _regexTest: function(input, patterns) {
        return use('filter')(function (pattern) {
            return (pattern.type === input.type  ||
                    pattern.name === input.name) &&
                    !pattern.pattern.test(input.value);
        })(patterns);
    },

    _toArray: function(obj) {
        return [].slice.call(obj);
    },

    _use: function(protoFn) {
        return function (fn) {
            return function (list) {
                return Array.prototype[protoFn].call(list, function (item) {
                    return fn.call(this, item);
                });
            };
        }
    },

    _getWith: function(property) { 
        return function (obj) {
            return obj[property];
        }
    }
  };

  (function(e) {
    var element = e.target.querySelector('.js--questionnaire');
    var questionnaire = new Questionnnaire(element);
  })(e);
});