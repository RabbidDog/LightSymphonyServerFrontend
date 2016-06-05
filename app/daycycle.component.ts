/**
 * Created by rabbiddog on 6/5/16.
 */
import { Component } from '@angular/core';

@Component({
    selector:'day-cycle',
    template:`
        
    `
})

export class DayCycleComponent{
    title:string;
    uniqueId:string;
    description:string;
    maxMoomlight:number;
    configuration:string;

    constructor(title:string,
    uniqueId:string,
    description:string,
    maxMoomlight:number,
    configuration:string)
    {
        this.configuration = configuration;
        this.description = description;
        this.maxMoomlight = maxMoomlight;
        this.title = title;
        this.uniqueId = uniqueId;
    }
}