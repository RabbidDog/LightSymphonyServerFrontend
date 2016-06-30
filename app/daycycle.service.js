"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by rabbiddog on 6/5/16.
 */
const core_1 = require('@angular/core');
const daycycle_component_1 = require('./daycycle.component');
const http_1 = require('@angular/http');
const http_2 = require('@angular/http');
const Observable_1 = require('rxjs/Observable');
let DayCycleService = class DayCycleService {
    constructor(http) {
        this.http = http;
        this.serviceUrl = 'http://localhost:3000/';
        console.log("DayCycleService constructor");
    }
    getAllConfiguration() {
        console.log("Call made to get all configuration");
        return this.http.get(this.serviceUrl + 'api/day-cycle')
            .map(this.extractData)
            .catch(this.handleError);
    }
    getConfigurationByTitle(title) {
        return this.http.get(this.serviceUrl + 'api/day-cycle?title=' + title)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getConfigurationById(id) {
        return this.http.get(this.serviceUrl + 'api/day-cycle?id=' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getConfigurationByTitleAndId(title, id) {
        return this.http.get(this.serviceUrl + 'api/day-cycle?id=' + id + '&title=' + title)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addNewConfiguration(title, description, configuration, maxMoonlight) {
        let body = JSON.stringify({ title: title, configuration: configuration, description: description, maxmoonlight: maxMoonlight });
        let headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        let options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.serviceUrl + 'api/daycycles/', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    extractData(res) {
        console.log(res.json);
        let body = res.json();
        let result = [];
        if (body) {
            body.forEach((item) => {
                result.push(new daycycle_component_1.DayCycleComponent(item.title, item.uniqueID, item.description, item.maxmoonlight, item.description));
            });
        }
        return result;
    }
    handleError(error) {
        // TODO : Implement logging on file
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    }
};
DayCycleService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], DayCycleService);
exports.DayCycleService = DayCycleService;
//# sourceMappingURL=daycycle.service.js.map