/**
 * Created by rabbiddog on 6/5/16.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Control} from '@angular/common';
import {DayCycleService} from './daycycle.service';
import {DayCycleComponent} from './daycycle.component';

@Component({
    selector:'daycycle-collection',
    template:`
<div>
    <h2>Day Cycle Configurations</h2>
    <div class="row">
        <select   #sel  (change)="OnSelect(sel.value)" class="drop-down"> 
            <option *ngFor="let fValue of filterByOptions">
                {{fValue}}
            </option>
        </select>
        <input type="text" [ngFormControl] = "term" class="search-box"/>  
        
                                                                                                                                                                                                                                                                                           
    </div>
    <table class="table">
        <thead>
        <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Configuration</th>
            <th>Moon Intensity</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor='let daycycle of collection_daycycle'>
            <td>{{daycycle.uniqueId}}</td>
            <td>{{daycycle.title}}</td>
            <td>{{daycycle.configuration}}</td>
            <td>{{daycycle.maxMoonlight}}</td>
            <td>{{daycycle.description}}</td>
        </tr>
        </tbody>
    </table>
    
</div>
`,
    providers: [DayCycleService]
})

export class DayCycleCollectionComponent{

    collection_daycycle: DayCycleComponent[];
    error_message: string;
    daycycle_service: DayCycleService;
    filterByOptions = ["All", "Code", "Title"];
    filterBy = this.filterByOptions[0];
    term = new Control();

    constructor( private service:DayCycleService){
        console.log("constructor");
        this.error_message = "set in constructor";
        this.daycycle_service = service;
        this.daycycle_service.getAllConfiguration().subscribe(
            daycycles => {
                this.collection_daycycle = daycycles;
                console.log("got value"+ this.collection_daycycle.length);
            },
            error => {
                //this.error_message = <any>error;
                //console.log(" error occured"+error);
            }
        );
        console.log("init call done");


        /*monitor search term*/
        this.term.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(searchTerm => {
                if(this.filterBy === "Code")
                {
                    if(searchTerm.trim())
                    {
                        this.daycycle_service.getConfigurationById(searchTerm.trim()).subscribe(
                            daycycle => {
                                this.collection_daycycle.length = 0;
                                this.collection_daycycle.push(daycycle[0]);
                            },
                            error => this.error_message = <any>error
                        );
                    }
                    else
                    {
                        this.daycycle_service.getAllConfiguration().subscribe(
                            daycycles => this.collection_daycycle = daycycles,
                            error => this.error_message = <any>error
                        );
                    }
                }
                else if(this.filterBy === "Title")
                {
                    if(searchTerm.trim())
                    {
                        this.daycycle_service.getConfigurationByTitle(searchTerm.trim()).subscribe(
                            daycycles => this.collection_daycycle = daycycles,
                            error => this.error_message = <any>error
                        );
                    }
                    else
                    {
                        this.daycycle_service.getAllConfiguration().subscribe(
                            daycycles => this.collection_daycycle = daycycles,
                            error => this.error_message = <any>error
                        );
                    }
                }
                else
                {
                    this.daycycle_service.getAllConfiguration().subscribe(
                        daycycles => this.collection_daycycle = daycycles,
                        error => this.error_message = <any>error
                    );
                }
                this.daycycle_service
            });
    }

    OnSelect(fBy)
    {
        this.filterBy = fBy;
        this.term.updateValue(" ");
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