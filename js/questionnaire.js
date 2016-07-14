'use strict';

document.addEventListener('DOMContentLoaded', function (e) {

    function Questionnaire(element) {
        this.element = element;
        this.init();
    };

    /* 
     * Sets all the methods and properties inside the Questionnaire's prototype 
     * in such a way that each instance of it can use them without waste of 
     * resources.
     */
    Questionnaire.prototype = {
        constructor: Questionnaire,

        init: function () {

            // Checks for valid email addresses
            var regx = ['^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)',
                        '|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+',
                        '[^<>()[\]\.,;:\s@\"]{2,})$'].join('');

            this.questionnairePrefix = "lmd-";
            this.questionnaireName = this.questionnairePrefix + 'questionnaire';
            this.storage = sessionStorage;

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

            // Creates a single event listener on the grandparent node (article)
            this.element.addEventListener('click', function (e) {

                var target = e.target;

                if (target.nodeName.toLowerCase() === 'button') {
                    // Here e.target.form is a reference to the target form card
                    self._validateCardForm(target.form); 

                    if (target.form.checkValidity()) {
                        self._saveCardFormData(target.form);
                    } else {
                        console.log('Error in form');
                    }
                }

                e.preventDefault();  // Prevents default behaviour
                e.stopPropagation(); // Stops Event Bubbling 
            });
        },

        _validateCardForm: function (card) {

            var self = this;

            var fields = self.requiredFields,
                inputs = card.querySelectorAll('input');

            map(inputs, function(input) {
                var errorMsgEmpty   = input.getAttribute('data-error-empty'),
                    errorMsgInvalid = input.getAttribute('data-error-invalid');

                if (input.required) {
                    if (!input.value) {
                        input.setCustomValidity(errorMsgEmpty);
                    } else {
                        input.setCustomValidity('');
                    }
                }

                self._handleValidationError(input);
            });
        },

        _handleValidationError: function (field) {

            var msgContainer = void 0;

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
        },

        _saveCardFormData: function (card) {
            console.log('Form saved');
        }
    };

    // helper function
    function map(array, callback) {

        // holds the result of map operation  
        var result = [];
        var len    = array.length;
        var i;

        for (i = 0; i < len; i++) {
            result.push(callback(array[i], i));
        }

        return result;
    }

    (function(e) {
        var element = e.target.querySelector('.js--questionnaire');
        var questionnaire = new Questionnaire(element);
    })(e);
});

