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
let DayCycleComponent = class DayCycleComponent {
    constructor(title, uniqueId, description, maxMoomlight, configuration) {
        this.configuration = configuration;
        this.description = description;
        this.maxMoomlight = maxMoomlight;
        this.title = title;
        this.uniqueId = uniqueId;
    }
};
DayCycleComponent = __decorate([
    core_1.Component({
        selector: 'day-cycle',
        template: `
        
    `
    }), 
    __metadata('design:paramtypes', [String, String, String, Number, String])
], DayCycleComponent);
exports.DayCycleComponent = DayCycleComponent;
//# sourceMappingURL=daycycle.component.js.map