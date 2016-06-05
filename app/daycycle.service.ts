/**
 * Created by rabbiddog on 6/5/16.
 */
    import { Injectable }     from '@angular/core';
    import {DayCycleComponent} from './daycycle.component';
    import {Http, Response} from '@angular/http';
    import { Headers, RequestOptions } from '@angular/http';
    import {Observable} from 'rxjs/Observable';

@Injectable()
export class DayCycleService{

    private serviceUrl = 'http://localhost:3000/';

    constructor(private http: Http) { }

    getAllConfiguration():Observable<DayCycleComponent[]>{
        return this.http.get(this.serviceUrl+'day-cycle/')
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getConfigurationByTitle(title:string):Observable<DayCycleComponent[]>{
        return this.http.get(this.serviceUrl+'day-cycle/?title='+title)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getConfigurationById(id:string):Observable<DayCycleComponent>{
        return this.http.get(this.serviceUrl+'day-cycle/?id='+id)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getConfigurationByTitleAndId(title:string, id:string):Observable<DayCycleComponent>{
        return this.http.get(this.serviceUrl+'day-cycle/?id='+id+'&title='+title)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addNewConfiguration(title:string, description:string, configuration:string, maxMoonlight:number):Observable<DayCycleComponent>{
        let body = JSON.stringify({ title:title, configuration:configuration, description:description,  maxmoonlight:maxMoonlight});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serviceUrl+'day-cycle/', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError (error: any) {
        // TODO : Implement logging on file
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
} 