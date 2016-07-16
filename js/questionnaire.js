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

            this.questionnairePrefix = "lmd-";
            this.questionnaireName = this.questionnairePrefix + 'questionnaire';
            this.storage = sessionStorage;

            // Object containing patterns for form validation
            this.requiredFields = {

                default: {
                    msg: 'This field is required'
                },

                types: {
                    email: {
                        pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        msg: 'Error message email'
                    },
                    text: {
                        pattern: /.*\S.*/,
                        msg: 'Error message text empty'
                    }
                },

                custom: {
                    'card-05-dropdown': {
                        pattern: /Option 1/i
                    }
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
                    console.log('Error in form');
                }
            });
        },

        _validateCardForm: function (card) {

            var self = this;

            var fields = self.requiredFields,
                inputs   = [].slice.call(card.querySelectorAll('textarea, '  +
                                                               'select, '    +
                                                               'input[type]'));

            inputs.map(function(input) {

                var value       = input.value,
                    attributes  = input.attributes,
                    type        = getAttribute(attributes, 'type') ? getAttribute(attributes, 'type').nodeValue : void 0,
                    name        = getAttribute(attributes, 'name') ? getAttribute(attributes, 'name').nodeValue : void 0,
                    isRequired  = !!getAttribute(attributes, 'required'),
                    errorMsg    = '';

                if (isRequired) {

                    // First validate against field's type (if any)
                    if (fields.types[type]) {
                        if (!fields.types[type].pattern.test(value)) {
                            errorMsg = getAttribute(fields.types[type], 'msg') || fields.default.msg;
                            input.setCustomValidity(errorMsg);
                        } else {
                            input.setCustomValidity('');
                        }
                    }

                    // Second validate against custom pattern (if any)
                    if (fields.custom[name]) {
                        if (!fields.custom[name].pattern.test(value)) {
                            errorMsg = getAttribute(fields.custom[name], 'msg') || fields.default.msg;
                            input.setCustomValidity(errorMsg);
                        } else {
                            input.setCustomValidity('');
                        }
                    }
                }

                self._handleValidationError(input);
            })
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
    function getAttribute(obj, attribute) {
        if (obj && "hasOwnProperty" in obj && obj.hasOwnProperty(attribute)) {
            return obj[attribute];
        } else {
            return null;
        }
    }

    (function(e) {
        var element = e.target.querySelector('.js--questionnaire');
        var questionnaire = new Questionnaire(element);
    })(e);
});

