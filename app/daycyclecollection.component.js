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
const daycycle_service_1 = require('./daycycle.service');
let DayCycleCollectionComponent = class DayCycleCollectionComponent {
    constructor(service) {
        this.daycycle_service = service;
    }
    ngOnInit() {
        this.daycycle_service.getAllConfiguration().subscribe(daycycles => this.collection_daycycle = daycycles, error => this.error_message = error);
    }
    showAll() {
        this.daycycle_service.getAllConfiguration().subscribe(daycycles => this.collection_daycycle = daycycles, error => this.error_message = error);
    }
    showByTitleContaining(match_string) {
        if (!match_string.trim()) {
            this.daycycle_service.getAllConfiguration().subscribe(daycycles => this.collection_daycycle = daycycles, error => this.error_message = error);
        }
        else {
            this.daycycle_service.getConfigurationByTitle(match_string).subscribe(daycycles => this.collection_daycycle = daycycles, error => this.error_message = error);
        }
    }
    showByUniqueId(id) {
        if (!id.trim()) {
            this.daycycle_service.getAllConfiguration().subscribe(daycycles => this.collection_daycycle = daycycles, error => this.error_message = error);
        }
        else {
            this.daycycle_service.getConfigurationById(id).subscribe(daycycle => {
                this.collection_daycycle.length = 0;
                this.collection_daycycle.push(daycycle);
            }, error => this.error_message = error);
        }
    }
    showByTitleContainingAndWithId(match_string, id) {
        this.daycycle_service.getConfigurationByTitleAndId(match_string, id).subscribe(daycycle => {
            this.collection_daycycle.length = 0;
            this.collection_daycycle.push(daycycle);
        }, error => this.error_message = error);
    }
    addDayCycle(title, description, configuration, maxMoonlight) {
        var valueToReturn;
        this.daycycle_service.addNewConfiguration(title, description, configuration, maxMoonlight)
            .subscribe(daycycle => valueToReturn = daycycle, error => this.error_message = error);
        return valueToReturn;
    }
};
DayCycleCollectionComponent = __decorate([
    core_1.Component({
        selector: 'daycycle-collection',
        template: `
<div>
    <h2>Day Cycle COnfigurations</h2>
    <h4>Fitered by {{filterBy}}</h4>
    <div>
    
    </div>
</div>
    `,
        directives: [],
        providers: [daycycle_service_1.DayCycleService]
    }), 
    __metadata('design:paramtypes', [daycycle_service_1.DayCycleService])
], DayCycleCollectionComponent);
exports.DayCycleCollectionComponent = DayCycleCollectionComponent;
//# sourceMappingURL=daycyclecollection.component.js.map