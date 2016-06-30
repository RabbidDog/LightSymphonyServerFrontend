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
    maxMoonlight:number;
    configuration:string;

    constructor(title:string,
    uniqueId:string,
    description:string,
    maxMoonlight:number,
    configuration:string)
    {
        this.configuration = configuration;
        this.description = description;
        this.maxMoonlight = maxMoonlight;
        this.title = title;
        this.uniqueId = uniqueId;
    }
}