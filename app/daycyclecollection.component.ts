/**
 * Created by rabbiddog on 6/5/16.
 */
import { Component } from '@angular/core';
import {DayCycleService} from './daycycle.service';
import {DayCycleComponent} from './daycycle.component';
import { OnInit } from '@angular/core';

@Component({
    selector:'daycycle-collection',
    template:`
<div>
    <h2>Day Cycle COnfigurations</h2>
    <h4>Fitered by {{filterBy}}</h4>
    <div>
    
    </div>
</div>
    `,
    directives:[],
    providers: [DayCycleService]
})

export class DayCycleCollectionComponent implements OnInit {

    collection_daycycle: DayCycleComponent[];
    error_message: string;

    daycycle_service: DayCycleService;
    filterBy: string;

    constructor(service:DayCycleService){
        this.daycycle_service = service;
    }

    ngOnInit() {
        this.daycycle_service.getAllConfiguration().subscribe(
            daycycles => this.collection_daycycle = daycycles,
            error => this.error_message = <any>error
        );
    }

    showAll(){
        this.daycycle_service.getAllConfiguration().subscribe(
            daycycles => this.collection_daycycle = daycycles,
            error => this.error_message = <any>error
        );
    }
    
    showByTitleContaining(match_string: string){
        if(!match_string.trim())
        {
            this.daycycle_service.getAllConfiguration().subscribe(
                daycycles => this.collection_daycycle = daycycles,
                error => this.error_message = <any>error
            );
        }
        else {

            this.daycycle_service.getConfigurationByTitle(match_string).subscribe(
                daycycles => this.collection_daycycle = daycycles,
                error => this.error_message = <any>error
            );
        }
    }
    
    showByUniqueId(id:string){
        if(!id.trim())
        {
            this.daycycle_service.getAllConfiguration().subscribe(
                daycycles => this.collection_daycycle = daycycles,
                error => this.error_message = <any>error
            );
        }
        else {
            this.daycycle_service.getConfigurationById(id).subscribe(
                daycycle => {
                    this.collection_daycycle.length = 0 ;
                    this.collection_daycycle.push(daycycle)
                },
                error => this.error_message = <any>error
            );
        }
    }
    
    showByTitleContainingAndWithId(match_string:string, id:string){

        this.daycycle_service.getConfigurationByTitleAndId(match_string, id).subscribe(
            daycycle => {
                this.collection_daycycle.length = 0 ;
                this.collection_daycycle.push(daycycle)
            },
            error => this.error_message = <any>error
        );
    }

    addDayCycle(title:string, description:string, configuration:string, maxMoonlight:number):DayCycleComponent{

        var valueToReturn;
        this.daycycle_service.addNewConfiguration(title, description, configuration, maxMoonlight)
        .subscribe(
            daycycle => valueToReturn = daycycle,
            error => this.error_message = <any>error
        );

        return valueToReturn;
    }
}