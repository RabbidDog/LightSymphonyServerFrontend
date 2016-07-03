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
<div class="app-component">
    
    <div class="overdark page-name glass-dark">
        <h1>Day Cycle Configurations</h1>
        <p class="medium-text">
            At aquaLeds we provide our customers with aesthetically pleasing configuration for their Led devices. Many of these configurations were
             tested in our production house. Others were created by users and made available for everyone to use. 
        </p>
    </div>
    <div class="page-content">
    
    <div class="row">
        <input type="text" [ngFormControl] = "term" class="search-box left"/>  
        <select   #sel  (change)="OnSelect(sel.value)" class="drop-down left"> 
            <option *ngFor="let fValue of filterByOptions">
                {{fValue}}
            </option>
        </select>
                                                                                                                                                                                                                                                                                              
    </div>
    <div *ngFor="let daycycle of collection_daycycle" class="round-corner daycycle-detail">
        <div class="daycycle-title">
            {{daycycle.title}}
        </div>
        <div>
            <h2>Code</h2>
            <p>{{daycycle.uniqueId}}</p>
        </div >
        <div>
            <h2>Description</h2>
            <p>{{daycycle.description}}</p>
        </div>
        <div class="right-bottom">
            <img src="../resources/images/dw48.png" (click)="download(daycycle.uniqueId)"/>
        </div>
    </div>
    </div>
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

    download(uniquedId:string){
        console.log("requested upload");
        var daycycle = this.collection_daycycle.find(d => d.uniqueId === uniquedId);

        var file = new Blob([JSON.stringify(daycycle)],{type: 'text/plain'});
        var url = window.URL.createObjectURL(file);
        window.open(url);
    }
}
