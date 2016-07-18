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
                        msg: 'This field is required'
                    }
                ]
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

            var selector    = self.validation.selector,
                inputs      = toArray(card.querySelectorAll(selector)),
                reqInputs   = inputs.filter(getWith('required'));


            reqInputs = reqInputs.map(function(input) {
                // Gets only the first failed test per inputs
                var failure = first(regexTest(input, self.validation.fields));

                if (failure) {
                    input.setCustomValidity(failure.msg);
                } else {
                    input.setCustomValidity('');
                }
                return input;
            });

            //this._handleValidationError();
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

    function regexTest(input, patterns) {
        return use('filter')(function (pattern) {
            return (pattern.type === input.type  ||
                    pattern.name === input.name) &&
                    !pattern.pattern.test(input.value);
        })(patterns);
    }

    function toArray (obj) {
        return [].slice.call(obj);
    }

    function first(Array) {
        return Array[0];
    }

    function use(protoFn) {
        return function (fn) {
            return function (list) {
                return Array.prototype[protoFn].call(list, function (item) {
                    return fn.call(this, item);
                });
            };
        }
    }

    function getWith (property) { 
        return function (obj) {
            return obj[property];
        }
    }



    (function(e) {
        var element = e.target.querySelector('.js--questionnaire');
        var questionnaire = new Questionnaire(element);
    })(e);
});

