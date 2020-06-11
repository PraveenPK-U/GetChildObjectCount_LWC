public class RelatedObjectsCountController {
    @AuraEnabled(cacheable=true)
    Public static Map<String,Integer> getObjectNameNCount(String recordId){
        Map<String,Integer> mapNameNCount = new Map<String,Integer>();
       Id recId = Id.valueOf(recordId);
        String sObjName = recId.getSObjectType().getDescribe().getName();
        recordId ='\''+recordId+'\'';
       //Fetch the child object details from the metadata 
        List<RelatedObjectSetting__mdt> listObjects = [select Object_API_Name__c	,MasterLabel,FieldAPI__c from RelatedObjectSetting__mdt 
                                                       where Partent_Object__c=:sObjName];
        try{
            if(listObjects.size()>0){
                For(RelatedObjectSetting__mdt objName : listObjects){
                    mapNameNCount.put(objName.MasterLabel,returnCount(objName.Object_API_Name__c,objName.FieldAPI__c,recordId));
                }
            }
        }
        Catch(Exception ex){
            mapNameNCount.put(ex.message,0);
        }
        return mapNameNCount;
    }
    public static Integer returnCount(string objAPIName,String APIField,String recordId){
        integer count= database.countQuery('select count() from ' +objAPIName+' where '+ APIField+'='+recordId);
        return count;
    }
}