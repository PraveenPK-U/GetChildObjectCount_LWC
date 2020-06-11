import { LightningElement,track,wire, api } from 'lwc';
import getMapOfData from '@salesforce/apex/RelatedObjectsCountController.getObjectNameNCount';

export default class ObjectsCountLWC extends LightningElement {

    @track objectMap = [];
    @api recordId;
    @wire(getMapOfData,{recId:'$recordId'})
    mapOfData({data, error}) {
       
        if(data) {
            for(let key in data) {
                // Preventing unexcepted data
                if (data.hasOwnProperty(key)) { // Filtering the data in the loop
                    this.objectMap.push({value:data[key], key:key});
                }
            }
        }
        else if(error) {
            window.console.log(error);
        }
    }

   /* @track objectMap=[];
    @api recordId;
    @wire(getObjectNameNCount,{recordId:'$recordId'}) mapNameNCount;
    wiredResult(result){
        if(result.data){
            var conts=result.data;
            alert('const '+conts);
            for(var key in conts){
                this.objectMap.push({value:conts[key],key:key});
            }
        }
    }*/
}