import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import ToasterService from './toaster.service';
servicesModule.service('Toaster', ToasterService);

import ContactService from './contact.service';
servicesModule.service('Contact', ContactService);

import TestService from './test.service';
servicesModule.service('TestService', TestService);

import StripeService from './stripe.service';
servicesModule.service('StripeService', StripeService);



import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import AdminService from "./admin.service";
servicesModule.service("Admin", AdminService);




import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);



export default servicesModule;
