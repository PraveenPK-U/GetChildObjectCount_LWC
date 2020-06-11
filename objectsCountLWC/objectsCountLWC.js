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
}