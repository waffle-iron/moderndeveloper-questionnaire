'use strict';

document.addEventListener('DOMContentLoaded', function (e) {

    function Questionnaire(element) {
        this.element = element;
        this.init();
    };

    /* 
     * Sets all methods and properties inside the Questionnaire's prototype 
     * in such a way that each new instance can use them without waste of 
     * resources
     */
    Questionnaire.prototype = {
        /*
         * Since we define the Questionnaire's prototype this way,
         * we need to set its constructor function again
         */
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
            var questionnaire = {};

            questionnaire['items'] = [];

            if (this.storage.getItem(this.questionnaireName) === null) {
                this.storage.setItem(this.questionnaireName, 
                                     JSON.stringify(questionnaire));
            }
        },

        handleSubmitCardForm: function () {

            var self = this;

            // Creates a single event listener on the grandparent node (article)
            this.element.addEventListener('submit', function (e) {

                var target = e.target;

                e.preventDefault();  // Prevents default behaviour
                e.stopPropagation(); // Stops Event Bubbling 

                self._validateCardForm(target); 

                if (target.checkValidity()) {
                    self._saveCardFormData(target);
                } else {
                    console.log('Error in form');
                }
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

    // Helper function
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

